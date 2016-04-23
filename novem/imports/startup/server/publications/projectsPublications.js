import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../api/projects/projects.js';

Meteor.publish('allProjects', function allProjects() {
	return Projects.find({
		isActive: true,
	});
});
