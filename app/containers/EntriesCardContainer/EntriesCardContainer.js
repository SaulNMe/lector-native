import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import PropTypes from 'prop-types';
import SimpleCard from 'horus-native/app/components/SimpleCard';
import Entry from 'horus-native/app/components/Entry';
import moment from 'moment';

export default class EntriesCardContainer extends Component {

	render() {
		return (
			<SimpleCard>	
				<SubtitleText
					text={this.props.title}
					color="blue"
				/>
				{ this.props.items.map(item => (
					<Entry 
						status={false} 
						entryTime="12:00"
						name="Gustavo Pacheco Pagola"
					/>
				))}
			</SimpleCard>
		);
	}
}

EntriesCard.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array
}

EntriesCard.defaultProps = {
	title: 'Title',
	items: []
}
