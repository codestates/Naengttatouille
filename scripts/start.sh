#!/bin/bash
cd /home/ubuntu/Naengttatouille/server
authbind --deep pm2 start app.js
