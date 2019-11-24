import { findAll, findOne } from '../models/code';

async function getCodeList(ctx) {
  // const { page, size } = ctx.query;

  ctx.body = await findAll().sort({ createAt: -1 }).exec();
}

async function getCodeDetail(ctx) {
  const { id } = ctx.params;

  ctx.body = await findOne(id);
}

export {
  getCodeList,
  getCodeDetail,
};
