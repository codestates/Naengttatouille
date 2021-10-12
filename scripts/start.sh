#!/bin/bash
cd /home/ubuntu/Naengttatouille/server

export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export HTTP_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HTTP_PORT --query Parameters[0].Value | sed 's/"//g')
export CLIENT=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start -f index.js

#초기(아래)
#cd /home/ubuntu/Naengttatouille/server
#authbind --deep pm2 start index.js
