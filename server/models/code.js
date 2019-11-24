import model from '../schema/code';

function createCode(data) {
  return model.create(data);
}

async function findAllCode() {
  const list = await model.find()
    .sort({ createAt: -1 })
    .exec();
  const total = await model.find()
    .countDocuments()
    .exec();

  return { list, total };
}

function findOneCode(id) {
  return model.findById(id).exec();
}

function removeAllCode() {
  return model.remove();
}

export {
  createCode,
  findAllCode,
  findOneCode,
  removeAllCode,
};
