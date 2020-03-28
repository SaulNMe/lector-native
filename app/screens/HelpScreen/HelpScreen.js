import React, { Component } from 'react';
import { 
	Text, 
	View,
	SafeAreaView,
	StatusBar
} from 'react-native';

import styles from './HelpScreenStyle';
import { Colors } from 'horus-native/app/styles';

import PrimaryBtn from 'horus-native/app/components/PrimaryBtn';
import ContactInfoItem from 'horus-native/app/components/ContactInfoItem';
import BigText from 'horus-native/app/components/BigText';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import CloseModal from 'horus-native/app/components/CloseModal';
import {Linking} from 'react-native';


export default class HelpScreen extends Component {
	calling = () => {
		Linking.openURL(`tel:7717289636`)
	}
	render() {
		return (
			<SafeAreaView style={[styles.flex1, {backgroundColor: '#fff'}]}>
				<StatusBar barStyle="dark-content"/>
				<View style={[styles.container, styles.paddingAround]}>
					<View style={[styles.paddingVertical, styles.row, styles.justifyContentFlexEnd, styles.alignItemsCenter]}>
						<CloseModal 
							onPress={() => this.props.navigation.navigate('HomeScreen')}
						/>
					</View>
					<View style={styles.flex1}>
						<BigText 
							text="Soporte Técnico"
							weight="bold"
						/>
						<SubtitleText 
							text="Horario de atención"
						/>
						<SubtitleText 
							text="Lunes a viernes de 9:00 a 15:00."
						/>
						<View style={styles.marginVertical}>
							<SubtitleText 
								text="Contáctanos"
							/>
						</View>
						<ContactInfoItem 
							iconName="phone"
							text="771 728 96 36"
						/>
						<ContactInfoItem 
							iconName="mail"
							text="atencion@horus.com"
						/>
					</View>				
					<PrimaryBtn 
						text="Llamar"
						onPress={this.calling}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
