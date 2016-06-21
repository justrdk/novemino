import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Materials } from './materials.js';
import { ProcessMaterials } from '../processMaterials/processMaterials.js';

export const insert = new ValidatedMethod({
	name: 'materials.insert',
	validate: new SimpleSchema({
		sapNumber: {
			type: String,
		},
		description: {
			type: String,
			max: 2000,
		},
		measurementUnit: {
			type: String,
		},
	}).validator(),
	run({ sapNumber, description, measurementUnit }) {
		const material = {
			sapNumber,
			description,
			measurementUnit,
		};

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		Materials.insert(material);
	},
});

export const updateMaterial = new ValidatedMethod({
	name: 'materials.update',
	validate: new SimpleSchema({
		materialId: {
			type: String,
		},
		sapNumber: {
			type: String,
			optional: true,
		},
		description: {
			type: String,
			max: 2000,
			optional: true,
		},
		measurementUnit: {
			type: String,
			optional: true,
		},
	}).validator(),
	run({ materialId, sapNumber, description, measurementUnit }) {
		const material = Materials.findOne({
			_id: materialId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!material) {
			throw new Meteor.Error('Material a actualizar no encontrado en base de datos');
		}

		if (sapNumber && sapNumber.length > 0) {
			Materials.update(materialId, {
				$set: {
					sapNumber,
				},
			});
		}

		if (description && description.length > 0) {
			Materials.update(materialId, {
				$set: {
					description,
				},
			});
		}

		if (measurementUnit && measurementUnit.length > 0) {
			Materials.update(materialId, {
				$set: {
					measurementUnit,
				},
			});
		}
	},
});

export const remove = new ValidatedMethod({
	name: 'materials.remove',
	validate: new SimpleSchema({
		materialId: { type: String },
	}).validator(),
	run({ materialId }) {
		const material = Materials.findOne({
			_id: materialId,
			isActive: true,
		});

		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
		}

		if (!material) {
			throw new Meteor.Error('Material a borrar no encontrado');
		}

		Materials.update(materialId, {
			$set: {
				isActive: false,
			},
		});

		const processMaterialsToDelete = ProcessMaterials.find({
			materialId,
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
