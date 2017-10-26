document.write("<div id=QQFloat style=Z-INDEX:20;LEFT:auto;VISIBILITY:visible;WIDTH:114px;RIGHT:10px;POSITION:absolute;TOP:40px;HEIGHT:30px;>")
document.write("<div class=qq><div class=qq_t><img src=qq01.png /></div><div class=qq_bg><ul>")
document.write("<li><p class='hotline'>24小时客服电话<br>400-800-1925</p></li>")
document.write("<li><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=1413647009&site=qq&menu=yes'><p color='#000000'>舞蹈瑜伽课程咨询</p><img class='ni' SRC=qq.gif  border=0 align=absmiddle /></a></li>")
document.write("<li><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=188227209&site=qq&menu=yes'><p color='#000000'>高级教师周老师</p><img class='ni' SRC=qq.gif  border=0 align=absmiddle /></a>")
document.write("<li><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=891856857&site=qq&menu=yes'><p color='#000000'>华翎店长何老师</p><img class='ni' SRC=qq.gif  border=0 align=absmiddle /></a>")
document.write("<li><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=386467275&site=qq&menu=yes'><p color='#000000'>免费试学威廉老师</p><img class='ni' SRC=qq.gif  border=0 align=absmiddle /></a>")
document.write("</ul></div><div class=qq_d><img src=db.png /></div></div>")
// document.write("<script src='//tj.uzhan.org/script/uzhan.js?uin=10300'></script></div>")
var tips; var theTop = 200
var old = theTop;
function initFloatTips() {
  tips = document.getElementById('QQFloat');
  moveTips();
};
function moveTips() {
  var tt=50;
  if (window.innerHeight) {
    pos = window.pageYOffset
  }
  else if (document.documentElement && document.documentElement.scrollTop) {
    pos = document.documentElement.scrollTop
  }
  else if (document.body) {
    pos = document.body.scrollTop;
  }

  pos=pos-tips.offsetTop+theTop;
  pos=tips.offsetTop+pos/10;

  if (pos < theTop) pos = theTop;
  if (pos != old) {
    tips.style.top = pos+"px";
    tt=10;
  }
  old = pos;
  setTimeout(moveTips,tt);
}
initFloatTips();
