import React, { Component } from 'react';
import {
	FlatList,
	RefreshControl,
	View
} from 'react-native';

import PropTypes from 'prop-types';
import { color } from 'horus-native/app/styles';
import ListEmptyState from 'horus-native/app/components/ListEmptyState';
import ListErrorState from 'horus-native/app/components/ListErrorState';

export default class ApiListContainer extends Component {	

	componentDidMount () {
		this.loadData();
	}

	loadData = () => {
		this.props.loadData();
	}

	onRefresh = () => {
		this.props.onRefresh();
	}
	
	onEndReached = () => {
		this.props.onEndReached()
	}

	render() {
		return (
			<FlatList
				data={this.props.data}
				keyExtractor={this.props.keyExtractor}
				renderItem={this.props.renderItem}
				ListEmptyComponent={() =>{
					if(this.props.error != '') return (<ListErrorState/>);
					if(!this.props.isRefreshing) return (<ListEmptyState/>);
					return null;
				}}
				refreshControl={
					<RefreshControl
						refreshing={this.props.isRefreshing}
						onRefresh={this.onRefresh}
					/>
				}
				ListFooterComponent={this.props.footer}
				onEndReached={this.onEndReached}
				onEndReachedThreshold={this.props.onEndReachedThreshold}
				ListHeaderComponent={this.props.header}
			/>
		);
	}
}

ApiListContainer.propTypes = {
	data: PropTypes.array,
	keyExtractor: PropTypes.func,
	error: PropTypes.string,
	isRefreshing: PropTypes.bool,
	loadData: PropTypes.func.isRequired,
	renderItem: PropTypes.func.isRequired,
	onRefresh: PropTypes.func,
	onEndReached: PropTypes.func,
}

ApiListContainer.defaultProps = {
	data: [],
	error: '',
	isRefreshing: false,
	onEndReached: () => {},
	onRefresh: () => {},

}
