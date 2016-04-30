import { Meteor } from 'meteor/meteor';
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

export const remove = new ValidatedMethod({
	name: 'pieces.remove',
	validate: new SimpleSchema({
		pieceId: { type: String },
	}).validator(),
	run({ pieceId }) {
		const piece = Pieces.findOne({
			_id: pieceId,
			isActive: true,
		});

		if (!piece) {
			throw new Meteor.Error('Pieza ya ha sido borrado anteriormente.');
		}

		Pieces.remove(pieceId);
	},
});

