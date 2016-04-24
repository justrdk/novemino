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

		ProcessMaterials.insert(processMaterial);
	},
});
