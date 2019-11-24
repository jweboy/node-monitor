import model from '../schema/code';

function create(data) {
  return model.create(data);
}

function findAll() {
  return model.find();
}

function findOne(id) {
  return model.findById(id).exec();
}

function removeAll() {
  return model.remove();
}

export {
  create,
  findAll,
  findOne,
  removeAll,
};
