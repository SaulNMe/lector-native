import {
	DEV_API_HOST,
	DEV_AUTH_HOST,
	DEV_API_CLIENT_ID,
	API_HOST,
	AUTH_HOST,
	API_CLIENT_ID
} from 'react-native-dotenv';

import { Constants as ExpoConstants } from 'expo';
import { Constants } from 'expo';

const getChannelConfigs = (releaseChannel = '') => {
	if (releaseChannel && releaseChannel.indexOf('prod') !== -1) {
		return {
			API_HOST: API_HOST,
			AUTH_HOST: AUTH_HOST,
			API_CLIENT_ID: API_CLIENT_ID
		};
	} else {
		return {
			API_HOST: DEV_API_HOST,
			AUTH_HOST: DEV_AUTH_HOST,
			API_CLIENT_ID: DEV_API_CLIENT_ID
		}
	}
};

const ChannelConfig = Object.freeze(getChannelConfigs(Constants.manifest.releaseChannel));


export default ChannelConfig;
