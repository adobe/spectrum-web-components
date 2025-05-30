#!/usr/bin/bash

# Copyright 2024 Adobe. All rights reserved.
# This file is licensed to you under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software distributed under
# the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
# OF ANY KIND, either express or implied. See the License for the specific language
# governing permissions and limitations under the License.

copy_env_file() {
    # Check if an input was provided
    [[ -z "$1" ]] && return

    example=$1/.env.example

    # Validate that the file exists
    [[ ! -f "$example" ]] && return

    # Create the local .env file if it doesn't exist
    [[ ! -f "$1/.env" ]] && touch $1/.env

    # Read in the local env example, line-by-line and look for variable names
    while IFS= read -r example_line; do
        if [[ "$example_line" = "#"* || "$example_line" = "" ]]; then
            echo "${example_line}" >> .env
            continue
        fi

        if [[ "$example_line" != *"="* ]]; then
            continue
        fi

        # Split the line into an array with 0=key, 1=value
        while IFS='=' read -ra example_var; do

            if [[ "${example_var[0]}" = "" || "${example_var[1]}" = "" ]]; then
                continue
            fi

            if ! test -f $HOME/.env; then
                echo "${example_var[0]}=${example_var[1]}" >> .env
                continue
            fi

            # If the variable does not exist in the home .env file, write it to the local .env file as-is
            if [[ -z $(grep "${example_var[0]}=" $HOME/.env) ]]; then
                echo "${example_var[0]}=${example_var[1]}" >> .env
                continue
            fi

            # Look for that variable name in the root .env file
            while IFS= read -r root_line; do
                while IFS='=' read -ra root_var; do
                    if [[ "${root_var[0]}" = "${example_var[0]}" ]]; then
                        # Write the variable to the local .env file
                        echo "${example_var[0]}=${root_var[1]}" >> .env
                        continue
                    fi
                done <<< "$root_line"
            done < <(grep -v '^#' $HOME/.env)
        done <<< "$example_line"
    done < $example
}

# Check the directory for an .env.example file (confirm first that we're not inside a node_modules folder)
for example in $(find . -path \*.env.example -not -path \*/node_modules/\* -exec dirname {} \;); do
    # If the directory does not already have an .env file, copy relevant values from the user's root .env
    if [[ -f "$example/.env" ]]; then
        exit 0
    else
        echo "🪄 Using .env.example to generate a local .env"
        copy_env_file $example
    fi
done
