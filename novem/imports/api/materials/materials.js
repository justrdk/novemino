import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Materials = new Mongo.Collection('Materials');

Materials.deny({
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
	isActive: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
});

Materials.attachSchema(schema);
