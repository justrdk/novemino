import { Meteor } from 'meteor/meteor';
import { Platings } from '../../../api/platings/platings.js';

Meteor.publish('allPlatings', function allPlatings() {
	return Platings.find({
		isActive: true,
	});
});
