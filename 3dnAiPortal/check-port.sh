#!/bin/bash

# Check if anything is running on port 3000
PORT_PID=$(lsof -ti:3000)

if [ ! -z "$PORT_PID" ]; then
    echo "Port 3000 is in use by process $PORT_PID. Killing process..."
    kill -9 $PORT_PID
    echo "Process killed"
fi
