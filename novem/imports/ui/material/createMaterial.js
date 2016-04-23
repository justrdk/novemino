import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

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
				return toastr.error(err.error);
			}
			$('#sapNumber').val('');
			$('#description').val('');
			$('#measurement-unit').val('');

			toastr.success('Material creado exitosamente');
		});
	},
});
