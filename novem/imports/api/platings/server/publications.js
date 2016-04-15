import { Meteor } from 'meteor/meteor';
import { Platings } from '../platings.js';
import { Processes } from '../../processes/processes.js';
import { Materials } from '../../materials/materials.js';

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
