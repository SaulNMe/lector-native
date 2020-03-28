import Fonts from './Fonts'
import Colors from './Colors'
import Metrics from './Metrics'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
	screen: {
		paddedContainer: {
			flex: 1,
			flexDirection: 'column',
			padding: 16,
		},
		container: {
			flex: 1,
		},
		marginHorizontal: {
			marginHorizontal: Metrics.baseMargin
		},
		marginVertical: {
			marginVertical: Metrics.baseMargin
		},
		smallMarginVertical: {
			marginVertical: Metrics.smallMargin
		},
		smallMarginHorizontal: {
			marginHorizontal: Metrics.smallMargin
		},
		paddingHorizontal: {
			paddingHorizontal: Metrics.baseMargin
		},
		paddingVertical: {
			paddingVertical: Metrics.baseMargin
		},
		paddingAround: {
			padding: Metrics.baseMargin
		},
		doubleMarginTop: {
			marginTop: Metrics.doubleBaseMargin
		},
		paddingTop: {
			paddingTop: Metrics.baseMargin
		},
		marginTop: {
			marginTop: Metrics.baseMargin
		},
		smallMarginTop: {
			marginTop: Metrics.smallMargin
		},
		marginBottom: {
			marginBottom: Metrics.baseMargin
		},
		marginRight:{
			marginRight: Metrics.baseMargin
		},
		smallMarginBottom: {
			marginBottom: Metrics.smallMargin
		},
		row: {
			flexDirection: 'row'
		},
		centerObjects: {
			justifyContent: 'center',
			alignItems: 'center'
		},
		rowReverse: {
			flexDirection: 'row-reverse'
		},
		flex1: {
			flex: 1
		},
		flex2: {
			flex:2
		},
		flexWrap: {
			flexWrap: 'wrap'
		},
		justifyContentFlexStart: {
			justifyContent: 'flex-start'
		},
		justifyContentCenter: {
			justifyContent: 'center'
		},
		justifyContentFlexEnd: {
			justifyContent: 'flex-end'
		},
		alignItemsCenter: {
			alignItems: 'center'
		},
		alignItemsFlexEnd: {
			alignItems: 'flex-end'
		},
		justifyContentSpaceBetween: {
			justifyContent: 'space-between'
		},
		justifyContentSpaceAround: {
			justifyContent: 'space-around'
		},
		justifyContentSpaceEvenly: {
			justifyContent: 'space-evenly'
		},
		alignSelfStart: {
			alignSelf: 'flex-start'
		},
		alignSelfEnd: {
			alignSelf: 'flex-end'
		},
		fullWidth: {
			width: '100%'
		},
		fullHeight: {
			height: '100%'
		},
		filler: {
			position:'absolute', 
			top: 0, 
			bottom: 0, 
			right: 0, 
			left: 0, 
			width:null, 
			height:null			
		},
		headerSpace: {
			paddingTop: Metrics.navBarHeight
		},
		bg: {
			backgroundColor: Colors.bgColor
		},
		toolBar: {
			height: Metrics.screenHeight,
			width: Metrics.screenHeight,
			borderRadius: Metrics.screenHeight,
			backgroundColor: '#243575',
			position: 'absolute',
			top: -(Metrics.screenHeight / 2),
			alignSelf:'center',
			zIndex: -2
		},
		hide: { display: 'none' },
		bgWhite: {
			backgroundColor: Colors.white
		}
	},
	detailStackNavigatorOptions: {
		headerTransparent: true,
		headerTintColor: "#fff",
		headerStyle: {
			backgroundColor: 'transparent',
		}
	}
} 

export default ApplicationStyles

