# Snappy - Chat Application 
Snappy is chat application build with the power of MERN Stack. 

![snappy_login](https://github.com/user-attachments/assets/ba9233ab-07aa-4731-ad32-782c77e6224a)

![snappy](https://github.com/user-attachments/assets/2446835f-8be9-47d6-b637-0072a06500c7)

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.
### Installation

#### First Method
```shell
git clone https://github.com/shuklatushar12219829/ChatApp
cd ChatApp
```
Now rename env files from .env.example to .env
```shell
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
cd ..
```

Now install the dependencies
```shell
cd server
yarn
cd ..
cd public
yarn
```
We are almost done, Now just start the development server.

For Frontend.
```shell
cd public
yarn start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell
cd server
yarn start
```
Done! Now open localhost:3000 in your browser.

