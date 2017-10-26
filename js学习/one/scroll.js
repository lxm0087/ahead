var page = 0;
var sum;
(function(exports) {
    var pullToRefreshBiz, pullToRefreshBase;
    //对象初始化
    function initPullRefreshList(isAuto, noDown, noUp) {
        var pullToRefreshObj = new pullToRefreshBase({
            container: '#pullrefresh',
            down: noDown ? null : { callback: pullDownRefreshCallback, isSuccessTips: true },
            up: noUp ? null : { auto: isAuto || false, callback: pullUpRefreshCallback },
            scroll: { bounceTime: 500, successAnimationTime: 500 },
        });
        //刷新回调
        function pullDownRefreshCallback() {
            newData(true);
        }
        //加载回调
        function pullUpRefreshCallback() {
            newData();
        }
        //刷新(true)/加载(false)
        function newData(isDown) {
            isDown ? (page = 1) : page++;
            setTimeout(function() {
                $.post('scroll.php', {page:page}, function(data) {
                    var json = JSON.parse(data);
                    sum = json.all;
                    if (sum >= page) {
                        show_list(json.list);
                    } else {
                        pullToRefreshObj.endPullUpToRefresh(true);
                    }
                });
            },500);
        }
        //数据变化显示
        function show_list(list) {
            var str='';
            for(var i = 0,c=list.length; i < c; i++) {
                str +=
                '<div onclick="location=\'latestActivityshow.php?cid='+list[i].id+'\';" class="flex-item">'+
                    '<div class="produce-show-img">'+
                        '<img src="'+(list[i].picurl || 'templates/baYin/images/zanwu.jpg')+'" alt="">'+
                    '</div>'+
                    '<div class="produce-show-introduce-box">'+
                        '<div class="produce-show-introduce">'+
                            '<h2>'+list[i].title+'</h2>'+
                            '<p>'+(list[i].description || '介绍信息更新中,敬请期待....' )+'</p>'+
                            '<p class="_date">联系电话：'+_tel+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            }
            var dataContainer = document.getElementById('listdata');
            page === 1 ? (dataContainer.innerHTML = str) : (dataContainer.innerHTML += str);
            resetState();
        }
        //重置状态
        function resetState() {
            if(page === 1) {
                pullToRefreshObj.endPullDownToRefresh();
                pullToRefreshObj.finished && pullToRefreshObj.refresh(true);
            }
            pullToRefreshObj.endPullUpToRefresh(page >= sum);
        }
        //刷新对象
        function refresh() {
            pullToRefreshObj.finished && pullToRefreshObj.refresh(true);
            pullToRefreshObj.pullupLoading();
        }
        return { refresh: refresh };
    }
    exports.init = function(pullToRefreshObj,noDown,noUp) {
        pullToRefreshBase = pullToRefreshObj;
        pullToRefreshBiz = initPullRefreshList(true,noDown,noUp);
    };
    window.demoPullToRefresh = exports;
})({});