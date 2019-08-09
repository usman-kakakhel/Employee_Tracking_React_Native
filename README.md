The Repo contains the employee tracking application.
To install the application in your system, clone the repo and install it using:

**$ npm install**

This will install the node_modules in the React Native application.

***Android:***

For running this project in unix, you have to change the ./gradlew file such
that the file-endings are changed to unix format as they are currently in the
windows format. This can be done by:

**$ sudo apt-get install dos2unix**

in "project"/android/ :

**$ dos2unix ./gradlew**

Create a debug.keystore in android/app/ using:

**$ keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000**

run the app:

**$ react-native run-android**

**$ npm start**


