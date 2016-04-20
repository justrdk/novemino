import { Meteor } from 'meteor/meteor';
import { ProcessMaterials } from '../../../api/processMaterials/processMaterials.js';

Meteor.publish('materialsConsumption', function materialsConsumption() {
	return ProcessMaterials.find({
		isActive: true,
	});
});
