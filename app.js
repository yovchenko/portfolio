angular.module('starter', ['ionic','ngCordova'])
 
.run(function($ionicPlatform) {
$ionicPlatform.ready(function() {
// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
// for form inputs)
if(window.cordova && window.cordova.plugins.Keyboard) {
cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
}
if(window.StatusBar) {
StatusBar.styleDefault();
}
});
})
 
.controller('DeviceController', function($ionicPlatform, $scope, $cordovaDevice) {
$ionicPlatform.ready(function() {
$scope.$apply(function() {
// sometimes binding does not work! :/
// getting device infor from $cordovaDevice
var device = $cordovaDevice.getDevice();
$scope.manufacturer = device.manufacturer;
$scope.model = device.model;
$scope.platform = device.platform;
$scope.uuid = device.uuid;
});
});
})