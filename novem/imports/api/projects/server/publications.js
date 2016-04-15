import { Meteor } from 'meteor/meteor';
import { Projects } from '../projects.js';
import { Pieces } from '../../pieces/pieces.js';

Meteor.publishComposite('projects', function projects() {
	return {
		find() {
			return Projects.find({
				isActive: true,
			});
		},
		children: [{
			find(project) {
				return Pieces.find({
					projectId: project._id,
					isActive: true,
				});
			},
		}],
	};
});
