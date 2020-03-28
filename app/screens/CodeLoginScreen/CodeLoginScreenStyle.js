import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Fonts, Colors, Metrics, ApplicationStyles } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	backContainer: {
		position: 'absolute',
		padding: Metrics.baseMargin,
		paddingTop: Metrics.screenHeight / 2,
		flex: 1,
		width: '100%'
	},
	navBarHeight: {
		height: (Platform.OS === 'ios') ? Metrics.navBarHeight*0.7 : Metrics.navBarHeight*1.4, 
	},
	marginStatus: {
		paddingTop: (Platform.OS != 'ios') ? StatusBar.currentHeight : 0,
		marginTop: (Platform.OS === 'ios') ? Metrics.navBarHeight*0.5 : 0
	},
	paddedTop: {
		paddingTop: '30%'
	}
});
