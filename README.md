# Throner Web

Web application built with my lovely React and CoreUI who allows to control a drone

### Features
This project provides web interface to performs some actions related to the drone:

* **View battery status:** Frequently receive update of the battery life when the drone is turned on
* **Stream the camera:** We can view in realtime what the camera is focused on. 
* **Take picture:** Press a button to send command to the drone to take a picture.
* **View picture taken with the camera**: Fetch pictures taken by the camera from Throner API and display on the page
* **Controls:** A interface contains a controller with many button. When we press on one button, a command is sent to the drone to execute the action.
* **View the path:** We can access to all the sessions of the drone and for each session, we can view the path on Google Maps. <br> A session reprensent the duration between the turn on and the turn off of the drone.

### Installation
```
git clone https://github.com/tericcabrel/throner-web.git
yarn install
cp .env.example .env
nano .env
```

### Start the server
```
yarn start
```

### Project
To view all the repositories involved on this project, follow the link below<br>
[View Throner project](https://github.com/tericcabrel/throner)
