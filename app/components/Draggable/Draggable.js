import React, { Component } from 'react';
import {
	View,
	PanResponder,
	Animated,
	Image,
	Text,
	TouchableOpacity
} from "react-native";
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

import styles from './DraggableStyle';
import { Metrics } from 'horus-native/app/styles';

import HugeText from 'horus-native/app/components/HugeText';
import BodyText from 'horus-native/app/components/BodyText';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import NavigationService from 'horus-native/app/services/NavigationService.js';

export default class Draggable extends Component {
	state = {
		pan: new Animated.ValueXY(),
		slid: false,
		borderRadius: new Animated.Value(0),
		fadeOut: new Animated.Value(1),
		fadeIn: new Animated.Value(0),
		disappear: false,
		bordered: false,
	};

	// Change state when slid
	afterSlide = () => {
		this.setState({
			slid: true,
		});
		this.props.onSlide();
	}

	textAnimations = (fadeOut, fadeIn) => {
		Animated.timing(
		    this.state[fadeOut],
		    {
		        toValue: 0,
		        duration: 500,
		        useNativeDriver: true
		    }
		).start();
		setTimeout(() => { 
			this.setState({ disappear: fadeIn === 'fadeIn' ? true: false });
			Animated.timing(
			    this.state[fadeIn],
			    {
			        toValue: 1,
			        duration: 500,
			        useNativeDriver: true
			    }
			).start();
		}, 500)
	}

	componentWillMount() {
		this.setState({
			slid: this.props.slid || false,
			disappear: this.props.slid || false
		});

		// Initialize PanResponder with move handling
		this.panResponder = PanResponder.create({
		    //Capture movement of view
			onMoveShouldSetResponderCapture: () => true,
    		onMoveShouldSetPanResponderCapture: () => true,

			//On Start
			onPanResponderGrant: (e, gestureState) => {
				if (!this.state.slid)
					this.state.pan.setValue({x: 0, y: 0});
		    },

			//Animation
			onPanResponderMove: (e, gestureState) => {
				if (!this.state.slid) {
					if ((gestureState.dy < 0))
						this.state.pan.setValue({ x: 0, y: gestureState.dy })
					if (-1 * gestureState.dy > Metrics.screenHeight * 0.2 && !this.state.bordered) {
						this.setState({
							bordered: true
						});	
						Animated.timing(
						    this.state.borderRadius,
						    {
						        toValue: 10,
						        duration: 500,
						        useNativeDriver: true
						    }
						).start();
						this.textAnimations('fadeOut', 'fadeIn');
					} else if (-1 * gestureState.dy < Metrics.screenHeight * 0.2 && this.state.bordered) {
						this.setState({
							bordered: false,
						});
						Animated.timing(
						    this.state.borderRadius,
						    {
						        toValue: 0,
						        duration: 500,
						        useNativeDriver: true
						    }
						).start();
						this.textAnimations('fadeIn', 'fadeOut');
					}
				}
			},

			//On Release
			onPanResponderRelease: (e, {vx, vy}) => {
				if ((this.state.pan.y._value * -1) > (Metrics.screenHeight * 0.2)) {
					this.state.pan.setValue({ x: 0, y: -Metrics.screenHeight / 2 });
					this.afterSlide();
				} else if (!this.state.slid) {
					this.state.pan.setValue({ x: 0, y: 0 });
					this.setState({
						borderRadius: new Animated.Value(0),
					});
				}
			}
		});
	}

	render() {
		// Destructure the value of pan from the state
		let { pan } = this.state;
		// Calculate the x and y transform from the pan value
		let [translateX, translateY] = [pan.x, pan.y];
		// Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
		let panStyle = { transform: [{translateX}, {translateY}] };	
		//Fades
		let fadeOut = {
			opacity: this.state.fadeOut
		}
		let fadeIn = {
			opacity: this.state.fadeIn
		}
		//Animated Border
		let animatedStyle = {
			borderBottomLeftRadius: this.state.borderRadius.interpolate({
				inputRange: [0, 10],
				outputRange: [0, 1000],
			}),
			borderBottomRightRadius: this.state.borderRadius.interpolate({
				inputRange: [0, 10],
				outputRange: [0, 1000],
			}),
		}

		let texts = this.state.slid ? null: (
			<Animated.View style={[styles.column, styles.alignItemsCenter, fadeOut, styles.doubleMarginTop]}>
				<HugeText 
					text='Bienvenido a Horus'
					color='white'
				/>
				<View style={styles.marginHorizontal}>
					<BodyText 
						center
						text='Te notificaremos cuando tus hijos entren o salgan de la escuela'
						color='white'
					/>
				</View>
			</Animated.View>
		);

		return (
			<View style={[styles.column, styles.alignItemsCenter]}>
				<Animated.View
					{...this.panResponder.panHandlers}
					style={[ 
						this.props.slidContainer ? null: panStyle, 
						this.props.slidContainer ? styles.slidContainer: styles.container, 
						this.props.slidContainer ? null: animatedStyle, 
						styles.column, styles.alignItemsCenter, styles.justifyContentSpaceBetween
					]}
				>
					<Animated.View style={[
							styles.container, styles.column, styles.alignItemsCenter,
							this.props.slidContainer ? styles.bordered: animatedStyle, 
							styles.justifyContentFlexEnd
						]}
					>
						<Animated.View style={[styles.marginBottom, this.props.slidContainer ? null: fadeIn, this.state.disappear ? null: styles.hide]}> 
							<View style={[styles.alignItemsCenter, styles.justifyContentSpaceBetween]}>
								<View style={[styles.infoText]}>
									<BodyText
										color='white'
										center
										text={this.props.text}
									/>
									{ this.props.slidContainer ? (
										<SubtitleText 
											text={this.props.phoneNumber}
											color='white'
											center
											weight='medium'
										/>
									): (<SubtitleText text=' ' />) }
								</View>
								{ this.props.slidContainer ? (
									<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
										<BodyText 
											text='Reintentar'
											color='white'
										/>	
									</TouchableOpacity>
								):(<BodyText 
									text='Ingresar'
									color='white'
								/>)}
							</View>
						</Animated.View>
						<Animated.View style={[styles.column, styles.justifyContentCenter, styles.alignItemsCenter, styles.marginBottom, fadeOut, this.state.disappear ? styles.hide: null]}>
							<Feather name="chevron-up" size={20} color="white" />
							<BodyText
								text='Desliza'
								color='white'
							/>
						</Animated.View>
					</Animated.View>
				</Animated.View>
				<View style={[styles.logoImage]}>
					<Image
						source={require('horus-native/assets/HorusLogoW.png')}
						style={{width: 130, height: 130}}
					/>
					{texts}

					{/*this.props.slid ?  
						(
							<View style={[styles.column, styles.alignItemsCenter, styles.justifyContentSpaceBetween, styles.flex1]}>
								<View style={styles.centerObjects}>
									<BodyText
										color='white'
										center
										text={this.props.text}
									/>
									<SubtitleText 
										text={this.props.phoneNumber}
										color='white'
										weight='bold'
									/>
								</View>
								<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
									<BodyText 
										text='Reintentar'
										color='white'
									/>	
								</TouchableOpacity>
							</View>
						) : null*/}
				</View>
			</View>
		);
	}
}

Draggable.propTypes = {
	// data: PropTypes.array
}

Draggable.defaultProps = {
	// data: []
}
