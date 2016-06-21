import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Processes } from './processes.js';
import { ProcessMaterials } from '../processMaterials/processMaterials.js';

export const insert = new ValidatedMethod({
	name: 'processes.insert',
	validate: new SimpleSchema({
		platingId: { type: String },
		name: { type: String },
	}).validator(),
	run({ platingId, name }) {
		const process = {
			platingId,
			name,
		};

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}
		Processes.insert(process);
	},
});

export const updateName = new ValidatedMethod({
	name: 'processes.updateName',
	validate: new SimpleSchema({
		processId: { type: String },
		newName: { type: String },
	}).validator(),
	run({ processId, newName }) {
		const process = Processes.findOne({
			_id: processId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!process) {
			throw new Meteor.Error('Proceso a actualizar no existe en base de datos');
		}

		Processes.update(processId, {
			$set: {
				name: newName,
			},
		});
	},
});

export const remove = new ValidatedMethod({
	name: 'processes.remove',
	validate: new SimpleSchema({
		processId: { type: String },
	}).validator(),
	run({ processId }) {
		const process = Processes.findOne({
			_id: processId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!process) {
			throw new Meteor.Error('Proceso ya ha sido borrado anteriormente');
		}

		Processes.update(processId, {
			$set: {
				isActive: false,
			},
		});

		const processMaterialsToDelete = ProcessMaterials.find({
			processId,
			isActive: true,
		}).fetch();

		processMaterialsToDelete.forEach((processMaterial) => {
			ProcessMaterials.update(processMaterial._id, {
				$set: {
					isActive: false,
				},
			});
		});
	},
});
