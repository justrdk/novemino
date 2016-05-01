import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

import './editDeleteProject.html';
import { Projects } from '../../api/projects/projects.js';
import { updateName, remove } from '../../api/projects/methods.js';

Template.editDeleteProject.onCreated(function editDeleteProjectOnCreated() {
	this.selectedProject = new ReactiveVar('');
});

Template.editDeleteProject.onRendered(function editDeleteProjectOnRendered() {
	$('select').material_select();
});

Template.editDeleteProject.helpers({
	projects() {
		return Projects.find();
	},
});

Template.editDeleteProject.events({
	'change #projects'(event, instance) {
		const target = event.target;
		const selectedProject = $(target).val();

		if (selectedProject) {
			instance.selectedProject.set(selectedProject);
		}
	},
	'click #update-project'(event, instance) {
		const selectedProjectId = instance.selectedProject.get();
		const newProjectName = $('#project').val();

		if (selectedProjectId) {
			updateName.call({
				projectId: selectedProjectId,
				newName: newProjectName,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				$('#project').val('');
				$('#projects').val('');
				Materialize.toast('Datos de proyecto actualizados exitosamente', 4000);
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar proyecto que desea actualizar', 4000);
		}
	},
	'click #delete-project'(event, instance) {
		const selectedProjectId = instance.selectedProject.get();

		if (selectedProjectId) {
			remove.call({
				projectId: selectedProjectId,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Proyecto borrado exitosamente', 4000);
				instance.selectedProject.set('');
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar proyecto que desea borrar', 4000);
		}
	},
});
