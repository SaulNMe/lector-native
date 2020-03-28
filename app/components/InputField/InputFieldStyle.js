import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from 'horus-native/app/styles';

export default StyleSheet.create({
	input: {
		backgroundColor: Colors.grey,
		borderRadius: 5,
		paddingVertical: Metrics.baseMargin,
		paddingHorizontal: 12, 
		fontSize: Fonts.size.body
	}
});
