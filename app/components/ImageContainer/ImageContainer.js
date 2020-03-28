import React, { Component } from 'react';
import { 
	Text, 
	View,
	Image,
	ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './ImageContainerStyle';

export default class ImageContainer extends Component {
	state = { loaded: false, error: false }

	_onError = () => {
		this.setState({ error: true })
	}
	_onLoad = () => {
		setTimeout(()=>{this.setState({ loaded: true })}, 1500);
	}
	render() {
		return (
			<View style={[styles.imageContainer, styles.bgWhite, styles.centerObjects]}>
				{!this.state.loaded ?
					(
						<Image 
							style={[styles.borderImage, styles.customImage]}
							//loading
							onLoad={this._onLoad}
							source={require('horus-native/assets/loading-state.png')} 
						/>
					) :
					this.state.error || !this.props.imageURL ? 
					(<Image 
						style={[styles.filler, styles.borderImage, styles.resizeMode]}
						source={require('horus-native/assets/empty-state.png')}
					/>) : 
					(<Image 
						style={[styles.filler, styles.borderImage]}
						//sin error
						defaultSource={require('horus-native/assets/contact.png')}
						onError={this._onError}
						source={{uri: this.props.imageURL}}
					/>)
				}
			</View>
		);
	}
}

ImageContainer.propTypes = {
	imageURL: PropTypes.string
}

ImageContainer.defaultProps = {
	imageURL: ''
}
