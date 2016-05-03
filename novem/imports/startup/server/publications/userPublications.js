import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function publishUserData() {
	return Meteor.users.find({
		_id: this.userId,
	}, {
		fields: {
			services: 0,
		},
	});
});
