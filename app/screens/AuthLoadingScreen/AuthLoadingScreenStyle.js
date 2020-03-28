import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	backgroundBlue: {
		backgroundColor: Colors.main
	},
	loadImage:{
		width: 100,
		height: 100,
	}
});
