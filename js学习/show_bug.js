	    function show_bug(arr) {
		var sb = 'show_bug'+((Math.ceil(Math.random()*100000)));
		var _sb = '#'+sb;
		if ($(_sb)) { $(_sb).remove(); }
		if (!arr.i) { return; }
		arr.e = arr.e || 0;
		$('body').append('<div id="'+sb+'" style="font-size:14px;opacity:0;position:fixed;z-index:100;top:50%;margin-top:-31px;left:0;right:0;width:100%;height:400px;border-radius:10px;"><table style="margin:auto;border:1px solid #ccc;background:#fff;"><tr><td style="width:30px;padding:16px 10px 16px 16px;" valign="center"><i style="width:30px;height:30px;display:block;background:url(pub/img/icon.png)no-repeat;background-position:'+(-30*arr.e)+'px 0px;"></i></td><td><span style="font-size:14px;color:#333;padding-right:25px;">'+arr.i+'</span></td></tr></table></div>'); 
		$(_sb).animate({opacity:1},300);
		setTimeout(function() { 
		    $(_sb).animate({opacity:0},300);
		    setTimeout(function(){ $(_sb).remove(); }, 300);
		}, (arr.t || 1500)+300);    
	    }