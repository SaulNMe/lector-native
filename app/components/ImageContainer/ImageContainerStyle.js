import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	imageContainer: {
		width: Metrics.screenWidth * .85,
		height: Metrics.screenHeight * .35,
		borderRadius: 10
	},	
	borderImage: {
		borderRadius: 10,
		borderColor: Colors.white,
		borderWidth: 1,
		overflow: 'hidden'
	},
	resizeMode: {
		resizeMode: 'cover'
	},
	customImage: {
		width:150, 
		height:150
	}
});
