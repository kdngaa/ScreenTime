# Welcome to ScreenTime!

ScreenTime is a clone of YouTube/TikTok, a popular video-sharing app that allows users to create and share 15-60 seconds videos, on any genre. Content creators hold the power and freedom to showcase as they pleased.

## Live Site Link
[ScreenTime](https://screentime-aa.herokuapp.com/)

## Technologies Used
### Front-End
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

### Back-End
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- SQLAlchemy


## Set Up
1) Clone this repository (https://github.com/kdngaa/ScreenTime/)
2) Install dependencies - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3) Create a .env file based on the .env.example with proper settings required for development environment
4) Set up PostgreSQL user, password and database, make sure it matches with your .env file
5) In the root directory in the terminal run pipenv shell then run the following commands
- flask db upgrade
- flask seed all
- flask run
6) To run the React App in development, checkout the README inside the react-app directory

## Features
### Uploads/Comments
Logged-in Users are able to upload/watch/edit/delete their own videos, as well as commenting/watching other's uploads
<img width="1231" alt="2022-05-22" src="https://user-images.githubusercontent.com/92695890/169780392-a017303d-94a6-4704-a383-83806f36901b.png">

### Interface
User's uploads include an 8-characters title and a caption of their own choice. These posts are presented vertically with the latest uploads being displayed first.
<img width="1235" alt="2022-05-22 (2)" src="https://user-images.githubusercontent.com/92695890/169781084-b180109c-31e9-476d-a4a1-974cc049d6bc.png">

## In-progress
- Users will be able to like/dislike other user's videos. Liked videos will be displayed on that specific user's profile.
- Through Socket.IO, users will be able to live chat with other users on the platform through private servers.
