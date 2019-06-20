const APIModel = require('../schema/api-report');

const createReport = (data) => {
	return  APIModel.create(data);
};

const reportList = () => {
	// 最新日期排序（降序）
	return APIModel.find().sort({ createAt: -1 }).exec();
};

const reportDetail = (id) => {
	return APIModel.findById(id).exec();
};

module.exports = {
	createReport,
	reportList,
	reportDetail,
};
