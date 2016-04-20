import { Meteor } from 'meteor/meteor';

import { Projects } from '../../api/projects/projects.js';
import { Platings } from '../../api/platings/platings.js';
import { Materials } from '../../api/materials/materials.js';
import { Processes } from '../../api/processes/processes.js';
import { Pieces } from '../../api/pieces/pieces.js';

const initProjects = () => {
	const projects = [{
		name: 'BR166',
	}];
	if (Projects.find().count() === 0) {
		console.log('inserting projects');
		projects.forEach((project) => {
			Projects.insert({
				name: project.name,
			});
		});
	}
	return Projects.find();
};

const initPlatings = () => {
	const platings = [{
		name: 'Ash',
	}, {
		name: 'Chopo',
	}, {
		name: 'Eucalipto',
	}, {
		name: 'Nogal',
	}, {
		name: 'Piano Black',
	}];

	if (Platings.find().count() === 0) {
		platings.forEach((plating) => {
			Platings.insert({
				name: plating.name,
			});
		});
	}

	return Platings.find();
};

Meteor.startup(() => {
	const projects = initProjects();
	const platings = initPlatings();
});

