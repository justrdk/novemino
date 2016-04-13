import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Platings = new Mongo.Collection('Platings');

Platings.deny({
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
});

Platings.attachSchema(schema);
