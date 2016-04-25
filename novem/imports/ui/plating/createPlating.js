import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './createPlating.html';
import { insert } from '../../api/platings/methods.js';

Template.createPlating.events({
	'click #create-plating'(event, instance) {
		const name = $('#plating').val();
		insert.call({
			name,
		}, (err) => {
			if (err && err.error) {
				return Materialize.toast(err.error, 4000);
			}

			Materialize.toast('Enchape creado exitosamente', 4000);
			$('#plating').val('');
		});
	},
});
