import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from './projects.js';
import { Pieces } from '../pieces/pieces.js';
import { ProcessMaterials } from '../processMaterials/processMaterials.js';

const deleteProyectPieces = (piecesToDelete) => {
	piecesToDelete.forEach((piece) => {
		const pieceId = piece._id;
		Pieces.update(pieceId, {
			$set: {
				isActive: false,
			},
		});
	});
};

const deletePiecesProjectMaterials = (piecesDeleted) => {
	piecesDeleted.forEach((piece) => {
		const pieceId = piece._id;
		const processMaterialsToDelete = ProcessMaterials.find({
			isActive: true,
			pieceId,
		}).fetch();

		processMaterialsToDelete.forEach((processMaterial) => {
			ProcessMaterials.update(processMaterial._id, {
				$set: {
					isActive: false,
				},
			});
		});
	});
};

export const insert = new ValidatedMethod({
	name: 'projects.insert',
	validate: new SimpleSchema({
		name: { type: String },
	}).validator(),
	run({ name }) {
		const project = {
			name,
		};
		Projects.insert(project);
	},
});

export const updateName = new ValidatedMethod({
	name: 'projects.updateName',
	validate: new SimpleSchema({
		projectId: { type: String },
		newName: { type: String },
	}).validator(),
	run({ projectId, newName }) {
		const project = Projects.findOne({
			_id: projectId,
			isActive: true,
		});

		if (!project) {
			throw new Meteor.Error('Proyecto a actualizar no existe en base de datos');
		}

		Projects.update(projectId, {
			$set: {
				name: newName,
			},
		});
	},
});

export const remove = new ValidatedMethod({
	name: 'projects.remove',
	validate: new SimpleSchema({
		projectId: { type: String },
	}).validator(),
	run({ projectId }) {
		const project = Projects.findOne({
			_id: projectId,
			isActive: true,
		});

		if (!project) {
			throw new Meteor.Error('Proyecto ya ha sido borrado anteriormente.');
		}

		Projects.update(projectId, {
			$set: {
				isActive: false,
			},
		});

		// remove documents from other collections that contain these pieces
		const piecesToDelete = Pieces.find({
			isActive: true,
			projectId,
		}).fetch();

		deleteProyectPieces(piecesToDelete);
		deletePiecesProjectMaterials(piecesToDelete);
	},
});
