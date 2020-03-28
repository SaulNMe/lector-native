import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	logo: {
		height: 40,
		width: 40,
	},
	navBarHeight: {
		height: Metrics.navBarHeight
	},
	backgroundColor: {
		backgroundColor: 'transparent'
	},
	marginStatus: {
		paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		backgroundColor: 'transparent'
	}
});
