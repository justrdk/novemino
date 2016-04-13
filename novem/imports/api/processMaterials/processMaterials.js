import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ProcessMaterials = new Mongo.Collection('ProcessMaterials');

ProcessMaterials.deny({
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
	isActive: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
});

ProcessMaterials.attachSchema(schema);

