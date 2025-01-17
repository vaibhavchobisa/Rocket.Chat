import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';

import { hasPermission } from '../../../../../app/authorization/server';
import { LivechatEnterprise } from '../lib/LivechatEnterprise';

declare module '@rocket.chat/ui-contexts' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'livechat:removeMonitor'(username: string): boolean;
	}
}

Meteor.methods<ServerMethods>({
	'livechat:removeMonitor'(username) {
		const uid = Meteor.userId();
		if (!uid || !hasPermission(uid, 'manage-livechat-monitors')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', {
				method: 'livechat:removeMonitor',
			});
		}

		return LivechatEnterprise.removeMonitor(username);
	},
});
