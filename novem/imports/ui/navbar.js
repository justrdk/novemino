import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';
import './navbar.html';

Template.navbar.onRendered(function navbarOnRendered() {
	$('.dropdown-button').dropdown();
	$('.button-collapse').sideNav();
});

Template.navbar.events({
	'click .user-logout'(event, instance) {
		Meteor.logout();
		Router.go('/home');
	},
});
