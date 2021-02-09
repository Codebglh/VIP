$(document).ready(function() {
	const api_file_url = "https://raw.githubusercontent.com/Codebglh/img/master/img/imggenxin.json";
	const default_player_list = {
		"list": [{
				"name": "618G解析",
				"url": "https://jx.618g.com/?url="
			},
			{
				"name": "mimijiexi",
				"url": "http://mimijiexi.top/?url="
			},
			{
				"name": "55jx",
				"url": "http://55jx.top/?url="
			},
			{
				"name": "playx",
				"url": "http://playx.top/?url=",
			},
			{
				"name": "nitian9",
				"url": "http://nitian9.com/?url="
			},
			{
				"name": "19g",
				"url": "http://19g.top/?url="
			},
			{
				"name": "无名小站",
				"url": "http://www.82190555.com/index.php?url="
			},
			{
				"name": "无名小站1",
				"url": "http://www.85105052.com/admin.php?url="
			},
			{
				"name": "17kyun",
				"url": "http://17kyun.com/api.php?url="
			},
			{
				"name": "花园影视",
				"url": "http://j.zz22x.com/jx/?url="
			},
			{
				"name": "vip.jlsprh",
				"url": "http://vip.jlsprh.com/index.php?url="
			},
			{
				"name": "tv.x-99",
				"url": "http://tv.x-99.cn/api/wnapi.php?id="
			},
			{
				"name": "金桥解析",
				"url": "http://jqaaa.com/jx.php?url="
			}
		]
	};

	filterApis(default_player_list["list"]).then(createApiElements);
	// fetchFromUrl(api_file_url).then(filterApis).then(createApiElements);

	$("#use_default").click(function() {
		filterApis(default_player_list["list"]).then(createApiElements);
		$('#update').text("网页数据源");
	});
	$("#update").click(function() {
		chrome.storage.sync.set({
			"vip-player-list": "undefined"
		}, function() {
			fetchFromUrl(api_file_url).then(filterApis).then(createApiElements);
		});
	});



});

const fetchFromUrl = url => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get({
			"vip-player-list": "undefined"
		}, function(ch_storage) {
			apis = ch_storage["vip-player-list"]
			if (apis !== "undefined") {
				console.log('fetch from local db');
				resolve(apis);
			} else {
				console.log('fetch from remote site');
				fetch(url).then((response) => {
					$('#update').text("更新成功");
					return response.json();
				}).catch((response) => $('#update').text("更新失败")).then(listjson => resolve(listjson['list']));
			}
		});
	});
};

const save = apis => {
	return new Promise((resolve) => {
		chrome.storage.sync.set({
			"vip-player-list": apis
		}, function() {
			resolve(apis);
		})
	})
};

const createApiElements = apis => {
	return new Promise(resolve => {
		let ul = document.getElementsByTagName("ul")[0];
		while (ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}
		for (let i in apis) {
			let li = document.createElement("li");
			ul.appendChild(li);
			li.innerHTML = apis[i].name;
			li.setAttribute("data-url", apis[i].url);

			li.onclick = function() {
				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, (tabs) => {
					window.open(this.dataset.url + tabs[0].url);
				});
			};
		}
		save(apis).then(apis => resolve(apis));
	});
};


const filterApis = out => {
	return new Promise(resolve => {
		let apis = out.filter(e => (typeof e['url'] === 'string') && !!e['url']);
		apis = apis.slice(0, 100);
		resolve(apis);
	});
};
