var Csn=(function(){var $,csn={};$=function(sel,con){return csn.init(sel,con)};csn.init=function(sel,con){if(!sel){return csn.C()}if(con!==undefined){return $(con).find(sel)}if(csn.isC(sel)){return sel}if(typeof(sel)==="function"){return $(document).ready(sel)}return csn.C(typeof sel==="object"?[sel]:$.dom(sel))};csn.C=function(dom){return new C(dom)};function C(dom){var len=0;for(var i=0,l=dom?dom.length:0;i<l;i++){dom[i]==null||(this[len++]=dom[i])}this.length=len}csn.isC=function(obj){return obj instanceof csn.C};$.fn={constructor:csn.C,dt:[],dtt:[],di:[],size:function(){return this.length},eq:function(i){var obj;$.list(this,function(j){if(i===j){obj=this;return true}});return $(obj)},index:function(o){var i=-1;$.list(this,function(j){if(o===this){i=j;return true}});return i},find:function(sel){var dom=[];$.list(this,function(){$.list($.dom(sel,this),function(){dom.push(this)})});return csn.C(dom)},remove:function(){$.list(this,function(){this.parentNode.removeChild(this)})},hide:function(){$.list(this,function(){this.style.display="none"});return this},show:function(){$.list(this,function(){this.style.display="block"});return this},append:function(str){var isStr=typeof(str)==="string";if(isStr){var _div=document.createElement("div");_div.innerHTML=str;var _str=_div.childNodes[0]}$.list(this,function(){this.appendChild(isStr?_str:str)})},html:function(){return this.make("innerHTML",arguments[0])},val:function(){return this.make("value",arguments[0])},attr:function(){return this.make(arguments[0],arguments[1])},cls:function(){return this.make("className",arguments[0])},inCls:function(c){return(this.cls().indexOf(c)>-1)},rmCls:function(c){$.list(this,function(){var _cls=this.className;if(!_cls){return}this.className=(" "+_cls+" ").replace(" "+c+" "," ").replace(/^ /,"").replace(/ $/,"")})},adCls:function(c){$.list(this,function(){var _cls=this.className;this.className=_cls?($.index(_cls,c)>-1?_cls:(_cls+" "+c)):c})},css:function(){return this.make(arguments[0],arguments[1],"style")},make:function(v1,v2,k){if(v2===undefined&&typeof v1!=="object"){var that=this[0];return(k!==undefined&&k in that)?k==="style"?$.style(that)[$.css3(v1)]:that[k][v1]:that[v1]}else{if(typeof v1==="object"){$.list(this,function(){var that=this;$.each(v1,function(i){(k!==undefined&&k in that)?(that[k][(k==="style")?$.css3(i):i]=this):(that[i]=this)})})}else{$.list(this,function(){(k!==undefined&&k in this)?(this[k][k==="style"?$.css3(v1):v1]=v2):(this[v1]=v2)})}return this}},ready:function(fn){(/complete|loaded|interactive/.test(document.readyState)&&document.body)?fn($):(document.addEventListener&&document.addEventListener("DOMContentLoaded",function(){fn($)},false));return this},on:function(){var e=arguments[0];switch(arguments.length){case 0:return this;break;case 1:$.list(this,function(){this[e+"fn"]()});break;default:var fn=arguments[1];var b=arguments[2]||false;if(typeof e==="object"){var that=this;$.each(e,function(){that.on(this,fn,b)})}else{$.list(this,function(){this.addEventListener?(this.addEventListener(e,fn,b)&&(this[e+"b"]=b)):this.attachEvent("on"+e,fn);this[e+"fn"]=fn})}}return this},off:function(e){if(typeof e==="object"){var that=this;$.each(e,function(){that.off(this)})}else{$.list(this,function(){this.removeEventListener?(this.removeEventListener(e,this[e+"fn"],this[e+"b"])&&(delete this[e+"b"])):this.detachEvent("on"+e,this[e+"fn"]);delete this[e+"fn"]})}return this},animate:function(obj,t){var zs=32;var _t=t%zs;var c=Math.floor(t/zs);var lt=this.dt.length;var _this=this;$.list(this,function(){var that=this;_this.dt[lt]=t;setTimeout(function(){$.each(obj,function(i){$.animateGo(_this,that,c,zs,i,this)})},_t)})},serialize:function(){var arr=[];$.list(this.find("[name]"),function(){if((this.type==="radio"||this.type==="checkbox")&&!this.checked){return}arr.push(this.name+"="+this.value)});return arr.join("&")}};$.html={};$.cssNum=["column-count","columns","font-weight","line-height","opacity","z-index","zoom"];$.bowPre=["webkit","khtml","moz","ms","o"];$.cssArr={};$.cssPre={};$.pxArr={};$.showNum=0;$.ajaxType={script:"text/javascript,application/javascript,application/x-javascript",json:"application/json",xml:"application/xml,text/xml",html:"text/html",text:"text/plain"};$.index=function(obj,v,b){if(!obj){return -1}var k=-1;if(typeof(obj)==="string"){var _l=v.length;for(var i=0,l=obj.length-_l+1;i<l;i++){if((b&&obj.substr(i,_l)===v)||(!b&&obj.substr(i,_l)==v)){k=i;break}}}else{for(var i in obj){if((b&&obj[i]===v)||(!b&&obj[i]==v)){k=i;break}}}return k};$.uCase=function(s){return s[0].toUpperCase()+s.slice(1)};$.hump=function(v,p,arr){return((p=p||"-")&&($.index(v,p)>-1)&&(arr=v.split(p)))?(arr[0]+$.uCase(arr[1])):v};$.bowCore=function(name){name=name||"transition";if($.cssPre[name]===undefined){$.cssPre[name]="";var css=$.domStyle();var _name=$.uCase(name);$.each($.bowPre,function(i,v){if(typeof(css[v+_name])==="string"){$.cssPre[name]=v}return true})}return $.cssPre[name]};$.css3=function(name){name=$.hump(name||"transition");if($.cssArr[name]===undefined){var css=$.domStyle();if(typeof(css[name])==="string"){$.cssArr[name]=name}else{$.cssArr[name]=$.bowCore(name)+$.uCase(name)}return $.cssArr[name]}return $.cssArr[name]};$.isPx=function(name){return($.pxArr[name]===undefined)?($.pxArr[name]=$.index($.cssNum,name)===-1):$.pxArr[name]};$.animateGo=function(obj,dom,c,t,i,v){var isPx=$.isPx(i)?"px":"";i=$.css3(i);var end=isPx?parseInt(v):v;var di=obj.di;var dc=(end-(isPx?parseInt($.style(dom)[i]):$.style(dom)[i]))/c;var li=di.length;dom.style[i]=(end-(dc*c))+isPx;di[li]=setInterval(function(){if(--c<0){dom.style[i]=end+isPx;clearInterval(di[li]);delete di[li]}else{dom.style[i]=(end-(dc*c))+isPx}},t)};$.each=function(obj,fn){for(var i in obj){if(fn.call(obj[i],i,obj[i])){break}}};$.list=function(obj,fn){for(var i=0,l=obj.length;i<l;i++){if(fn.call(obj[i],i,obj[i])){break}}};$.dom=function(sel,obj){return obj?obj.querySelectorAll(sel):($.html[sel]===undefined?($.html[sel]=document.querySelectorAll(sel)):$.html[sel])};$.rem=function(q,mw){document.documentElement.style.fontSize=Math.min($.w(),mw||768)/(typeof(q)==="number"?q:15)+"px"};$.resize=function(fn){(window.onresize=fn)()};$.style=function(obj){return window.getComputedStyle?window.getComputedStyle(obj):obj.currentStyle};$.domStyle=function(){return($.domCss===undefined)?($.domCss=(document.body||document.documentElement).style):$.domCss};$.box=function(sel){return(sel?$.dom(sel)[0]:document.documentElement).getBoundingClientRect()};$.w=function(b){return(b===undefined||$.width===undefined)?($.width=document.documentElement.clientWidth):$.width};$.h=function(b){return(b===undefined||$.height===undefined)?($.height=document.documentElement.clientHeight):$.height};$.query=function(k,r){return(k===undefined||(r=window.location.search.substr(1).match(new RegExp("(^|&)"+k+"=([^&]*)(&|$)")))===null)?null:unescape(r[2])};$.agent=function(){return($.userAgent===undefined)?($.userAgent=navigator.userAgent.toLowerCase()):$.userAgent};$.os=function(){var _agent=$.agent();if($.index(_agent,"macintosh")>0||$.index(_agent,"window")>0){return"pc"}if($.index(_agent,"micromessenger")>0||$.index(_agent,"mqqbrowser")>0){return"wx"}if($.index(_agent,"iphone")>0||$.index(_agent,"mac os")>0){return"iphone"}if($.index(_agent,"android")>0||$.index(_agent,"linux")>0){return"android"}return"android"};$.browser=function(){var _agent=$.agent();return{version:(_agent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(_agent),opera:/opera/.test(_agent),msie:/msie/.test(_agent)&&!/opera/.test(_agent),mozilla:/mozilla/.test(_agent)&&!/(compatible|webkit)/.test(_agent)}};$.check=function(s,t){var _reg;switch(t){case"usr":_reg=/^[\u4E00-\u9FA5|\w]{5,25}$/i;break;case"pwd":_reg=/^[\w\-]{6,20}$/;break;case"url":_reg=/^https?:\/\/.+/;break;case"email":_reg=/^[a-zA-Z0-9][\w\.-]+@[a-zA-Z0-9]{1,10}\.(com(\.cn)?|net|cn)$/i;break;case"phone":_reg=/^(\d{3,4})?\d{7,8}$/;break;case"tel":_reg=/^1[34578]{1}\d{9}$/;break;case"wx":_reg=/^[-\w]{6,20}$/;break;case"qq":_reg=/^[1-9]\d{4,11}$/;break;case"code":_reg=/^[0-9a-zA-Z]{4,6}$/;break;default:return false}return _reg.test(s)};$.format=function(obj,b){var arr=[];if(typeof(obj)==="object"){if(b){$.each(obj,function(i){arr.push(i+"="+this)})}else{$.each(obj,function(i){arr.push(i+"="+encodeURIComponent(this))})}arr=arr.join("&")}else{arr=obj}return arr};$.getAjaxType=function(type){var t;if(type){type=type.indexOf(";")>-1?type.split(";",2)[0]:type;$.each($.ajaxType,function(i){if(this.indexOf(type)>-1){t=i;return true}})}return(t||"text")};$.xhr=function(){var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");xhr.success=[];xhr.fail=[];xhr.then=function(s,f){xhr.y(s);xhr.n(f);return this};xhr.y=function(s){s&&xhr.success.push(s);return this};xhr.n=function(f){f&&xhr.fail.push(f);return this};xhr.setMimeType=function(t){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");(t in $.ajaxType)&&(t=$.ajaxType[t])&&xhr.overrideMimeType&&(t=t.indexOf(",")>-1?t.split(",",2)[0]:t)&&xhr.overrideMimeType(t)};return xhr};$.ajax=function(obj){obj=obj||{};obj.type=(obj.type||"GET").toUpperCase();if(obj.type!=="GET"&&obj.type!=="POST"){return}var xhr=$.xhr();xhr.onreadystatechange=function(){if(xhr.readyState!==4){return}if(xhr.status===200){var dataType=(obj.dataType in $.ajaxType)?obj.dataType:$.getAjaxType(xhr.getResponseHeader("content-type"));var result=(xhr.responseType==="arraybuffer"||xhr.responseType==="blob")?xhr.response:xhr.responseText;dataType==="script"?(1,eval)(result):(result=dataType==="xml"?xhr.responseXML:dataType==="json"?JSON.parse(result):result);obj.success?obj.success(result):$.each(xhr.success,function(){this(result)})}else{obj.fail?obj.fail(xhr.status):(xhr.fail.length>0?$.each(xhr.fail,function(){this(xhr.status)}):$.info({i:"网络繁忙"}))}};obj.url+=("?_="+Math.random()).replace(".","");if(obj.type==="GET"){xhr.open("GET",obj.url+(obj.data?("&"+$.format(obj.data,true)):""),true);xhr.setMimeType(obj.dataType);xhr.send(null)}else{if(obj.type==="POST"){xhr.open("POST",obj.url,true);xhr.setMimeType(obj.dataType);var sendData;if(obj.data){if(!obj.file){xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");if(obj.data){sendData=$.format(obj.data,false)}}else{sendData=new FormData();for(var i in obj.data){sendData.append(i,obj.data[i])}}}else{sendData=null}xhr.send(sendData||null)}}return xhr};$.request=function(arr,b,file){var obj={url:arr[0]};b&&(obj.type="POST");file&&(obj.file=true);var fs=1;if(typeof arr[fs]!=="function"){obj.data=arr[fs++]}arr[fs]&&(obj.success=arr[fs++])&&arr[fs]&&(obj.fail=arr[fs]);return $.ajax(obj)};$.get=function(){return $.request(arguments)};$.post=function(){return $.request(arguments,true)};$.files=function(){return $.request(arguments,true,true)};$.time=function(){return new Date().getTime()};$.info=function(obj){if(!obj.i){return}$.showNum++;if($("#csn-info").length==0){var styleNode=document.createElement("style");styleNode.type="text/css";styleNode.setAttribute("id","csn-alert");var style_str=".csn-info{opacity:0;position:fixed;z-index:2147483647;top:50%;margin-top:-22px;left:0;right:0;width:100%;text-align:center}.csn-info span{display:inline-block;font-size:14px;background:rgba(0,0,0,.9);border-radius:4px;color:#fff;line-height:50px;padding:0 25px}";if(styleNode.styleSheet){styleNode.styleSheet.cssText=style_str}else{styleNode.innerHTML=style_str}document.getElementsByTagName("head")[0].appendChild(styleNode)}var id="csn-info"+$.showNum;var sel="#"+id;var _str="<span>"+obj.i+"</span>";var _div=document.createElement("div");_div.setAttribute("id",id);_div.setAttribute("class","csn-info");_div.innerHTML="<span>"+obj.i+"</span>";$("body").append(_div);$(sel).animate({opacity:1},300);setTimeout(function(){$(sel).animate({opacity:0},300);setTimeout(function(){if(obj.u){location=obj.u}else{$(sel).remove()}},300)},(obj.t||1500)+300)};$.confirm=function(obj){if(!obj.i){return}var num=++$.showNum;var id="csn-confirm"+num;if($("#csn-confirm").length==0){var styleNode=document.createElement("style");styleNode.type="text/css";styleNode.setAttribute("id","csn-confirm");var style_str=""+".csn-confirm{position:fixed;z-index:2147483647;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3)}"+".csn-confirm>div{width:260px;position:relative;background:#fff;font-size:14px}"+".csn-confirm i{cursor:pointer;position:absolute;font-style:normal;display:block;font-size:25px;color:#555;width:40px;height:40px;line-height:40px;text-align:center;top:0;right:0}"+".csn-confirm-title{cursor:move;color:#333;height:40px;line-height:40px;text-indent:20px;background:#F8F8F8}"+".csn-confirm-text{padding:20px;color:#000}"+".csn-confirm-btn{padding:6px 10px 12px;height:28px;line-height:28px;}"+".csn-confirm a{cursor:pointer;margin:0 6px;padding:0 15px;display:inline-block;border-radius:2px}"+".csn-confirm a:first-child{color:#fff;background:#2e8ded;border:1px solid #4898d5}"+".csn-confirm a:nth-child(2){color:#333;background:#f1f1f1;border:1px solid #dedede}";if(styleNode.styleSheet){styleNode.styleSheet.cssText=style_str}else{styleNode.innerHTML=style_str}document.getElementsByTagName("head")[0].appendChild(styleNode)}var sel="#"+id;var _str='<div id="csn-div'+num+'">'+'<i id="csn-close'+num+'">×</i>'+'<div id="csn-move'+num+'" class="csn-confirm-title">'+(obj.t||"标题")+"</div>"+'<div class="csn-confirm-text">'+obj.i+"</div>"+'<div class="csn-confirm-btn" style="text-align:'+(obj.d?"center":"right")+';">'+'<a id="csn-true'+num+'">确定</a>'+(obj.d?"":'<a id="csn-false'+num+'">取消</a>');"</div>"+"</div>";var _div=document.createElement("div");_div.setAttribute("id",id);_div.setAttribute("class","csn-confirm");_div.innerHTML=_str;$("body").append(_div);var pw=parseInt($(sel).css("width"))-260;var ph=parseInt($(sel).css("height"))-parseInt($("#csn-div"+num).css("height"));$("#csn-div"+num).css({top:ph/2+"px",left:pw/2+"px"});$(sel).on("click",function(e){var i=$.index(["csn-close"+num,"csn-true"+num,"csn-false"+num],e.target.id);if(i>-1){$(sel).remove()}if(obj.fn){if(i==1){obj.fn.call(this,true)}else{if(i==2){obj.fn.call(this,false)}}}});var down=false;var _x,_y;$div=$("#csn-div"+num);$div.on("mousedown",function(e){var ev=e||window.event;_x=ev.clientX-parseInt($div.css("left"));_y=ev.clientY-parseInt($div.css("top"));if(!down){down=true}});$(document).on("mouseup",function(){if(down){down=false}});$(document).on("mousemove",function(e){if(down){var ev=e||window.event;var left=ev.clientX-_x;var top=ev.clientY-_y;(left>=0&&left<=pw)&&$div.css("left",left+"px");(top>=0&&top<=ph)&&$div.css("top",top+"px")}})};$.heavy=function(fn){window.addEventListener("deviceorientation",function(e){fn(e)},true)};$.qq=function(qq){$("body").append('<iframe style="display:none;" src="tencent://message/?uin='+qq+'&site=&menu=yes"></iframe>')};csn.C.prototype=C.prototype=$.fn;$.csn=csn;return $})();window.Csn=Csn,"$" in window||(window.$=Csn);