/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:31:15
 */
import model from '../schema/interface';

const createInterface = (data) => {
  return  model.create(data);
};

// https://www.jianshu.com/p/dbf965f8d314

const findAllInterface = async ({ status = ['failed'], keyword, methods = [], page = 1, size = 10 }) => {
  const filters = {
    // 请求方法搜索（多选）
    ...(methods.length > 0 && {
      method: { $in: methods },
    }),
    // 具体状态搜索
    ...(status.length > 0 && {
      status: { $in: status },
    }),
    // 关键词模糊查询
    ...(keyword && { url: new RegExp(keyword) }),
  };
  // 最新日期排序（降序）
  const sorter = { createAt: -1 };
  const list  = await model
    .find(filters)
    .skip(+size * (+page - 1)) //* skip在数据量大的时候会有性能问题
    .limit(+size)
    .sort(sorter)
    .exec();

  const total = await model.find(filters).countDocuments().exec();

  return { list, total };
};

const findOneInterface = (id) => {
  return model.findById(id).exec();
};

// const performanceList = () => interfaceModel
// 	.find({ type: 'performance'})
// 	.sort({ createAt: -1 })
// 	.exec();

export {
  createInterface,
  findAllInterface,
  findOneInterface,
  // performanceList,
};
