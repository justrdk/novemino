import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './login.html';

Template.login.events({
	'click #login'(event, instance) {
		const email = $('#email').val();
		const password = $('#password').val();

		Meteor.loginWithPassword({
			email,
		}, password, (error) => {
			if (error) {
				return Materialize.toast('Error al iniciar sesion', 4000);
			}
			Router.go('/home');
		});
	},
});
