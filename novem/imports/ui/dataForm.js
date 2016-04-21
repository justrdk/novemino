import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Projects } from '../api/projects/projects.js';
import { Pieces } from '../api/pieces/pieces.js';
import { Platings } from '../api/platings/platings.js';
import { Processes } from '../api/processes/processes.js';

import './dataForm.html';

Template.dataForm.onCreated(function dataFormOnCreated() {
	const projectsSub = this.subscribe('projects');
	const platingsSub = this.subscribe('platingsProcessesMaterials');
	this.pieces = new ReactiveVar([]);
	this.processes = new ReactiveVar([]);
	this.materials = new ReactiveVar([]);

	this.autorun(() => {
		if (projectsSub.ready() && platingsSub.ready()) {
			$('select').material_select();
		}
	});
});

Template.dataForm.onRendered(function dataFormOnRendered() {
	$('select').material_select();
});

Template.dataForm.helpers({
	projects() {
		return Projects.find();
	},
	pieces() {
		return Template.instance().pieces.get();
	},
	platings() {
		return Platings.find();
	},
	processes() {
		return Template.instance().processes.get();
	},
});

Template.dataForm.events({
	'change #projects'(event, instance) {
		const target = event.target;
		const selectedProject = $(target).val();

		if (selectedProject) {
			const pieces = Pieces.find({
				isActive: true,
				projectId: selectedProject,
			});
			instance.pieces.set(pieces);
			Tracker.afterFlush(() => {
				$('select').material_select();
			});
		}
	},
	'change #platings'(event, instance) {
		const target = event.target;
		const selectedPlating = $(target).val();

		if (selectedPlating) {
			const processes = Processes.find({
				isActive: true,
				platingId: selectedPlating,
			});

			instance.processes.set(processes);
			Tracker.afterFlush(() => {
				$('select').material_select();
			});
		}
	},
});
