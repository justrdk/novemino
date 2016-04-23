import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../api/projects/projects.js';
import { Pieces } from '../../../api/pieces/pieces.js';

Meteor.publishComposite('projectsWithPieces', function projects() {
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
