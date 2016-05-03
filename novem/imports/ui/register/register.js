import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './register.html';

Template.register.events({
	'click #register'(event, instance) {
		const name = $('#name').val().trim();
		const password = $('#password').val().trim();
		const email = $('#email').val().trim();
		const confirmationPassword = $('#confirm-password').val().trim();

		if (password !== confirmationPassword) {
			return Materialize.toast('Contraseña y contraseña de confirmacion no son iguales.', 4000);
		}

		Accounts.createUser({
			email,
			password,
			profile: {
				name,
			},
		}, (error) => {
			if (error) {
				return Materialize.toast('Error al crear usuario, favor intentar de nuevo', 4000);
			}
			Router.go('/home');
		});
	},
});
