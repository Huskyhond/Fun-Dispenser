#!/bin/bash
textReset=$(tput sgr0)
textGreen=$(tput setaf 2)
message_info () {
  echo "${textGreen}[Fundispenser]${textReset} $1"
}

message_info "Creating directories"
mkdir plugins platforms

message_info "Adding platforms"
cordova platform add android

message_info "Adding plugins"
cordova plugin add phonegap-nfc
cordova plugin add cordova-plugin-console
cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git