import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

import './editDeletePlating.html';
import { Platings } from '../../api/platings/platings.js';
import { updateName, remove } from '../../api/platings/methods.js';

Template.editDeletePlating.onCreated(function editDeletePlatingOnCreated() {
	this.selectedPlating = new ReactiveVar('');
});

Template.editDeletePlating.onRendered(function editDeletePlatingOnRendered() {
	$('select').material_select();
});

Template.editDeletePlating.helpers({
	platings() {
		return Platings.find();
	},
});

Template.editDeletePlating.events({
	'change #platings'(event, instance) {
		const target = event.target;
		const selectedPlating = $(target).val();

		if (selectedPlating) {
			instance.selectedPlating.set(selectedPlating);
		}
	},
	'click #update-plating'(event, instance) {
		const selectedPlatingId = instance.selectedPlating.get();
		const newPlatingName = $('#plating').val();

		if (selectedPlatingId) {
			updateName.call({
				platingId: selectedPlatingId,
				newName: newPlatingName,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				$('#platings').val('');
				$('#plating').val('');
				Materialize.toast('Datos de enchape actualizados exitosamente', 4000);
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar enchape que desea actualizar', 4000);
		}
	},
	'click #delete-plating'(event, instance) {
		const selectedPlatingId = instance.selectedPlating.get();

		if (selectedPlatingId) {
			remove.call({
				platingId: selectedPlatingId,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Enchape borrado exitosamente', 4000);
				instance.selectedPlating.set('');
				$('#platings').val('');
				$('#plating').val('');
				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar enchape que desea borrar', 4000);
		}
	},
});
