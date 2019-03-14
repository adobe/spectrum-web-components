#!/bin/bash
set -e

eslint -f pretty "tasks/**/*.js"
eslint -f pretty "scripts/**/*.js"
eslint -f pretty "src/**/*.ts"

stylelint "src/**/*.css" "styles/**/*.css"