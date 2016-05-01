import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

import './editDeletePiece.html';
import { Projects } from '../../api/projects/projects.js';
import { Pieces } from '../../api/pieces/pieces.js';
import { updateName, remove } from '../../api/pieces/methods.js';

Template.editDeletePiece.onCreated(function editDeletePieceOnCreated() {
	this.selectedPiece = new ReactiveVar('');
	this.pieces = new ReactiveVar([]);
});

Template.editDeletePiece.onRendered(function editDeletePieceOnRendered() {
	$('select').material_select();
});

Template.editDeletePiece.helpers({
	projects() {
		return Projects.find();
	},
	pieces() {
		return Template.instance().pieces.get();
	},
});

Template.editDeletePiece.events({
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
	'change #pieces'(event, instance) {
		const target = event.target;
		const selectedPiece = $(target).val();

		if (selectedPiece) {
			instance.selectedPiece.set(selectedPiece);
		}
	},
	'click #update-piece'(event, instance) {
		const selectedPieceId = instance.selectedPiece.get();
		const newPieceName = $('#piece').val();

		if (selectedPieceId) {
			updateName.call({
				pieceId: selectedPieceId,
				newName: newPieceName,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Datos de pieza actualizados exitosamente', 4000);
				instance.selectedPiece.set('');
				$('#piece').val('');
				$('#pieces').val('');
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar pieza que desea actualizar', 4000);
		}
	},
	'click #delete-piece'(event, instance) {
		const selectedPieceId = instance.selectedPiece.get();

		if (selectedPieceId) {
			remove.call({
				pieceId: selectedPieceId,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Pieza borrada exitosamente', 4000);
				instance.selectedPiece.set('');
				$('#piece').val('');
				$('#pieces').val('');
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar pieza que desea borrar', 4000);
		}
	},
});
