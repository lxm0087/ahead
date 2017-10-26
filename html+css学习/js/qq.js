document.write("<div id=QQFloat style=Z-INDEX:20;LEFT:auto;VISIBILITY:visible;WIDTH:2.26rem;RIGHT:.2rem;POSITION:absolute;TOP:8rem;HEIGHT:6rem;>")
document.write("<div class=qq><div class=qq_t><img src=http://www.djjwz.com/images/qq01.png /></div><div class=qq_bg><ul>")
document.write("<li><img SRC=http://www.djjwz.com/images/qq.gif  border=0 align=absmiddle /><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=1282761534&site=qq&menu=yes'><font color='#000000'>客服1</font></a></li>")
document.write("<li><img SRC=http://www.djjwz.com/images/qq.gif  border=0 align=absmiddle /><a target=_blank href='http://wpa.qq.com/msgrd?v=3&uin=2416527323&site=qq&menu=yes'><font color='#000000'>客服2</font></a>")
document.write("</ul></div><div class=qq_d><img src=http://www.djjwz.com/images/qq02.png /></div></div>")
document.write("<script src='js/qqneed.js'></script></div>")
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
