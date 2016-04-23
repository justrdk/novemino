import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './createPlating.html';
import { insert } from '../../api/platings/methods.js';

Template.createPlating.events({
	'click #create-plating'(event, instance) {
		const name = $('#plating').val();
		insert.call({
			name,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			toastr.success('Enchape creado exitosamente');
			$('#plating').val('');
		});
	},
});
