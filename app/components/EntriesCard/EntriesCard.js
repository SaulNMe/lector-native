import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './EntriesCardStyle';

import SimpleCard from 'horus-native/app/components/SimpleCard';
import Entry from 'horus-native/app/components/Entry';
import moment from 'moment';
import SubtitleText from 'horus-native/app/components/SubtitleText';

export default class EntriesCard extends Component {
	
	setName = (entry) =>{
		let studentName= '';
		this.props.students.map(student => entry.student_id === student.id ? studentName = student.first_name : null )
		return studentName;
	}

	render() {
		return (
			<SimpleCard
				onPress={this.props.onPress}
			>
				<View style={styles.smallMarginBottom}>
					<SubtitleText
						text={this.props.title}
						color="blue"
					/>
				</View>
				{ this.props.entries.map(entry => (
					<Entry 
						registrationMode={entry.check}
						entryTime={moment(entry.created_at).format("HH:mm")}
						name={this.setName(entry)}
						key={entry.id}
					/>
				))}
			</SimpleCard>
		);
	}
}

EntriesCard.propTypes = {
	title: PropTypes.string,
	entries: PropTypes.array,
	students: PropTypes.array,
}

EntriesCard.defaultProps = {
	title: 'Title',
	entries: [],
	students: [],
}
