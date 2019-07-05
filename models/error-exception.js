const model = require('../schema/error-exception');

function create(data) {
	return model.create(data);
}

function findAll() {
	return model.find();
}

function findOne(id) {
	return model.findById(id).exec();
}

const errorException = {
	create,
	findAll,
	findOne,
};

module.exports = errorException;
