import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

import '../../ui/layout.js';
import '../../ui/appLoading.js';
import '../../ui/accessDenied.js';
import '../../ui/login/login.js';
import '../../ui/register/register.js';
import '../../ui/dataForm/dataForm.js';
import '../../ui/project/createProject.js';
import '../../ui/piece/createPiece.js';
import '../../ui/plating/createPlating.js';
import '../../ui/process/createProcess.js';
import '../../ui/material/createMaterial.js';
import '../../ui/materialConsumption/materialConsumption.js';
import '../../ui/project/editDeleteProject.js';
import '../../ui/piece/editDeletePiece.js';
import '../../ui/plating/editDeletePlating.js';
import '../../ui/process/editDeleteProcess.js';
import '../../ui/material/editDeleteMaterial.js';
import '../../ui/materialConsumption/editDeleteMaterialConsumption.js';

Router.configure({
	layoutTemplate: 'appLayout',
	loadingTemplate: 'appLoading',
	waitOn: function waitOn() {
		return Meteor.subscribe('userData');
	},
});

Router.onBeforeAction(function onBeforeAction() {
	if (!Meteor.userId()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
}, {
	only: ['crearUsuario', 'crearProyecto', 'crearPieza', 'crearEnchape',
		'crearProceso', 'crearMaterial', 'consumoMaterial', 'editarProyecto',
		'editarPieza', 'editarEnchape', 'editarProceso', 'editarMaterial',
		'editarConsumoMaterial', 'editarUsuario',
	],
});

Router.route('/', {
	action: function action() {
		this.redirect('home');
	},
});

Router.route('/crearUsuario', {
	action: function action() {
		this.render('register');
	},
});

Router.route('/login', {
	action: function action() {
		this.render('login');
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

// editdelete object routes

Router.route('/editarProyecto', {
	action: function action() {
		this.render('editDeleteProject');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('allProjects');
	},
});

Router.route('/editarPieza', {
	action: function action() {
		this.render('editDeletePiece');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('projectsWithPieces');
	},
});

Router.route('/editarEnchape', {
	action: function action() {
		this.render('editDeletePlating');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('allPlatings');
	},
});

Router.route('/editarProceso', {
	action: function action() {
		this.render('editDeleteProcess');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('platingsProcesses');
	},
});

Router.route('/editarMaterial', {
	action: function action() {
		this.render('editDeleteMaterial');
	},
	waitOn: function waitOn() {
		return Meteor.subscribe('allMaterials');
	},
});

Router.route('/editarConsumoMaterial', {
	action: function action() {
		this.render('editDeleteMaterialConsumption');
	},
	waitOn: function waitOn() {
		return [
			Meteor.subscribe('projectsWithPieces'),
			Meteor.subscribe('platingsProcesses'),
			Meteor.subscribe('allMaterials'),
			Meteor.subscribe('materialsConsumption'),
		];
	},
});
