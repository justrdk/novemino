import { Meteor } from 'meteor/meteor';
import { Platings } from '../../../api/platings/platings.js';
import { Processes } from '../../../api/processes/processes.js';
import { Materials } from '../../../api/materials/materials.js';

Meteor.publishComposite('platingsProcessesMaterials', function platingsProcessesMaterials() {
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
			children: [{
				find(process) {
					return Materials.find({
						processId: process._id,
						isActive: true,
					});
				},
			}],
		}],
	};
});
