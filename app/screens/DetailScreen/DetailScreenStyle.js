import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen, 
	backgroundMain: {
		backgroundColor: '#243575',
	},
	navBarHeight: {
		height: Metrics.navBarHeight
	}
});
 