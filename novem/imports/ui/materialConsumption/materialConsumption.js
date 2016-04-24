import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { Tracker } from 'meteor/tracker';

import './materialConsumption.html';
import { Projects } from '../../api/projects/projects.js';
import { Pieces } from '../../api/pieces/pieces.js';
import { Platings } from '../../api/platings/platings.js';
import { Processes } from '../../api/processes/processes.js';
import { Materials } from '../../api/materials/materials.js';
import { insert } from '../../api/processMaterials/methods.js';

Template.materialConsumption.onCreated(function materialConsumptionOnCreated() {
	this.pieces = new ReactiveVar([]);
	this.processes = new ReactiveVar([]);
	this.selectedProject = new ReactiveVar('');
	this.selectedPiece = new ReactiveVar('');
	this.selectedProcess = new ReactiveVar('');
	this.selectedPlating = new ReactiveVar('');
	this.selectedMaterial = new ReactiveVar('');
	this.quantity = new ReactiveVar(0);
});

Template.materialConsumption.onRendered(function dataFormOnRendered() {
	$('select').material_select();
});

Template.materialConsumption.helpers({
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

Template.materialConsumption.events({
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
	'click #create-data'(event, instance) {
		const processId = instance.selectedProcess.get();
		const materialId = instance.selectedMaterial.get();
		const pieceId = instance.selectedPiece.get();
		const amount = parseFloat(instance.quantity.get(), 10);

		insert.call({
			processId,
			materialId,
			pieceId,
			amount,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			toastr.success('Consumo de material actualizado');
		});
	},
});
