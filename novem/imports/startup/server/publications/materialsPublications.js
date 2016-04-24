import { Meteor } from 'meteor/meteor';
import { Materials } from '../../../api/materials/materials.js';

Meteor.publish('allMaterials', function allMaterials() {
	return Materials.find({
		isActive: true,
	});
});
