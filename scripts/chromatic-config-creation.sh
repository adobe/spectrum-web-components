#!/usr/bin/bash

# Copyright 2024 Adobe. All rights reserved.
# This file is licensed to you under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software distributed under
# the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
# OF ANY KIND, either express or implied. See the License for the specific language
# governing permissions and limitations under the License.

env="$(pwd)/.env"
config_path="$(pwd)/.storybook/chromatic.config.json"

create_config() {
	[[ ! -f "$1" || -f "$2" ]] && return

	echo "🪄 Using .env to generate a local chromatic.config.json"

	# Initialize the chromatic config file
	echo "{" > $2

	# Read in the local env example, line-by-line and look for variable names
	while IFS= read -r line; do
		[[ "$line" != "CHROMATIC"* ]] && continue

		# Split the line into an array with 0=key, 1=value
		while IFS='=' read -ra parts; do
			if [[ "${parts[0]}" = "" || "${parts[1]}" = "" ]]; then
				continue
			fi

			# Remove the CHROMATIC_ prefix and convert to lower case
			while IFS='_' read -ra split; do
				for i in "${!split[@]}"; do
					[[ "${split[$i]}" = "CHROMATIC" ]] && unset "split[$i]"
					split[$i]=$(tr '[:upper:]' '[:lower:]' <<< ${split[$i]})
					# If the part is the first in the array, capitalize it
					[[ $i > 1 ]] && split[$i]=$(tr '[:lower:]' '[:upper:]' <<< ${split[$i]:0:1})${split[$i]:1}
				done

				key=$(printf "%s" "${split[@]}")
			done <<< "${parts[0]}"

			# Write the key/value pair to the chromatic config file
			# if the value is a boolean, skip the quotation marks
			if [[ "${parts[1]}" == "true" || "${parts[1]}" == "false" ]]; then
				echo "  \"${key}\": ${parts[1]}," >> $2
			else
				echo "  \"${key}\": \"${parts[1]//\"/}\"," >> $2
			fi

		done <<< "$line"
	done < $1

	# Remove the last comma from the chromatic config file
	sed '$ s/,$//' $2 > $2.tmp && mv $2.tmp $2

	# Close the chromatic config file
	echo "}" >> $2
	echo "" >> $2
}

create_config $env $config_path
