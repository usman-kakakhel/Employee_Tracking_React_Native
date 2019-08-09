# Employee_Tracking_React_Native
An Android and IOS application, which tracks the location of the employees present in the office. BTLE-beacons are used to track where in the office an employee spends most of their time and the data is locally saved in their devices. Features such as putting the phone to silent whenever a certain room is entered are also implemented. Due to the nature of the application, the application runs in the background, even if it is swiped from the task manager, until it is manually closed from a button inside the application.

The Repo contains the employee tracking application.
To install the application in your system, clone the repo and install it using:

## $ npm install

This will install the node_modules in the React Native application.

# Android:

For running this project in unix, you have to change the ./gradlew file such
that the file-endings are changed to unix format as they are currently in the
windows format. This can be done by:

# $ sudo apt-get install dos2unix

in "project"/android/ :

# $ dos2unix ./gradlew

Create a debug.keystore in android/app/ using:

# $ keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

run the app:

# $ react-native run-android

# $ npm start
