import { Meteor } from 'meteor/meteor';
import { Processes } from '../../../api/processes/processes.js';

Meteor.publish('allProcesses', function allProcesses() {
	return Processes.find({
		isActive: true,
	});
});
