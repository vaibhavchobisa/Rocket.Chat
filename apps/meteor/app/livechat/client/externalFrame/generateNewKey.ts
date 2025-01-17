import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';

import { generateKey } from './crypto';

Meteor.methods<ServerMethods>({
	async omnichannelExternalFrameGenerateKey() {
		const key = await generateKey();
		Meteor.call('saveSetting', 'Omnichannel_External_Frame_Encryption_JWK', key);
	},
});
