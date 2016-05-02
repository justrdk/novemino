import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Materialize } from 'meteor/materialize:materialize';
import { Tracker } from 'meteor/tracker';

import './editDeleteProcess.html';
import { Platings } from '../../api/platings/platings.js';
import { Processes } from '../../api/processes/processes.js';
import { updateName, remove } from '../../api/processes/methods.js';

Template.editDeleteProcess.onCreated(function editDeleteProcessOnCreated() {
	this.processes = new ReactiveVar([]);
	this.selectedProcess = new ReactiveVar('');
});

Template.editDeleteProcess.onRendered(function editDeleteProcessOnRendered() {
	$('select').material_select();
});

Template.editDeleteProcess.helpers({
	platings() {
		return Platings.find();
	},
	processes() {
		return Template.instance().processes.get();
	},
});

Template.editDeleteProcess.events({
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
	'change #processes'(event, instance) {
		const target = event.target;
		const selectedProcess = $(target).val();

		if (selectedProcess) {
			instance.selectedProcess.set(selectedProcess);
		}
	},
	'click #update-process'(event, instance) {
		const selectedProcessId = instance.selectedProcess.get();
		const newProcessName = $('#process').val();

		if (selectedProcessId) {
			updateName.call({
				processId: selectedProcessId,
				newName: newProcessName,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				$('#process').val('');
				$('#processes').val('');
				instance.selectedProcess.set('');
				Materialize.toast('Datos de proceso actualizados exitosamente', 4000);

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar proceso que desea actualizar', 4000);
		}
	},
	'click #delete-process'(event, instance) {
		const selectedProcessId = instance.selectedProcess.get();

		if (selectedProcessId) {
			remove.call({
				processId: selectedProcessId,
			}, (err) => {
				if (err && err.error) {
					return Materialize.toast(err.error, 4000);
				}

				Materialize.toast('Proceso borrado exitosamente', 4000);
				instance.selectedProcess.set('');

				Tracker.afterFlush(() => {
					$('select').material_select();
				});
			});
		} else {
			Materialize.toast('Debe seleccionar proceso que desea borrar', 4000);
		}
	},
});
