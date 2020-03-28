import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		backgroundColor: '#243575',
		height: '100%',
		width: Metrics.screenWidth * 2,
		zIndex: 10,
	},
	slidContainer: {
		backgroundColor: '#243575',
		width: Metrics.screenWidth * 2,
		height: Metrics.screenHeight * 2,
		zIndex: 10,
		transform: [{translateX: 0}, {translateY: -Metrics.screenHeight * 1.5}],
		borderRadius: 10000,
	},
	slidImg: {
		marginBottom: 32
	},
	bordered: {
		borderRadius: 10000
	},
	logoImage: {
		position: 'absolute',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		top: 30,
		zIndex: 11
	},
	text: {
		fontSize: 20,
		width: 330,
		color: '#fff',
		textAlign: 'center'
	},
	infoText: {
		marginBottom: 24,
		paddingHorizontal: Metrics.doubleBaseMargin,
		width: Metrics.screenWidth
	},
});
