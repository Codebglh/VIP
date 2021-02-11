$(document).ready(function() {
	const api_file_url = "https://raw.githubusercontent.com/Codebglh/img/master/img/imggenxin.json";
	const default_player_list = {
		"list": [{"name":"纯净1","url":"https://z1.m1907.cn/?jx="},
		{"name":"纯净2","url":"https://jx.618g.com/?url="},
		{"name":"B站1","url":"https://vip.parwix.com:4433/player/?url="},
		{"name":"B站2","url":"https://www.cuan.la/m3u8.php?url="},
		{"name":"BJT","url":"https://ckmov.bjtjr.net/ckmov/?url="},
		{"name":"BL","url":"https://vip.bljiex.com/?v="},
		{"name":"ELW","url":"https://jx.elwtc.com/vip/?url="},
		{"name":"爱跟","url":"https://vip.2ktvb.com/player/?url="},
		{"name":"冰豆","url":"https://api.bingdou.net/?url="},
		{"name":"八八","url":"https://jiexi.q-q.wang/?url="},
		{"name":"百域","url":"https://jx.618g.com/?url="},
		{"name":"ckmov","url":"https://www.ckmov.vip/api.php?url="},
		{"name":"大幕","url":"https://jx.52damu.com/dmjx/jiexi.php?url="},
		{"name":"迪奥","url":"https://123.1dior.cn/?url="},
		{"name":"福星","url":"https://jx.popo520.cn/jiexi/?url="},
		{"name":"跟剧","url":"https://www.5igen.com/dmplayer/player/?url="},
		{"name":"RDHK","url":"https://jx.rdhk.net/?v="},
		{"name":"H8","url":"https://www.h8jx.com/jiexi.php?url="},
		{"name":"豪华","url":"https://api.lhh.la/vip/?url="},
		{"name":"黑云","url":"https://jiexi.380k.com/?url="},
		{"name":"蝴蝶","url":"https://api.hdworking.top/?url="},
		{"name":"IK","url":"https://vip.ikjiexi.top/?url="},
		{"name":"解析la","url":"https://api.jiexi.la/?url="},
		{"name":"久播","url":"https://jx.jiubojx.com/vip.php?url="},
		{"name":"九八","url":"https://jx.youyitv.com/?url="},
		{"name":"老板","url":"https://vip.laobandq.com/jiexi.php?url="},
		{"name":"乐喵","url":"https://jx.hao-zsj.cn/vip/?url="},
		{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url="},
		{"name":"MUTV","url":"https://jiexi.janan.net/jiexi/?url="},
		{"name":"Mao","url":"https://titan.mgtv.com.kunlanys.com/m3u8.php?url="},
		{"name":"明日","url":"https://jx.yingxiangbao.cn/vip.php?url="},
		{"name":"磨菇","url":"https://jx.wzslw.cn/?url="},
		{"name":"诺诺","url":"https://www.ckmov.com/?url="},
		{"name":"诺讯","url":"https://www.nxflv.com/?url="},
		{"name":"OK","url":"https://okjx.cc/?url="},
		{"name":"思云","url":"https://jx.ap2p.cn/?url="},
		{"name":"思古","url":"https://api.sigujx.com/?url="},
		{"name":"思古2","url":"https://api.bbbbbb.me/jx/?url="},
		{"name":"思古3","url":"https://jsap.attakids.com/?url="},
		{"name":"tv920","url":"https://api.tv920.com/vip/?url="},
		{"name":"维多","url":"https://jx.ivito.cn/?url="},
		{"name":"我爱","url":"https://vip.52jiexi.top/?url="},
		{"name":"无名","url":"https://www.administratorw.com/video.php?url="},
		{"name":"小蒋","url":"https://www.kpezp.cn/jlexi.php?url="},
		{"name":"小狼","url":"https://jx.yaohuaxuan.com/?url="},
		{"name":"智能","url":"https://vip.kurumit3.top/?v="},
		{"name":"星驰","url":"https://vip.cjys.top/?url="},
		{"name":"星空","url":"http://60jx.com/?url="},
		{"name":"月亮","url":"https://api.yueliangjx.com/?url="},
		{"name":"云端","url":"https://jx.ergan.top/?url="},
		{"name":"云析","url":"https://jx.yparse.com/index.php?url="},
		{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url="},
		{"name":"33t","url":"https://www.33tn.cn/?url="},
		{"name":"41","url":"https://jx.f41.cc/?url="},
		{"name":"66","url":"https://api.3jx.top/vip/?url="},
		{"name":"116","url":"https://jx.116kan.com/?url="},
		{"name":"200","url":"https://vip.66parse.club/?url="},
		{"name":"973","url":"https://jx.973973.xyz/?url="},
		{"name":"8090","url":"https://www.8090g.cn/?url="}
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
					window.open(this.dataset.url );
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
