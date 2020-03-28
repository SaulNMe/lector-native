import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
} from 'react-native';

import { connect } from "react-redux";
import styles from './HomeHeaderContainerStyles';
import HeaderMore from 'horus-native/app/components/HeaderMore';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import { getEntriesSelectedMonth } from "horus-native/app/reducers";
import moment from 'moment';
import NavigationService from 'horus-native/app/services/NavigationService';
import { selectMonthAndReload } from 'horus-native/app/actions/EntriesActions';
import { logout } from 'horus-native/app/actions/AuthActions';
 
let month3 = moment().format('YYYY-MM');
let month2 = moment().subtract(1,'month').format('YYYY-MM');
let month1 = moment().subtract(2,'month').format('YYYY-MM');

let months = [month3, month2, month1];

let menu = ['Ayuda', 'Cerrar sesión', 'Cancelar'];
class HomeHeaderContainer extends Component {	

	handleChange  = (index, menu, items) => {
		if(menu) {
			if(index==1){
				this.props.logout();
			}
			if(index==0){
				NavigationService.navigate('HelpScreen');
			}
		} else {
			this.setState({month: items[index]})
		}
	}

	selectMonth = (index) => {
		this.props.selectMonthAndReload(months[index]);
	}

	render() {
		return (
			<View style={[styles.navBarHeight, styles.row, styles.alignItemsCenter, styles.backgroundColor, styles.paddingHorizontal, styles.marginStatus]}>
				<View style={[styles.logo, styles.flex1]}>
					<Image 
						source={require('horus-native/assets/logo.png')}
						style={{height: 40, width: 41}}
					/>
				</View>
				<View style={[styles.flex2, styles.alignItemsCenter]}>
					<SubtitleText
						text={moment(this.props.selectedMonth).format('MMMM')}
						color="white"
					/>
				</View>
				<View style={[styles.row, styles.flex1, styles.justifyContentFlexEnd, styles.alignItemsCenter]}>
					<View style={styles.marginHorizontal}>
						<HeaderMore 
							navigation={this.props.navigation} 
							icon='calendar'
							items={months.map(date => moment(date).format('MMMM')).concat('Cancel')}
							onPress={this.selectMonth}
							menu={false}
						/>
					</View>
					<HeaderMore 
						navigation={this.props.navigation} 
						icon='menu'
						items={menu}
						onPress={this.handleChange}
						destructive={1}
					/>
				</View>
			</View>
		);
	}
}

mapStateToProps = state => ({
	selectedMonth: getEntriesSelectedMonth(state),
})

export default connect(mapStateToProps,
{ 	selectMonthAndReload,
	logout
})(HomeHeaderContainer);
