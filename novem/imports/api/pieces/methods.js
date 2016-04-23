import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Pieces } from './pieces.js';

export const insert = new ValidatedMethod({
	name: 'pieces.insert',
	validate: new SimpleSchema({
		projectId: { type: String },
		name: { type: String },
	}).validator(),
	run({ projectId, name }) {
		const piece = {
			projectId,
			name,
		};

		Pieces.insert(piece);
	},
});
