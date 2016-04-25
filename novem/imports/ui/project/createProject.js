import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './createProject.html';
import { insert } from '../../api/projects/methods.js';

Template.createProject.events({
	'click #create-project'(event, instance) {
		const name = $('#project').val();
		insert.call({
			name,
		}, (err) => {
			if (err && err.error) {
				return Materialize.toast(err.error, 4000);
			}

			Materialize.toast('Proyecto creado exitosamente', 4000);
			$('#project').val('');
		});
	},
});
