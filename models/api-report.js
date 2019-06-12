const APIReport = require('../schema/api-report');

const createReport = (data) => {
	return  APIReport.create(data);
};

const reportList = () => {
	// 最新日期排序（降序）
	return APIReport.find().sort({ createAt: -1 }).exec();
};

const reportDetail = (id) => {
	return APIReport.findById(id).exec();
};

module.exports = {
	createReport,
	reportList,
	reportDetail,
};
