#!/usr/bin/env bash

set -e

if [ -z "$CHROME_BIN"]; then
    # no specified CHROME_BIN...try and guess
    if [ -f "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" ]; then
        # WSL with remapped /mnt folder to /c
        CHROME_BIN="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    elif [ -f "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" ]; then
        # WSL default
        CHROME_BIN="/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    elif [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
        # OSX default
        CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    fi
fi

[ -z "$CHROME_BIN" ] && echo "Need to specify CHROME_BIN environment variable to point to your chrome binary" && exit 1

TARGET_URL=$1
CHROME_HOME=$(mktemp -d)

cleanup() {        
    rm -rf $CHROME_HOME
}

# listen for exit signals and trigger kill of background PID, wait a moment and then cleanup
trap 'kill -TERM $PID && sleep 0.5 && cleanup' EXIT TERM INT

PROFILE_PATH=$CHROME_HOME
# are we in a linux with /proc/version?
if [ -f /proc/version ]; then
    # are we in WSL?
    if grep -q Microsoft /proc/version; then
        # generate wsl path if in WSL
        PROFILE_PATH=$(wslpath -m $CHROME_HOME)
    fi
fi

# launch chrome and grab the PID
"$CHROME_BIN" --user-data-dir="$PROFILE_PATH" --no-first-run $1 &
PID=$!

# wait on the process to exit
wait $PID

# cleanup just for good measure and pass back the exit code from chrome
cleanup
exit $?
