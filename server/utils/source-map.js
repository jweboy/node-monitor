const path = require('path');
const fs = require('fs');
const sourceMap = require('source-map');

const fsPromises = fs.promises;

// https://blog.fundebug.com/2019/06/01/use-sourcemap-to-debug-online-error/


async function lookup(lineNo, columnNo) {
	// console.log(lineNo, columnNo);
	const mapDir = path.join(process.cwd(), 'source-map');
	const mapFiles = await fs.readdirSync(mapDir);

	// TODO: 先测试一个文件
	const mapFile = mapFiles[0];
	const filePath = path.resolve(mapDir, mapFile);
	const bufferData = await fsPromises.readFile(filePath);

	const content = bufferData.toString();
	const fileObj = JSON.parse(content);
	const sources = fileObj.sources.map((item) => item.replace(/\.[./]+/g, ''));

	const consumer = await new sourceMap.SourceMapConsumer(content);
	const filters = { line: lineNo, column: columnNo };
	const result = consumer.originalPositionFor(filters);
	consumer.destroy();

	const currentIndex = sources.indexOf(result.source);

	result.sourceContent = fileObj.sourcesContent[currentIndex];

	return result;
}

module.exports = lookup;
