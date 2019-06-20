const interfaceModel = require('../schema/interface');

const createReport = (data) => {
	return  interfaceModel.create(data);
};

const reportList = () => {
	// 最新日期排序（降序）
	return interfaceModel.find().sort({ createAt: -1 }).exec();
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
