/*
@param urls <array> 请求集
@param limit <number> 请求并发数
@param operate <function> 爬取数据的规则，返回目标数据
*/

const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const path = require('path');
const fs = require('fs');

const noop = () => {};

const fetch = (url, operate) => {
	return new Promise((resolve, reject) =>{
		request(url, (error, response, body) => {
			if (error) {
				console.log(error);

				resolve(null);
			} else if(response.statusCode == 200) {
 				$ = cheerio.load(body);

				const res = operate($);

				resolve(res);
			} else {
				resolve(null);
			}
		})
	})
}

module.exports = (options) => {
	const {
		urls = [],
		limit = 1,
		operate = noop,
		fileName = path.join(__dirname, 'data.txt')
	} = options;

	async.mapLimit(urls, limit, async (url) => {
		const result = await fetch(url, operate);

		return result;
	}, (err, result) => {
		if (err) throw err;

		const filterResult = result.filter(Boolean);
		const res = {
				data: [].concat(...filterResult)
			};

		fs.writeFile(fileName, JSON.stringify(res), (err) => {
			if (err) throw err;

			console.log('successfully!!');
		})
	})
}
