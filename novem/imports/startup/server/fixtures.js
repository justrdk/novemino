import { Meteor } from 'meteor/meteor';

import { Projects } from '../../api/projects/projects.js';

Meteor.startup(() => {
	if (Projects.find().count() === 0) {
		const projects = [{
			name: 'MercedesBR156',
		}, {
			name: 'NissanIJ411',
		}, {
			name: 'AudiAK21',
		}];

		projects.forEach((project) => {
			Projects.insert({
				name: project.name,
			});
		});
	}
});
