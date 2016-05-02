import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Materialize } from 'meteor/materialize:materialize';

import './editDeleteMaterialConsumption.html';
import { Projects } from '../../api/projects/projects.js';
import { Pieces } from '../../api/pieces/pieces.js';
import { Platings } from '../../api/platings/platings.js';
import { Processes } from '../../api/processes/processes.js';
import { Materials } from '../../api/materials/materials.js';
import { updateProcessMaterial, remove } from '../../api/processMaterials/methods.js';

Template.editDeleteMaterialConsumption.onCreated(function editDeleteMaterialConsumptionOnCreated() {
	this.pieces = new ReactiveVar([]);
	this.processes = new ReactiveVar([]);
	this.selectedProject = new ReactiveVar('');
	this.selectedPiece = new ReactiveVar('');
	this.selectedProcess = new ReactiveVar('');
	this.selectedPlating = new ReactiveVar('');
	this.selectedMaterial = new ReactiveVar('');
	this.quantity = new ReactiveVar(0);
});

Template.editDeleteMaterialConsumption.onRendered(
	function editDeleteMaterialConsumptionOnRendered() {
		$('select').material_select();
	});

Template.editDeleteMaterialConsumption.helpers({
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
	materials() {
		return Materials.find();
	},
});

Template.editDeleteMaterialConsumption.events({
	'change #projects'(event, instance) {
		const target = event.target;
		const selectedProject = $(target).val();

		if (selectedProject) {
			const pieces = Pieces.find({
				isActive: true,
				projectId: selectedProject,
			});
			instance.selectedProject.set(selectedProject);
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

			instance.selectedPlating.set(selectedPlating);
			instance.processes.set(processes);
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
	'change #processes'(event, instance) {
		const target = event.target;
		const selectedProcess = $(target).val();

		if (selectedProcess) {
			instance.selectedProcess.set(selectedProcess);
		}
	},
	'change #materials'(event, instance) {
		const target = event.target;
		const selectedMaterial = $(target).val();

		if (selectedMaterial) {
			instance.selectedMaterial.set(selectedMaterial);
		}
	},
	'input #quantity'(event, instance) {
		const target = event.target;
		const quantity = $(target).val();
		instance.quantity.set(quantity);
	},
	'click #update-material-consumption'(event, instance) {
		const selectedMaterial = instance.selectedMaterial.get();
		const selectedProcess = instance.selectedProcess.get();
		const selectedPiece = instance.selectedPiece.get();
		const newAmount = parseInt(instance.quantity.get(), 10);

		if (selectedMaterial && selectedProcess && selectedPiece) {
			updateProcessMaterial.call({
				processId: selectedProcess,
				materialId: selectedMaterial,
				pieceId: selectedPiece,
				newAmount,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Consumo de material actualizado exitosamente', 4000);
				$('#materials').val('');
				$('#processes').val('');
				$('#pieces').val('');
				$('#platings').val('');
				$('#projects').val('');
				$('#quantity').val('');

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar material, proceso y pieza antes de actualizar consumo');
		}
	},
	'click #delete-material-consumption'(event, instance) {
		const selectedMaterial = instance.selectedMaterial.get();
		const selectedProcess = instance.selectedProcess.get();
		const selectedPiece = instance.selectedPiece.get();

		if (selectedMaterial && selectedProcess && selectedPiece) {
			remove.call({
				materialId: selectedMaterial,
				processId: selectedProcess,
				pieceId: selectedPiece,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Consumo de material borrado exitosamente', 4000);
				$('#materials').val('');
				$('#processes').val('');
				$('#pieces').val('');
				$('#platings').val('');
				$('#projects').val('');

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar un material, proceso y pieza antes de borrar datos');
		}
	},
});
