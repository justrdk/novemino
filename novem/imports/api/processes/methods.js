import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Processes } from './processes.js';

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

		Processes.insert(process);
	},
});
