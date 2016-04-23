import { Router } from 'meteor/iron:router';

import '../../ui/layout.js';
import '../../ui/dataForm/dataForm.js';
import '../../ui/project/createProject.js';
import '../../ui/piece/createPiece.js';
import '../../ui/plating/createPlating.js';
import '../../ui/process/createProcess.js';
import '../../ui/material/createMaterial.js';

Router.configure({
	layoutTemplate: 'appLayout',
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
});

Router.route('/crearMaterial', {
	action: function action() {
		this.render('createMaterial');
	},
});
