#!/bin/bash

rm -rf /var/www/marvelApp/android/app/build/outputs/apk/release

cd /var/www/marvelApp/android

./gradlew clean

cd /var/www/marvelApp

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd /var/www/marvelApp/android

./gradlew assembleRelease

cd /var/www/marvelApp/android/app/build/outputs/apk/release

mv app-release.apk marvelApp.apk
