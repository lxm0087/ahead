(function() {
	function gan_rem() {
		var gan_body = document.getElementById("gan_body");
		if(window.innerWidth < 1025) {
			var html = document.documentElement;
			var hWidth = html.getBoundingClientRect().width;
			html.style.fontSize = hWidth / 15 + "px"
		} else {
			var html = document.documentElement;
			var hWidth = html.getBoundingClientRect().width;
			html.style.fontSize = 768 / 15 + "px"
		}
	}
	gan_rem();
	window.onresize = function() {
		gan_rem()
	}
})();
document.writeln('<link href="gan_css/gan_header.min.css" type="text/css" rel="stylesheet"/>');
document.writeln('<header><span><p>韩美整形</p><img src="gan_images/gan_header.png"><p>我来自韩国</p></span></header><nav><div class="gan_nav_content fod"><i class="gan_nav_left iconfont icon-tab"></i><a href="tel:4000791066" class="gan_nav_right iconfont icon-dianhua"></a><form class="gan_nav_so fod" action="/plus/search.php" method="get" name="search"><input type="text" name="keyword" class="xsearch_box" size="20"><button class="iconfont icon-sousuo2" type="submit" name="sub"></button></form></div></nav><div class="gan_window"><div class="gan_window_content"><div class="gan_nav_box"><h3>眼部整形</h3><ul><li><a href="/syanpi/">精雕双眼皮</a><a href="/zt/xqyd/">祛眼袋</a><a href="/zt/kyj/">开眼角</a><a href="/zt/wocan">卧蚕</a></li><li><a href="/slxt/">上睑下垂</a><a href="/zt/ybxf/">眼部修复</a><a href="/zt/xquzhou/">鱼尾纹</a><a href="/zt/lgtc/">泪沟填充</a></li><li><a href="/zt/ybsz/">眼皮松弛</a><a href="/zt/qhyq/">黑眼圈</a></li></ul><span>展示更多</span></div><div class="gan_nav_box"><h3>鼻部整形</h3><ul><li><a href="/zt/sjgbi/">宫廷生态隆鼻</a><a href="/zhdalongbi/">达拉斯隆鼻</a><a href="/boniaolongbi/">玻尿酸隆鼻</a><a href="/dalalongbi/">鼻翼整形</a></li><li><a href="/dalalongbi/">鼻尖整形</a><a href="/zt/bibuxf/">隆鼻修复</a><a href="/dalalongbi/">鼻头缩小</a><a href="/dalalongbi/">鼻假体取出</a></li><li><a href="/zt/qixingbi/">畸形鼻矫正</a></li></ul><span>展示更多</span></div><div class="gan_nav_box"><h3>丰胸塑形</h3><ul><li><a href="/xlongx/">深V韩韵沟丰胸</a><a href="/zt/hygfx/">假体隆胸</a><a href="/zt/xztzf/">自体脂肪隆胸</a><a href="/rufang/">乳房下垂矫正</a></li><li><a href="/zt/lxxf/">隆胸修复</a><a href="/zt/ltxx/">乳头内陷</a><a href="/sjxiz/">吸脂减肥</a><a href="/slian/">光纤溶脂</a></li><li><a href="/zt/ltsx/">乳头缩小</a><a href="/zt/lfph/">乳晕漂红</a></li></ul><span>展示更多</span></div><div><h3>面部整形</h3><ul><li><a href="/shoulianzhen/">瘦脸针</a><a href="/fengxiaba/">垫下巴</a><a href="/zt/ftyx/">丰太阳穴</a><a href="/fengpingji/">丰苹果肌</a></li><li><a href="/zt/fengmj/">丰脸颊</a><a href="/zt/lgtc/">泪沟填充</a></li></ul><span></span></div><div><h3>抗衰除皱</h3><ul><li><a href="/xboniaosuan/">玻尿酸除皱</a><a href="/zt/xquzhou/">BOTOX除皱</a><a href="/sumeiji/">塑美极第3代</a><a href="/chaosd/">音波拉皮</a></li><li><a href="/zt/xquzhou/">鱼尾纹</a><a href="/zt/xquzhou/">抬头纹</a><a href="/zt/xquzhou/">眉间纹</a><a href="/zt/xquzhou/">嘴角纹</a></li></ul><span></span></div><div class="gan_nav_box"><h3>皮肤美容</h3><ul><li><a href="/sjquban/">祛斑美容</a><a href="/xxqudou/">祛痘去痘印</a><a href="/zt/xtuomao/">冰点脱毛</a><a href="/nenfu/">美白嫩肤</a></li><li><a href="/sjgxlm/">毛孔粗大</a><a href="/jxxpy/">激素性皮炎</a><a href="/sjgxlm/">水光注射</a><a href="/weizhenmeisu/">微针美塑</a></li><li><a href="/xquba/">疤痕修复</a><a href="/sjqutaiji/">祛胎记</a><a href="/news/27.html">祛红血丝</a><a href="/zt/qhyq/">去黑眼圈</a></li><li><a href="/sjgxlm/">去黑头</a><a href="/quyexiu/">祛腋臭</a><a href="/zt/wenxiu/">纹绣</a></li></ul><span>展示更多</span></div><div class="gan_nav_box"><h3>注射美容</h3><ul><li><a href="/xboniaosuan/">玻尿酸</a><a href="/quzhou/">BOTOX</a><a href="/shoulianzhen/">瘦脸针</a><a href="/boniaolongbi/">注射隆鼻</a></li><li><a href="/quzhou/">瘦腿针</a><a href="/fengxiaba/">垫下巴</a><a href="/fengtaiyangxue/">丰太阳穴</a><a href="/fengpingji/">丰苹果肌</a></li><li><a href="/sjgxlm/">水光注射</a><a href="/zt/sjbns/">宝尼达</a></li></ul><span>展示更多</span></div><div class="gan_nav_box"><h3>口腔美容</h3><ul><li><a href="/meilg/">美容冠</a><a href="/zt/xjiaoz/">隐形矫正</a><a href="/zt/bouya/">龅牙矫正</a><a href="/zt/qcy/">全瓷牙</a></li><li><a href="/zt/kouzy/">烤瓷牙</a><a href="/zt/yatm/">牙贴面</a><a href="/zt/shsy/">四环素牙</a><a href="/zt/ycmb/">牙齿美白</a></li><li><a href="/zt/ycmb/">皓齿美白</a><a href="/zt/csjy/">超声波洁牙</a><a href="/zt/zyby/">补牙</a></li></ul><span>展示更多</span></div><div><h3>私密整形</h3><ul><li><a href="/zt/simi/">阴道紧缩</a><a href="/sjchunu/">处女膜修复</a><a href="/sjsichu/">阴唇缩小</a></li></ul><span></span></div></div></div>');
var gan_window_content = document.getElementsByClassName("gan_window")[0];
var gan_nav_left = document.getElementsByClassName("gan_nav_left")[0];
gan_nav_left.onclick = function() {
	if(gan_window_content.style.display == "block") {
		gan_window_content.style.display = "none"
	} else {
		gan_window_content.style.display = "block"
	}
};
var gan_nav_div = document.getElementsByClassName("gan_nav_box");
for(var i = 0; i < gan_nav_div.length; i++) {
	(function(c) {
		gan_nav_div[c].getElementsByTagName("span")[0].onclick = function() {
			if(this.previousElementSibling.style.height != "auto") {
				this.previousElementSibling.style.height = "auto";
				this.innerHTML = "收起"
			} else {
				this.previousElementSibling.style.height = 2.8 + "rem";
				this.innerHTML = "展示更多"
			}
		}
	})(i)
};