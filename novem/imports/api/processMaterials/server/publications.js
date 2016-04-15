import { Meteor } from 'meteor/meteor';
import { ProcessMaterials } from '../processMaterials.js';

Meteor.publish('materialsConsumption', function materialsConsumption() {
	return ProcessMaterials.find({
		isActive: true,
	});
});
