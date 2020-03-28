import { StyleSheet } from 'react-native';
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
	logoImage: {
		position: 'absolute',
		top: 48,
		zIndex: 11
	}
});
