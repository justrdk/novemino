import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Pieces = new Mongo.Collection('Pieces');

Pieces.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

const schema = new SimpleSchema({
	name: {
		type: String,
	},
	isActive: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
	projectId: {
		type: String,
	},
});

Pieces.attachSchema(schema);
