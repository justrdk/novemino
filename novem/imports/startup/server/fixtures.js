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
		projects.forEach((project) => {
			Projects.insert({
				name: project.name,
			});
		});
	}

	return Projects.find().map((project) => {
		return {
			name: project.name,
			id: project._id,
		};
	});
};

const bindPiecesToProject = (projectId, pieces) => {
	pieces.forEach((piece) => {
		Pieces.insert({
			projectId,
			name: piece,
		});
	});
};

const initPieces = (projects) => {
	const br166Pieces = ['Puerta Delantera', 'Puerta Trasera', 'TPS', 'TBC', 'TCN', 'Rollo'];

	if (Pieces.find().count() === 0) {
		projects.forEach((project) => {
			switch (project.name.toLowerCase()) {
			case 'br166':
				bindPiecesToProject(project.id, br166Pieces);
				break;
			default:
				break;
			}
		});
	}
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

	return Platings.find().map((plating) => {
		const formatPlate = {
			name: plating.name,
			id: plating._id,
		};
		return formatPlate;
	});
};


const bindPlatingToProcess = (platingId, processes) => {
	processes.forEach((process) => {
		Processes.insert({
			platingId,
			name: process,
		});
	});
};

const initProcesses = (platings) => {
	const ashProcesses = ['Color Agua', 'Retoque', 'Color Patina', 'Sellador', 'Laca Mate'];
	const otherProcesses = ['Color Sealer', 'Retoque', 'Poliester'];

	if (Processes.find().count() === 0) {
		platings.forEach((plating) => {
			switch (plating.name.toLowerCase()) {
			case 'ash':
				bindPlatingToProcess(plating.id, ashProcesses);
				break;
			case 'nogal':
			case 'eucalipto':
			case 'chopo':
			case 'piano black':
				bindPlatingToProcess(plating.id, otherProcesses);
				break;
			default:
				break;
			}
		});
	}
};

Meteor.startup(() => {
	const projects = initProjects();
	const pieces = initPieces(projects);
	const platings = initPlatings();
	const processes = initProcesses(platings);
});

