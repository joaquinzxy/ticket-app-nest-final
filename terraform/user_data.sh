#!/bin/bash
sudo yum update -y
sudo yum install npm -y
sudo npm install yarn -g -y
sudo yum install docker -y
sudo yum install git -y
sudo service docker start
git clone 'https://github.com/joaquinzxy/ticket-app-nest-final.git'
cd ticket-app-nest-final/
sudo docker build -t ticket-app-img .
sudo docker run -d --name ticket-app -p 3000:3000 ticket-app-img