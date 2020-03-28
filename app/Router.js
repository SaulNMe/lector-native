// Use this file to create all app navigators.

import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

// For each navigator, import its screens. Each screen may be used in many navigators
// To add more screens, run yo rng:g screen <screen-name>

import WelcomeScreen from 'horus-native/app/screens/WelcomeScreen';
import CodeLoginScreen from 'horus-native/app/screens/CodeLoginScreen';
import HomeScreen from 'horus-native/app/screens/HomeScreen';
import DetailScreen from 'horus-native/app/screens/DetailScreen';
import HelpScreen from 'horus-native/app/screens/HelpScreen';
import CalendarScreen from 'horus-native/app/screens/CalendarScreen';
import AuthLoadingScreen from 'horus-native/app/screens/AuthLoadingScreen';


// You might want to add some navigator options to your navigator.
// You can edit this options in app/serivices/navigatorOptions.jsx
// import { stackNavigatorOptions } from 'axioma-native/app/services/navigatorOptions';
import { ApplicationStyles } from 'horus-native/app/styles';

const AppNavigator = createStackNavigator({
	HomeScreen,
	DetailScreen
}, {headerLayoutPreset: 'center'});

const ModalNavigator = createStackNavigator({
	AppNavigator,
	HelpScreen,
	CalendarScreen
}, {
	mode:'modal',
	headerMode:'none'
});

const AuthNavigator = createStackNavigator({
	WelcomeScreen,
	CodeLoginScreen
}, {
	headerMode: 'none',
});

const MainNavigator = createSwitchNavigator({
	AuthLoadingScreen,
	App: ModalNavigator,
	Auth: AuthNavigator
}, {
	initialRouteName:'AuthLoadingScreen'
});


export default createAppContainer(MainNavigator);

