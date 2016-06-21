import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Platings } from './platings.js';
import { Processes } from '../processes/processes.js';
import { ProcessMaterials } from '../processMaterials/processMaterials.js';

export const insert = new ValidatedMethod({
	name: 'platings.insert',
	validate: new SimpleSchema({
		name: { type: String },
	}).validator(),
	run({ name }) {
		const plating = {
			name,
		};

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		Platings.insert(plating);
	},
});

export const updateName = new ValidatedMethod({
	name: 'platings.updateName',
	validate: new SimpleSchema({
		platingId: { type: String },
		newName: { type: String },
	}).validator(),
	run({ platingId, newName }) {
		const plating = Platings.findOne({
			_id: platingId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!plating) {
			throw new Meteor.Error('Enchape a actualizar no existe en base de datos');
		}

		Platings.update(platingId, {
			$set: {
				name: newName,
			},
		});
	},
});

export const remove = new ValidatedMethod({
	name: 'platings.remove',
	validate: new SimpleSchema({
		platingId: { type: String },
	}).validator(),
	run({ platingId }) {
		const plating = Platings.findOne({
			_id: platingId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!plating) {
			throw new Meteor.Error('Enchape ya ha sido borrado anteriormente');
		}

		Platings.update(platingId, {
			$set: {
				isActive: false,
			},
		});

		const processesToDelete = Processes.find({
			isActive: true,
			platingId,
		}).fetch();

		processesToDelete.forEach((process) => {
			Processes.update(process._id, {
				$set: {
					isActive: false,
				},
			});
		});

		processesToDelete.forEach((process) => {
			const processMaterialsToDelete = ProcessMaterials.find({
				isActive: true,
				processId: process._id,
			}).fetch();

			processMaterialsToDelete.forEach((processMaterial) => {
				ProcessMaterials.update(processMaterial._id, {
					$set: {
						isActive: false,
					},
				});
			});
		});
	},
});
