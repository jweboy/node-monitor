const interfaceModel = require('../schema/interface');

const createReport = (data) => {
	return  interfaceModel.create(data);
};

// https://www.jianshu.com/p/dbf965f8d314

const reportList = ({ status = ['failed'], keyword, methods = [] }) => {
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
		...(keyword && { url: new RegExp(keyword) })
	};
	console.log('filters => ', filters);
	// 最新日期排序（降序）
	const sorter = { createAt: -1 };
	return interfaceModel
		.find(filters)
		.sort(sorter)
		.exec();
};

const reportDetail = (id) => {
	return interfaceModel.findById(id).exec();
};

const performanceList = () => interfaceModel
	.find({ type: 'performance'})
	.sort({ createAt: -1 })
	.exec();

module.exports = {
	createReport,
	reportList,
	reportDetail,
	performanceList,
};
