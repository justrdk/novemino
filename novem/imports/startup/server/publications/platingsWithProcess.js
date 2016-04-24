import { Meteor } from 'meteor/meteor';
import { Platings } from '../../../api/platings/platings.js';
import { Processes } from '../../../api/processes/processes.js';

Meteor.publishComposite('platingsProcesses', function platingsProcesses() {
	return {
		find() {
			return Platings.find({
				isActive: true,
			});
		},
		children: [{
			find(plating) {
				return Processes.find({
					platingId: plating._id,
					isActive: true,
				});
			},
		}],
	};
});
