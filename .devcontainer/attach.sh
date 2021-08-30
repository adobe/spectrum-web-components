#!/bin/bash
kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
minimum=5242880
if ((kb < minimum)); then
    echo "Warning: low memory (${kb} KB total, ${minimum} KB recommended)"
    echo "To increase Docker's resources:"
    echo ' - Mac: https://docs.docker.com/desktop/mac/#resources'
    echo ' - Windows: https://docs.docker.com/desktop/windows/#resources'
fi
