import { findAllCode, findOneCode } from '../models/code';
import response from '../utils/response';

async function getCodeList(ctx) {
  // const { page, size } = ctx.query;
  const data = await findAllCode();

  ctx.body = { ...response, data };
}

async function getCodeDetail(ctx) {
  const { id } = ctx.params;
  const data = await findOneCode(id);

  ctx.body = { ...response, data };
}

export {
  getCodeList,
  getCodeDetail,
};
