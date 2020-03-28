import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import ApiListContainer from 'horus-native/app/containers/ApiListContainer';
import EntryDetail from 'horus-native/app/components/EntryDetail';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
	fetchEntries
} from "horus-native/app/actions/EntriesActions";

import { 
	getEntriesByDay,  
	getIsLoadingEntries, 
	getErrorEntries 
} from "horus-native/app/reducers";
import { connect } from "react-redux";

class DayEntriesContainer extends Component {
	
	_renderItems = ({ item }) => 
	{
		// let host_image = `https://r-horus-api.herokuapp.com${item.photo_url}`;
		return (
		<EntryDetail
			registrationMode={item.check}
		 	entryTime={moment(item.created_at).format("HH:mm")}
		 	imageURL={item.image_url}
		/>
	)}

	render() {
		return (
			<ApiListContainer
				data={this.props.dayEntries}
				keyExtractor={o => String(o.id)}
				loadData={() => {}}
				onRefresh={() => this.props.fetchEntries({from_date: this.props.date, until_date: this.props.date})}
				renderItem={this._renderItems}
				header={this.props.header}
				isRefreshing={this.props.isLoading}
				error={this.props.error} 
				footer={this.props.footer}
			/>
		);
	}
}

mapStateToProps = (state, ownProps) => ({
	dayEntries: getEntriesByDay(state, ownProps.date),
	isLoading: getIsLoadingEntries(state),
	error: getErrorEntries(state),
})

DayEntriesContainer.propTypes = {
	//header: PropTypes.func,
}

DayEntriesContainer.defaultProps = {
	//header: {<View />}
}

export default connect(
	mapStateToProps,
	{
		fetchEntries
	}
)(DayEntriesContainer);
