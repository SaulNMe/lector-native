import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
function goBack(routename){
	const backAction = NavigationActions.back({
		key: routename
	})
	_navigator.dispatch(backAction);
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};