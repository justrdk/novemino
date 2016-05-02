import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Materialize } from 'meteor/materialize:materialize';
import { Tracker } from 'meteor/tracker';

import './createProcess.html';
import { Platings } from '../../api/platings/platings.js';
import { insert } from '../../api/processes/methods.js';

Template.createProcess.onCreated(function createProcessOnCreated() {
	this.selectedPlating = new ReactiveVar('');
});

Template.createProcess.onRendered(function createProcessOnRendered() {
	$('select').material_select();
});

Template.createProcess.helpers({
	platings() {
		return Platings.find();
	},
});

Template.createProcess.events({
	'change #platings'(event, instance) {
		const target = event.target;
		const selectedPlating = $(target).val();
		instance.selectedPlating.set(selectedPlating);
	},
	'click #create-process'(event, instance) {
		const platingId = instance.selectedPlating.get();
		const name = $('#process').val();
		insert.call({
			platingId,
			name,
		}, (err) => {
			if (err && err.error) {
				return Materialize.toast(err.error, 4000);
			}
			Materialize.toast('Proceso creado exitosamente', 4000);
			instance.selectedPlating.set('');
			$('#process').val('');
			$('#platings').val('');

			Tracker.afterFlush(() => {
				$('select').material_select();
			});
		});
	},
});
