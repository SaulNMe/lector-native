import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'horus-native/app/styles';
import { ApplicationStyles } from 'horus-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	buttonBox: {
		height: 50,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	cancelButtonBox: {
		height: 50,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		borderRadius: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	body: {
		backgroundColor: 'transparent',
		marginBottom: 5
	},
	container: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		left: Metrics.baseSpace,
		height: 40,
		width: '90%',
		backgroundColor: Colors.white,
	},
	containerTransp: {
		backgroundColor: Colors.transparent,
	},
	icon: { 
		color: Colors.dark,
	},
	transparent: {
		color: Colors.white,
		backgroundColor: Colors.transparent,
	}
});
