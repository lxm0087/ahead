/**
 * 作者: dailc
 * 创建时间: 2017-03-28
 * 版本: [1.0, 2017/05/26 ]
 * 版权: dailc
 * 描述: 数据处理的通用方法封装
 */
(function(exports, CommonTools) {
    /**
     * 通用接口处理
     * 通过插拔式增加各种接口的支持
     */
    (function() {
        // 处理数据的函数池
        exports.dataProcessFn = [];

        /**
         * @description 统一处理返回数据,返回数据必须符合标准才行,否则会返回错误提示
         * @param {JSON} response 接口返回的数据
         * @param {Object} options 配置信息，包括
         * dataPath 手动指定处理数据的路径，遇到一些其它数据格式可以手动指定
         * 可以传入数组，传入数组代表回一次找path，直到找到为止或者一直到最后都没找到
         * isDebug 是否是调试模式，调试模式会返回一个debugInfo节点包含着原数据
         * 其它:无法处理的数据,会返回对应错误信息
         * @return {JSON} 返回的数据,包括多个成功数据,错误提示等等
         */
        exports.dataProcess = function(response, options) {
            options = options || {};

            // 永远不要试图修改arguments，请单独备份，否则在严格模式和非严格模式下容易出现错误
            var args = [].slice.call(arguments);
            var result = {
                // code默认为0代表失败，1为成功
                code: 0,
                // 描述默认为空
                message: '',
                // 数据默认为空
                data: null,
                // v7接口中的status字段，放在第一层方便判断
                status: 0,
                // 一些数据详情,可以协助调试用
                debugInfo: {
                    type: '未知数据格式'
                }
            };

            if (options.dataPath == null) {
                // 不需要处理

                return response;
            }

            if (typeof options.dataPath === 'string') {
                options.dataPath = [options.dataPath];
            }

            // 默认为详情
            var isDebug = options.isDebug || false,
                paths = options.dataPath,
                processFns = exports.dataProcessFn,
                len = processFns.length,
                num = paths.length,
                isFound = false;

            if (!response) {
                result.message = '接口返回数据为空!';
                return result;
            }
            // 添加一个result，将返回接口给子函数
            args.push(result);
            for (var k = 0; !isFound && k < num; k++) {
                // 每次动态修改path参数
                args[1] = paths[k];

                for (var i = 0; !isFound && i < len; i++) {
                    var fn = processFns[i];
                    var returnValue = fn.apply(this, args);

                    if (returnValue != null) {
                        // 找到了或者到了最后一个就退出
                        if (returnValue.code == 1 || k == num - 1) {
                            isFound = true;
                            result = returnValue;
                            break;
                        }
                    }
                }
            }

            if (!isFound) {
                // 没有找到数据需要使用默认
                // 如果没有数据处理函数或数据格式不符合任何一个函数的要求
                result.message = '没有数据处理函数或者接口数据返回格式不符合要求!';
                // 装载数据可以调试
                result.debugInfo.data = response;
            }

            // 非null代表已经找到格式了，这个是通过约定越好的
            if (!isDebug) {
                result.debugInfo = undefined;
            }
            return result;
        };
    })();
    (function() {

        /**
         * @description 通过指定路径，来获取对应的数据
         * 如果不符合数据要求的，请返回null，这样就会进入下一个函数处理了
         * @param {JSON} response 接口返回的数据
         * @param {String} path 一个自定义路径，以点分割，用来找数据
         * @param {JSON} returnValue 返回数据
         * 1:返回列表
         * 其它:返回详情
         * @return {JSON} 返回的数据,包括多个成功数据,错误提示等等
         * */
        function handleDataByPathV6(response, path, returnValue) {
            if (!(path && response && response.ReturnInfo && response.BusinessInfo)) {
                return null;
            }
            var debugInfo = {
                type: 'v6数据格式:' + path
            };
            var returnInfo = response.ReturnInfo,
                businessInfo = response.BusinessInfo,
                userArea = response.UserArea;

            if (returnInfo.Code == '1') {
                if (businessInfo.Code == '1') {
                    returnValue.code = 1;

                    var data = CommonTools.getNameSpaceObj(response, path);

                    if (data) {
                        returnValue.data = data;
                    } else {
                        returnValue.message = returnValue.message || '指定路径下没有找到数据';
                        returnValue.data = null;
                        // 3代表业务数据错误
                        debugInfo.errorType = '3';
                    }
                } else {
                    // 2代表业务错误
                    debugInfo.errorType = '2';
                    returnValue.code = 0;
                    returnValue.message = businessInfo.Description || '接口请求错误,后台业务逻辑处理出错!';
                }
            } else {
                // v6中的程序错误
                // 1代表程序错误
                debugInfo.errorType = '1';
                returnValue.code = 0;
                returnValue.message = returnInfo.Description || '接口请求错误,后台程序处理出错!';
            }

            returnValue.debugInfo = debugInfo;
            return returnValue;
        }

        exports.dataProcessFn.push(handleDataByPathV6);
    })();
    (function() {

        /**
         * @description 通过指定路径，来获取对应的数据
         * 如果不符合数据要求的，请返回null，这样就会进入下一个函数处理了
         * @param {JSON} response 接口返回的数据
         * @param {String} path 一个自定义路径，以点分割，用来找数据
         * @param {JSON} returnValue 返回数据
         * 1:返回列表
         * 其它:返回详情
         * @return {JSON} 返回的数据,包括多个成功数据,错误提示等等
         * */
        function handleDataByPathV7(response, path, returnValue) {
            if (!(path && response && response.status && response.custom)) {
                return null;
            }
            var debugInfo = {
                type: 'v7数据格式:' + path
            };
            var status = response.status;

            // 对应状态码
            returnValue.status = status.code || 0;
            returnValue.message = status.text;

            if (status.code == '200') {
                returnValue.code = 1;

                var data = CommonTools.getNameSpaceObj(response, path);

                if (data) {

                    returnValue.data = data;
                } else {
                    returnValue.message = returnValue.message || '指定路径下没有找到数据';
                    returnValue.data = null;
                    // 3代表业务数据错误
                    debugInfo.errorType = '3';
                }
            } else {
                // 请求失败的情况暂时使用接口返回的默认提示
                returnValue.code = 0;
                // 2代表status错误，message默认就已经在节点中
                debugInfo.errorType = '2';
                returnValue.message = returnValue.message || 'status状态错误';
            }

            returnValue.debugInfo = debugInfo;
            return returnValue;
        }

        exports.dataProcessFn.push(handleDataByPathV7);
    })();

    CommonTools.namespace('dataProcess', exports.dataProcess);
})({}, PullToRefreshTools);
/**
 * 作者: dailc
 * 创建时间: 2017/03/28
 * 版本: [1.0, 2017/05/26 ]
 * 版权: dailc
 * 描述: 下拉刷新的业务实现，里面会自动帮助进行接口请求，数据处理等，依赖于模板处理工具 Mustache
 * 一般结合下拉刷新皮肤使用
 * 由于涉及到了业务，所以基于mui的js文件的
 * 这个文件是老版本下拉刷新调用的兼容，所以代码较为混乱
 */
(function(exports, CommonTools) {
    var dataProcess = CommonTools.dataProcess;
    
    // 全局下拉刷新实际对象,这个根据不同的皮肤类型自定义加载
    var PullToRefreshBase;

    // 判断是否支持tap
    var touchSupport = ('ontouchstart' in document);
    var tapEventName = touchSupport ? 'tap' : 'click';
    /**
     * 默认的设置参数
     */
    var defaultSetting = {
        // 是否是debug模式,如果是的话会输出错误提示
        isDebug: false,
        // 下拉有关
        down: {
            height: 75,
            contentdown: '下拉可以刷新', //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover: '释放立即刷新', //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh: '正在刷新', //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            contentrefreshsuccess: '刷新成功', //可选，刷新成功的提示
            contentrefresherror: '刷新失败', //可选，刷新失败的提示-错误回调用到
            isSuccessTips: true,
        },
        // 上拉有关
        up: {
            // 是否自动上拉加载-初始化是是否自动
            auto: true,
            // 距离底部高度(到达该高度即触发)
            offset: 100,
            // 是否隐藏那个加载更多动画,达到默认加载效果
            show: true,
            contentdown: '上拉显示更多',
            contentrefresh: '正在加载...',
            contentnomore: '没有更多数据了',
        },
        bizlogic: {
            // 默认的请求页面,根据不同项目服务器配置而不同,正常来说应该是0
            defaultInitPageNum: 0,
            // 得到模板 要求是一个函数(返回字符串) 或者字符串
            // 必须由外部传入
            getLitemplate: null,
            // 得到url 要求是一个函数(返回字符串) 或者字符串
            // 必须由外部传入
            getUrl: null,
            // 得到请求参数 必须是一个函数,因为会根据不同的分页请求不同的数据,该函数的第一个参数是当前请求的页码
            // 必须由外部传入
            getRequestDataCallback: null,
            // 改变数据的函数,代表外部如何处理服务器端返回过来的数据
            // 如果没有传入,则采用内部默认的数据处理方法
            changeResponseDataCallback: null,
            // 请求成功,并且成功处理后会调用的成功回调方法,传入参数是成功处理后的数据
            successRequestCallback: null,
            // 请求失败后的回调,可以自己处理逻辑,默认请求失败不做任何提示
            errorRequestCallback: null,
            // 下拉刷新回调,这个回调主要是为了自动映射时进行数据处理
            refreshCallback: null,
            // 列表点击回调，传入参数是  e,即目标对象
            itemClickCallback: null,
            // 列表监听元素选择器,默认为给li标签添加标签
            // 如果包含#,则为给对应的id监听
            // 如果包含. 则为给class监听
            // 否则为给标签监听
            targetListItemClickStr: 'li',
            // 默认的列表数据容器id,所有的数据都会添加到这个容器中,这里只接受id
            listdataId: '#listdata',
            // 默认的下拉刷新容器id,mui会对这个id进行处理,这里只接受id
            // 注意,传给Mui时可以传 #id形式或者是  原生dom对象
            pullrefreshId: '#pullrefresh',
            // 下拉刷新后的延迟访问时间,单位为毫秒
            delayTime: 300,
            // ajax请求有关的设置,包括accept,contentType等
            ajaxSetting: {
                // 请求类别,默认为POST
                requestType: 'POST',
                // 默认的请求超时时间
                requestTimeOut: 15000,
                // ajax的Accept,不同的项目中对于传入的Accept是有要求的
                // 传入参数,传null为使用默认值
                /*示例
                 * {
                 * script: 'text/javascript, application/javascript, application/x-javascript',
                 * json: 'application/json;charset=utf-8'
                 * 等等(详情看源码)
                 * }
                 */
                accepts: {
                    script: 'text/javascript, application/javascript, application/x-javascript',
                    json: 'application/json',
                    xml: 'application/xml, text/xml',
                    html: 'text/html',
                    text: 'text/plain'
                },
                // 默认的contentType
                contentType: "application/x-www-form-urlencoded",
                // 自定义头部默认为空
                headers: null
            },
            // 是否请求完数据后就自动渲染到列表容器中,如果为false，则不会
            // 代表需要自己手动在成功回调中自定义渲染
            isRendLitemplateAuto: true
        },
    };
    /**
     * @description 将string字符串转为html对象,默认创一个div填充
     * @param {String} strHtml 目标字符串
     * @return {HTMLElement} 返回处理好后的html对象,如果字符串非法,返回null
     */
    function pareseStringToHtml(strHtml) {
        if(strHtml == null || typeof(strHtml) != "string") {
            return null;
        }
        // 创一个灵活的div
        var i, a = document.createElement("div");
        var b = document.createDocumentFragment();
        a.innerHTML = strHtml;
        while(i = a.firstChild) b.appendChild(i);
        return b;
    }

    function PullDownRefresh(options) {
        var self = this;
        
        options = CommonTools.extend(true, {}, defaultSetting, options);
        
        if(!options.skin) {
            throw new Error("错误:传入的下拉刷新皮肤错误,超出范围!");
            return;
        }
        // 生成下拉刷新对象
        PullToRefreshBase = options.skin;
        
        if(options.down) {
            options.down.callback = function() {
                self.pullDownCallback();
            };
        }
        if(options.up) {
            options.up.callback = function() {
                self.pullUpCallback();
            };
        }

        self.options = options;
        // 数据容器
        self.respnoseEl = document.getElementById(options.bizlogic.listdataId);

        // 是否不可以加载更多,如果某些的返回数据为空,代表不可以加载更多了
        self.isShouldNoMoreData = true;
        // 初始化当前页
        self.currPage = self.options.bizlogic.defaultInitPageNum;
        if(self.options.up && self.options.up.auto) {
            // 如果初始化请求,当前页面要减1
            self.currPage--;
        }
        self.initAllEventListeners();
        self.pullToRefreshInstance = new PullToRefreshBase(options);
    }
    /**
     * @description 下拉回调
     */
    PullDownRefresh.prototype.pullDownCallback = function() {
        var self = this;
        if(!self.loadingDown) {
            // 清空 -下拉的时候不清空,请求成功或者失败后再清空
            // self.clearResponseEl();
            // 下拉标记,为了回复的时候进行辨别
            self.isPullDown = true;
            self.loadingDown = true;
            self.currPage = self.options.bizlogic.defaultInitPageNum;

            // 延迟delayTime毫秒访问
            setTimeout(function() {
                self.ajaxRequest();
            }, self.options.bizlogic.delayTime);

            // 下拉刷新回调
            self.options.bizlogic.refreshCallback && self.options.bizlogic.refreshCallback(true);
        }

    };
    /**
     * @description 上拉回调
     */
    PullDownRefresh.prototype.pullUpCallback = function() {
        var self = this;
        if(!self.loadingUp) {
            self.isPullDown = false;
            self.loadingUp = true;

            self.currPage++;
            setTimeout(function() {
                self.ajaxRequest();
            }, self.delayTime);
        }

    };
    /**
     * @description 初始化所有事件监听
     */
    PullDownRefresh.prototype.initAllEventListeners = function() {
        var self = this;

        var refreshFunc = function(e) {
            self.refresh();
        };
        // 设置列表点击监听,只需要设置一遍,对着listid上设置久可以了
        self.setElemListeners();
    };
    /**
     * @description 设置列表点击监听
     */
    PullDownRefresh.prototype.setElemListeners = function() {
        var self = this;
        if(self.options.bizlogic.itemClickCallback) {
            // mui('#' + self.options.bizlogic.listdataId).off(tapEventName, self.options.bizlogic.targetListItemClickStr);
            mui('#' + self.options.bizlogic.listdataId).on(tapEventName, self.options.bizlogic.targetListItemClickStr, self.options.bizlogic.itemClickCallback);
        }
    };
    /**
     * @description 刷新,这里默认为清空,并触发一次加载更多
     */
    PullDownRefresh.prototype.refresh = function() {
        var self = this;
        if(!self.options.up || !self.pullToRefreshInstance.enablePullUp) {
            // 如果不存在上拉加载
            self.clearResponseEl();
            self.pullDownCallback();
        } else if(!self.loadingUp) {
            // 存在上拉加载
            // 清空以前容器中的数据
            self.clearResponseEl();
            // 当前页变为初始页-1  因为会处罚上拉回调,默认将页数+1
            self.currPage = self.options.bizlogic.defaultInitPageNum - 1;
            self.loadingMore();
        }

    };
    /**
     * @description 增加加载更多的翻页功能
     * @param {Function} callback 成功回调
     */
    PullDownRefresh.prototype.loadingMore = function(callback) {
        var self = this;
        // 只会用一次的，用完即可删除
        self.loadingMoreSuccess = callback;
        // 手动将状态设为可以加载更多
        if(self.pullToRefreshInstance.finished) {
            self.pullToRefreshInstance.refresh(true);
            self.isShouldNoMoreData = true;
        }
        // 触发一次加载更多
        self.pullToRefreshInstance.pullupLoading();
    };
    /**
     * @description 禁止上拉加载功能
     */
    PullDownRefresh.prototype.disablePullupToRefresh = function() {
        this.pullToRefreshInstance.disablePullupToRefresh();
    };
    /**
     * @description 开启上拉加载功能
     */
    PullDownRefresh.prototype.enablePullupToRefresh = function() {
        this.pullToRefreshInstance.enablePullupToRefresh();
    };
    /**
     * @description ajax请求数据
     */
    PullDownRefresh.prototype.ajaxRequest = function() {
        var self = this;
        if(!self.options.bizlogic.getUrl) {
            // 如果url不存在
            if(self.options.isDebug) {
                console.error('error***url无效,无法访问');
            }
            // 触发错误回调
            self.errorRequest(null, null, '请求url为空!');
            return;
        }

        var next = function(requestData) {
            var url = "";
            if(typeof(self.options.bizlogic.getUrl) == "function") {
                url = self.options.bizlogic.getUrl();
            } else {
                url = self.options.bizlogic.getUrl;
            }
            mui.ajax(url, {
                data: requestData,
                dataType: "json",
                timeout: self.options.bizlogic.requestTimeOut,
                type: self.options.bizlogic.ajaxSetting.requestType,
                // 接受的头
                accepts: self.options.bizlogic.ajaxSetting.accepts,
                // 自定义头部
                headers: self.options.bizlogic.ajaxSetting.headers,
                // contentType
                contentType: self.options.bizlogic.ajaxSetting.contentType,
                success: function(response) {
                    self.successRequest(response);
                },
                error: function(xhr, status) {
                    self.errorRequest(xhr, status, '请求失败!');
                }
            });
        };

        if(self.options.bizlogic.getRequestDataCallback) {
            var requestData = self.options.bizlogic.getRequestDataCallback(self.currPage, function(requestData) {
                next(requestData);
            });
            if(requestData !== undefined) {
                next(requestData);
            }

        } else {
            if(self.options.isDebug) {
                console.warn('warning***请注意getData不存在,默认数据为空');
            }
            next();
        }

    };
    /**
     * @description 请求失败回调
     * @param {JSON} xhr
     * @param {Number} status
     * @param {String} msg
     */
    PullDownRefresh.prototype.errorRequest = function(xhr, status, msg) {
        var self = this;
        // 没有返回数据,代表不可以加载更多
        self.isShouldNoMoreData = false;
        self.refreshState(false);
        self.currPage--;
        self.currPage = self.currPage >= self.defaultInitPageNum ? self.currPage : self.defaultInitPageNum;
        self.options.bizlogic.errorRequestCallback && self.options.bizlogic.errorRequestCallback(xhr, status, msg);
    };
    /**
     * @description 成功回调
     * @param {JSON} response 成功返回数据
     * @param {Boolean} isInitSessionData 是否是初始时的数据
     */
    PullDownRefresh.prototype.successRequest = function(response, isInitSessionData) {
        var self = this;
        if(!response) {
            if(self.options.isDebug) {
                console.log('warning***返回的数据为空,请注意！');
            }
            self.isShouldNoMoreData = false;
            self.refreshState(false);
            return;
        }
        if(self.options.isDebug) {
            console.log('下拉刷新返回数据:' + JSON.stringify(response));
        }
        if(self.options.bizlogic.changeResponseDataCallback) {
            // 如果存在转换数据的函数,用外部提供的
            response = self.options.bizlogic.changeResponseDataCallback(response);
        } else {
            // 使用默认的数据转换
            response = self.defaultChangeResponseData(response);
        }

        if(self.options.bizlogic.isRendLitemplateAuto) {
            // 如果自动渲染
            // 如果是下拉加载 先清空
            if(self.isPullDown) {
                self.clearResponseEl();
            }
            var dataLen = 0;
            // 必须包含Mustache
            if(window.Mustache) {
                if(response && Array.isArray(response) && response.length > 0) {
                    var outList = '';
                    for(var i = 0; i < response.length; i++) {
                        var value = response[i];
                        // 默认模版
                        var litemplate = "";
                        if(self.options.bizlogic.getLitemplate) {
                            if(typeof(self.options.bizlogic.getLitemplate) === "string") {
                                // 如果模板是字符串
                                litemplate = self.options.bizlogic.getLitemplate;
                            } else if(typeof(self.options.bizlogic.getLitemplate) === "function") {
                                // 如果模板是函数
                                litemplate = self.options.bizlogic.getLitemplate(value);
                            }
                        }
                        var output = Mustache.render(litemplate, value);
                        outList += output;
                        dataLen++;
                    }
                    if(outList != "") {
                        self.respnoseEl.appendChild(pareseStringToHtml(outList));
                    }
                } else {
                    // 没有返回数据,代表不可以加载更多
                    self.isShouldNoMoreData = false;
                }
            } else {
                self.isShouldNoMoreData = false;
                if(self.options.isDebug == true) {
                    console.error('error***没有包含mustache.min.js,无法进行模板渲染');
                }
            }
        }
        // 成功后的回调方法
        if(self.options.bizlogic.successRequestCallback && typeof(self.options.bizlogic.successRequestCallback) === "function") {
            // 如果回调函数存在,第二个参数代表是否是下拉刷新请求的,如果是,则是代表需要重新刷新数据
            self.options.bizlogic.successRequestCallback(response, self.isPullDown || (self.currPage == self.options.bizlogic.defaultInitPageNum));
        }
        if(!isInitSessionData) {
            // 如果不是session数据
            self.refreshState(true, dataLen);
        }
    };
    /**
     * @description 内置的默认数据转换函数
     * @param {JSON} response
     */
    PullDownRefresh.prototype.defaultChangeResponseData = function(response) {
        // 数据都使用通用处理方法
        var result = dataProcess(response, {
            dataPath: ['custom.infoList', 'custom.list', 'UserArea.InfoList']
        });
        return result.data;
    };
    /**
     * @description 重置状态
     * @param {Boolean} isSuccess 是否请求成功
     * @param {Number} dataLen 更新的数据条数
     */
    PullDownRefresh.prototype.refreshState = function(isSuccess, dataLen) {
        var self = this;
        dataLen = dataLen || 0;
        // 设置tips  这个可以用来设置  更新了多少条数据等等
        self.pullToRefreshInstance.setSuccessTips && self.pullToRefreshInstance.setSuccessTips('更新' + dataLen + '条数据');
        if(self.isPullDown) {
            // 如果是下拉刷新
            self.pullToRefreshInstance.endPullDownToRefresh(isSuccess);
            // 不管是下拉刷新还是上拉加载,都要刷新加载更多状态
            // 如果加载更多是否已经结束了
            // console.log("finished:"+self.pullToRefreshInstance.finished);
            if(self.pullToRefreshInstance.finished) {
                self.pullToRefreshInstance.refresh(true);
                // 又可以加载更多
                // console.log("变为true");
                self.isShouldNoMoreData = true;
            }
        }
        // console.log("是否可以加载更多：" + self.isShouldNoMoreData);
        if(!self.isShouldNoMoreData) {
            // 没有更多数据 
            self.pullToRefreshInstance.endPullUpToRefresh(true, isSuccess);
        } else {
            // 加载更多
            self.pullToRefreshInstance.endPullUpToRefresh(false, isSuccess);
        }
        self.loadingDown = false;
        self.loadingUp = false;
    };

    /**
     * @description 清空容器
     */
    PullDownRefresh.prototype.clearResponseEl = function() {
        var self = this;
        if(self.options.bizlogic.isRendLitemplateAuto) {
            self.respnoseEl && (self.respnoseEl.innerHTML = '');
        }
    };
    /**
     * @description 初始化下拉刷新
     * @param {JSON} options 传入的参数
     * @param {Function} 成功生成后,回调下拉刷新对象
     * 因为皮肤是通过异步加载的,所以必须通过回调进行
     */
    PullDownRefresh.init = function(options, callback) {
        var instance = new PullDownRefresh(options);

        callback && callback(instance);
        
        // 同步也返回
        return instance;    
    };
    
    CommonTools.namespace('bizlogic', PullDownRefresh);
    
})({}, PullToRefreshTools);