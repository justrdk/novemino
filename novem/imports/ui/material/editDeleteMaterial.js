import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Tracker } from 'meteor/tracker';

import './editDeleteMaterial.html';
import { Materials } from '../../api/materials/materials.js';
import { updateMaterial, remove } from '../../api/materials/methods.js';

Template.editDeleteMaterial.onCreated(function editDeleteMaterialOnCreated() {
	this.selectedMaterial = new ReactiveVar('');
});

Template.editDeleteMaterial.onRendered(function editDeleteMaterialOnRendered() {
	$('select').material_select();
});

Template.editDeleteMaterial.helpers({
	materials() {
		return Materials.find();
	},
});

Template.editDeleteMaterial.events({
	'change #materials'(event, instance) {
		const target = event.target;
		const selectedMaterial = $(target).val();

		if (selectedMaterial) {
			instance.selectedMaterial.set(selectedMaterial);
		}
	},
	'click #update-material'(event, instance) {
		const selectedMaterialId = instance.selectedMaterial.get();
		const sapNumber = $('#sap-number').val();
		const description = $('#description').val();
		const measurementUnit = $('#measurement-unit').val();

		if (selectedMaterialId) {
			updateMaterial.call({
				materialId: selectedMaterialId,
				sapNumber,
				description,
				measurementUnit,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Datos de material actualizados exitosamente', 4000);
				$('#sap-number').val('');
				$('#description').val('');
				$('#measurement-unit').val('');
				$('#materials').val('');
				instance.selectedMaterial.set('');

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar material a actualizar', 4000);
		}
	},
	'click #delete-material'(event, instance) {
		const selectedMaterialId = instance.selectedMaterial.get();

		if (selectedMaterialId) {
			remove.call({
				materialId: selectedMaterialId,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Material borrado exitosamente', 4000);
				instance.selectedMaterial.set('');
				$('#materials').val('');

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar material que desea eliminar', 4000);
		}
	},
});
