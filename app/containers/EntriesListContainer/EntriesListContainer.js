import React, { Component } from 'react';

import { View, Platform } from 'react-native';
import HugeText from 'horus-native/app/components/HugeText';
import SubtitleText from 'horus-native/app/components/SubtitleText';

import ApiListContainer from 'horus-native/app/containers/ApiListContainer';
import EntriesCard from 'horus-native/app/components/EntriesCard';

import styles from './EntriesListContainerStyles';
import moment from 'moment';
import PropTypes from 'prop-types';

import NavigationService from 'horus-native/app/services/NavigationService.js';
import { Notifications, Permissions } from 'expo';

import { 
	getEntries, 
	getEntriesGroupedByDay, 
	getIsLoadingEntries, 
	getErrorEntries,
	getUserData,
	getStudents,
} from "horus-native/app/reducers";
import { fetchEntriesBatch, reloadEntries } from "horus-native/app/actions/EntriesActions";
import { fetchStudents } from "horus-native/app/actions/StudentsActions";

import { connect } from "react-redux";

class EntriesListContainer extends Component {	

	componentDidMount = () => {
		this.props.fetchStudents();
	}

	_renderItems = ({ item }) => (
		<EntriesCard
			title={moment(item.date).format('dddd D')}
			entries={ item.collection }
			onPress={()=> NavigationService.navigate('DetailScreen', {date: item.date}) }
			// onPress={()=> { NavigationService.navigate('DetailScreen', item.date)}}
			students={this.props.students}
		/>
	)
		
	header = () => (
		<View>
			{Platform.OS != 'ios' && <View style={styles.toolBar}></View>}
			<View style={styles.paddingAround}>
				<HugeText 
					text={`Bienvenido a Horus, ${this.props.user.first_name}`}
					color="white"
					weight="medium"
				/>
				<SubtitleText 
					text='Estas son las entradas y salidas de tus hijos. Toca para ver más detalles.'
					color="white"
				/>
			</View>
		</View>
	)

	xProcessor = () => {
		let result = this.props.groupedEntries.filter( group => {
			return moment(group.date).format('MMMM') === this.props.x;
		});
		return result;
	}

	componentDidMount() {
		// Notifications.addListener( notification => {
		// 	this.props.fetchEntries();
		// })
	}

	render() {
		return (
			<ApiListContainer
				data={this.xProcessor()}
				keyExtractor={o => String(o.date)}
				loadData={this.props.fetchEntriesBatch}
				onRefresh={this.props.reloadEntries}
				renderItem={this._renderItems}
				header={this.header}
				onEndReached={this.props.fetchEntriesBatch}
				onEndReachedThreshold={1}
				error={String(this.props.error)}
				isRefreshing={this.props.isLoading}
			/>
		);
	}
}

mapStateToProps = state => ({
	groupedEntries: getEntriesGroupedByDay(state),
	isLoading: getIsLoadingEntries(state),
	error: getErrorEntries(state),
	user: getUserData(state),
	students: getStudents(state),
})


EntriesListContainer.propTypes = {
	//header: PropTypes.func,
}

EntriesListContainer.defaultProps = {
	//header: {<View />}
}

export default connect(
	mapStateToProps,
	{
		fetchEntriesBatch,
		reloadEntries,
		fetchStudents,
	}
)(EntriesListContainer);
