import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	circle: {
		width:10,
		height:10,
		borderRadius:10,
		backgroundColor: '#444',
		marginRight: 5,
	},
	circleContainer: {
		height: 24,
		justifyContent: 'center',
	},
	timeContainer: {
		width: 50,
	}
});
