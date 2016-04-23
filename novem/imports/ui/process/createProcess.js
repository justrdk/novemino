import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';

import './createProcess.html';
import { Platings } from '../../api/platings/platings.js';
import { insert } from '../../api/processes/methods.js';

Template.createProcess.onCreated(function createProcessOnCreated() {
	const platingsSub = this.subscribe('allPlatings');
	this.selectedPlating = new ReactiveVar('');

	this.autorun(() => {
		if (platingsSub.ready()) {
			$('select').material_select();
		}
	});
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
				return toastr.error(err.error);
			}
			toastr.success('Proceso creado exitosamente');
			$('#process').val('');
		});
	},
});
