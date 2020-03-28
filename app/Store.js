import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import rootReducer from 'horus-native/app/reducers'
import Reactotron from 'horus-native/config/ReactotronConfig'

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel1,
	whitelist: ['Auth']
};

const pReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
	pReducer,
	compose(
		applyMiddleware(thunk),
		Reactotron.createEnhancer()
	)
);

export default store;
export const persistor = persistStore(store);