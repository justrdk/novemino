import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Materials } from './materials.js';

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

		Materials.insert(material);
	},
});
