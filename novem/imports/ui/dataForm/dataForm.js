import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Projects } from '../../api/projects/projects.js';
import { Pieces } from '../../api/pieces/pieces.js';
import { Platings } from '../../api/platings/platings.js';
import { Processes } from '../../api/processes/processes.js';
import { Materials } from '../../api/materials/materials.js';
import { ProcessMaterials } from '../../api/processMaterials/processMaterials.js';

import './dataForm.html';

Template.dataForm.onCreated(function dataFormOnCreated() {
	this.pieces = new ReactiveVar([]);
	this.processes = new ReactiveVar([]);
	this.materials = new ReactiveVar([]);
	this.selectedProject = new ReactiveVar('');
	this.selectedPiece = new ReactiveVar('');
	this.selectedPlating = new ReactiveVar('');
	this.materialsDetails = new ReactiveVar([]);
	this.quantity = new ReactiveVar(0);
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
	materialsDetails() {
		return Template.instance().materialsDetails.get();
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
	'input #quantity'(event, instance) {
		const target = event.target;
		const quantity = parseInt($(target).val(), 10);
		instance.quantity.set(quantity);
	},
	'click #calculate'(event, instance) {
		const materials = [];
		const dupMaterials = [];
		const selectedPlating = instance.selectedPlating.get();
		let materialsWithoutDuplicates = [];

		const processes = Processes.find({
			platingId: selectedPlating,
			isActive: true,
		}).fetch();

		processes.forEach((process) => {
			const processMaterials = ProcessMaterials.find({
				isActive: true,
				processId: process._id,
				pieceId: instance.selectedPiece.get(),
			}).fetch();

			processMaterials.forEach((processMaterial) => {
				const materialFound = Materials.findOne({
					isActive: true,
					_id: processMaterial.materialId,
				});

				materialFound.totalAmount = processMaterial.amount * instance.quantity.get();
				materialFound.process = process.name;
				materials.push(materialFound);
			});
		});

		const materialDetails = instance.materialsDetails.get();

		materialDetails.forEach((material) => {
			materials.forEach((mat) => {
				if (material._id === mat._id) {
					material.totalAmount = material.totalAmount + mat.totalAmount;
					dupMaterials.push(mat);
				}
			});
		});

		if (dupMaterials.length > 0) {
			materials.forEach((material) => {
				const isDuplicate = dupMaterials.some((dupMaterial) => {
					return dupMaterial._id === material._id;
				});

				if (!isDuplicate) {
					materialsWithoutDuplicates.push(material);
				}
			});
		} else {
			materialsWithoutDuplicates = materials;
		}

		const concatMaterialDetails = materialDetails.concat(materialsWithoutDuplicates);
		instance.materialsDetails.set(concatMaterialDetails);

		$('#projects').val('');
		$('#pieces').val('');
		$('#platings').val('');
		$('#quantity').val('');

		Tracker.afterFlush(() => {
			$('select').material_select();
		});
	},
	'click #clean-calculations'(event, instance) {
		instance.materialsDetails.set([]);
	},
});
