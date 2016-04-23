import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './navbar.html';

Template.navbar.onRendered(function navbarOnRendered() {
	$('.dropdown-button').dropdown();
});
