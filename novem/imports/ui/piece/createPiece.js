import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';

import './createPiece.html';
import { Projects } from '../../api/projects/projects.js';
import { insert } from '../../api/pieces/methods.js';

Template.createPiece.onCreated(function createPieceOnCreated() {
	this.selectedProject = new ReactiveVar('');
});

Template.createPiece.onRendered(function createPieceOnRendered() {
	$('select').material_select();
});

Template.createPiece.helpers({
	projects() {
		return Projects.find();
	},
});

Template.createPiece.events({
	'change #projects'(event, instance) {
		const target = event.target;
		const selectedProject = $(target).val();
		instance.selectedProject.set(selectedProject);
	},
	'click #create-piece'(event, instance) {
		const projectId = instance.selectedProject.get();
		const name = $('#piece').val();
		insert.call({
			projectId,
			name,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			toastr.success('Pieza creada exitosamente');
			$('#piece').val('');
		});
	},
});
