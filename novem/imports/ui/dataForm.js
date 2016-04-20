import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Projects } from '../api/projects/projects.js';

import './dataForm.html';

Template.dataForm.onCreated(function dataFormOnCreated() {
	const handle = this.subscribe('projects');
	this.autorun(() => {
		if (handle.ready()) {
			$('select').material_select();
		}
	});
});

Template.dataForm.onRendered(function dataFormOnRendered() {
	$('select').material_select();
});

Template.dataForm.helpers({
	projects() {
		return Projects.find();
	},
});
