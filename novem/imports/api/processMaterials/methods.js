import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { ProcessMaterials } from './processMaterials.js';

export const insert = new ValidatedMethod({
	name: 'processMaterials.insert',
	validate: new SimpleSchema({
		processId: {
			type: String,
		},
		materialId: {
			type: String,
		},
		pieceId: {
			type: String,
		},
		amount: {
			type: Number,
			decimal: true,
		},
	}).validator(),
	run({ processId, materialId, pieceId, amount }) {
		const processMaterial = {
			processId,
			materialId,
			pieceId,
			amount,
		};

		const exist = ProcessMaterials.findOne({
			processId,
			materialId,
			pieceId,
			isActive: true,
		}) !== undefined;

		if (exist) {
			throw new Meteor.Error('Datos ya existenes en base de datos, no se aceptan duplicados');
		} else {
			ProcessMaterials.insert(processMaterial);
		}
	},
});

export const updateProcessMaterial = new ValidatedMethod({
	name: 'processMaterial.update',
	validate: new SimpleSchema({
		processId: { type: String },
		materialId: { type: String },
		pieceId: { type: String },
		newAmount: { type: Number, decimal: true },
	}).validator(),
	run({ processId, materialId, pieceId, newAmount }) {
		const processMaterial = ProcessMaterials.findOne({
			processId,
			materialId,
			pieceId,
			isActive: true,
		});

		if (!processMaterial) {
			throw new Meteor.Error('Material a actualizar no existe en base de datos');
		}

		ProcessMaterials.update(processMaterial._id, {
			$set: {
				amount: newAmount,
			},
		});
	},
});

export const remove = new ValidatedMethod({
	name: 'processMaterial.remove',
	validate: new SimpleSchema({
		processId: { type: String },
		materialId: { type: String },
		pieceId: { type: String },
	}).validator(),
	run({ processId, materialId, pieceId }) {
		const processMaterial = ProcessMaterials.findOne({
			processId,
			materialId,
			pieceId,
			isActive: true,
		});

		if (!processMaterial) {
			throw new Meteor.Error('Material ha borrar no se encuentra en base de datos');
		}

		ProcessMaterials.update(processMaterial._id, {
			$set: {
				isActive: false,
			},
		});
	},
});
