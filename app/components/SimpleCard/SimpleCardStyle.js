import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	simpleCard: {
		padding: Metrics.baseMargin,
		marginHorizontal: Metrics.baseMargin,
		marginBottom: Metrics.smallMargin,
		backgroundColor: Colors.white,
		shadowColor: '#000',
		shadowRadius: 4,
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 3 },
		borderRadius: 10,
		elevation: 1,
	}
});
