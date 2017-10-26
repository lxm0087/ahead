// JavaScript Document

function heartBeat(){
 diffY=GetScrollTop();
 mymovey += Math.floor((diffY-document.getElementById('backi').style.top.replace("px","")+50)*0.1);
 document.getElementById('backi').style.top = mymovey+"px";
}
window.setInterval("heartBeat()",1);


var w3c = (document.getElementById) ? true : false;
var agt = navigator.userAgent.toLowerCase();
var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("omniweb") == -1));
var mymovey = new Number();
function IeTrueBody(){
 return (document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;
}
function GetScrollTop(){
 return ie ? IeTrueBody().scrollTop : window.pageYOffset;
}
function picsize(obj,MaxWidth){
  img=new Image();
  img.src=obj.src;
  if (img.width>MaxWidth)
  {
    return MaxWidth;
  }
  else
  {
    return img.width;
  }
}
function CloseQQ()
{
backi.style.display="none";
return true;
}
var online=new Array();
