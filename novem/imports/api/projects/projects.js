import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Projects = new Mongo.Collection('Projects');

Projects.deny({
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

const projectSchema = new SimpleSchema({
	name: {
		type: String,
	},
	isActive: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
});

Projects.attachSchema(projectSchema);

