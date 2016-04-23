import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './createProject.html';
import { insert } from '../../api/projects/methods.js';

Template.createProject.events({
	'click #create-project'(event, instance) {
		const name = $('#project').val();
		insert.call({
			name,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			toastr.success('Proyecto creado exitosamente');
			$('#project').val('');
		});
	},
});
