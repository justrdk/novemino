import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './createMaterial.html';
import { insert } from '../../api/materials/methods.js';

Template.createMaterial.events({
	'click #create-material'(event, instance) {
		const sapNumber = $('#sapNumber').val();
		const description = $('#description').val();
		const measurementUnit = $('#measurement-unit').val();

		insert.call({
			sapNumber,
			description,
			measurementUnit,
		}, (err) => {
			if (err && err.error) {
				return Materialize.toast(err.error, 4000);
			}
			$('#sapNumber').val('');
			$('#description').val('');
			$('#measurement-unit').val('');

			Materialize.toast('Material creado exitosamente', 4000);
		});
	},
});
