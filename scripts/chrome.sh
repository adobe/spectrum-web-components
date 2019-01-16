#!/usr/bin/env bash

set -e

TARGET_URL=$1
CHROME_HOME=$PWD/.chrome

cleanup() {        
    rm -rf $CHROME_HOME
}

# listen for exit signals and trigger kill of background PID, wait a moment and then cleanup
trap 'kill -TERM $PID && sleep 0.5 && cleanup' EXIT TERM INT

# clean just in case of a bad exit previously
cleanup

# make the home folder
mkdir -p $CHROME_HOME

PROFILE_PATH=$CHROME_HOME
# are we in a linux with /proc/version?
if [ -f /proc/version ]; then
    # are we in WSL?
    if grep -q Microsoft /proc/version; then
        # generate wsl path if in WSL
        PROFILE_PATH=$(wslpath -m $CHROME_HOME)
    fi
fi

# launch firefox and grab the PID
"$CHROME_BIN" --user-data-dir="$PROFILE_PATH" $1 &
PID=$!

# wait on the process to exit
wait $PID

# cleanup just for good measure and pass back the exit code from chrome
cleanup
exit $?
