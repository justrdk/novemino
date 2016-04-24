import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

import '../../ui/layout.js';
import '../../ui/appLoading.js';
import '../../ui/dataForm/dataForm.js';
import '../../ui/project/createProject.js';
import '../../ui/piece/createPiece.js';
import '../../ui/plating/createPlating.js';
import '../../ui/process/createProcess.js';
import '../../ui/material/createMaterial.js';
import '../../ui/materialConsumption/materialConsumption.js';

Router.configure({
	layoutTemplate: 'appLayout',
	loadingTemplate: 'appLoading',
});

Router.route('/', {
	action: function action() {
		this.redirect('home');
	},
});

Router.route('/home', {
	action: function action() {
		this.render('dataForm');
	},
	waitOn: function waitOn() {
		return [
			Meteor.subscribe('projectsWithPieces'),
			Meteor.subscribe('platingsProcesses'),
			Meteor.subscribe('materialsConsumption'),
			Meteor.subscribe('allMaterials'),
		];
	},
});

Router.route('/crearProyecto', {
	action: function action() {
		this.render('createProject');
	},
});

Router.route('/crearPieza', {
	action: function action() {
		this.render('createPiece');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('allProjects');
	},
});

Router.route('/crearEnchape', {
	action: function action() {
		this.render('createPlating');
	},
});

Router.route('/crearProceso', {
	action: function action() {
		this.render('createProcess');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('allPlatings');
	},
});

Router.route('/crearMaterial', {
	action: function action() {
		this.render('createMaterial');
	},
});

Router.route('/consumoMaterial', {
	action: function action() {
		this.render('materialConsumption');
	},
	waitOn: function waitOn() {
		return [
			Meteor.subscribe('projectsWithPieces'),
			Meteor.subscribe('platingsProcesses'),
			Meteor.subscribe('allMaterials'),
		];
	},
});
