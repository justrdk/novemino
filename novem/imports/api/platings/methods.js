import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Platings } from './platings.js';

export const insert = new ValidatedMethod({
	name: 'platings.insert',
	validate: new SimpleSchema({
		name: { type: String },
	}).validator(),
	run({ name }) {
		const plating = {
			name,
		};

		Platings.insert(plating);
	},
});
