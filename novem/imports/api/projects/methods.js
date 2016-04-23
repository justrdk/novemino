import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from './projects.js';

export const insert = new ValidatedMethod({
	name: 'projects.insert',
	validate: new SimpleSchema({
		name: { type: String },
	}).validator(),
	run({ name }) {
		const project = {
			name,
		};
		Projects.insert(project);
	},
});
