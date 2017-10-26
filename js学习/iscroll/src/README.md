## 基于IScroll的下拉刷新皮肤系列
**最后更新:20170609**


### API说明
**所有的下拉刷新皮肤对外提供的API均保持一致**

#### `pulltorefresh.skin.×××`的API
这些API事每一个下拉刷新对象都有的

```
* finished //这是一个属性，用来控制当前上拉加载是否可用
* refresh() //重置状态。譬如上拉加载关闭后需要手动refresh重置finished状态
* pulldownLoading() //主动触发一个下拉刷新的动画(同时会触发下拉回调)
* pullupLoading() //主动触发一个上拉加载的动画(同时会触发上拉回调)
* endPullDownToRefresh() //关闭下拉刷新动画，重置状态
* endPullUpToRefresh(finished) //关闭上拉加载动画，重置状态，如果finished，则不允许在上拉，除非再次refresh()
```


#### `pulltorefresh.core.js`的API
这个文件的API主要是用来给具体的皮肤类进行继承与实现。

```
* _initPullToRefreshTipsHook() //在这里初始化生成下拉刷新与上拉加载的提示
* _pullingHook(deltaY,thresholdHeight) //下拉过程中的钩子函数，方便实现一些渐变动画
* _pulldownLoaingAnimationHook //下拉刷新的动画
* _pulldownLoaingAnimationSuccessHook(done,isSuccess) //下拉刷新的成功动画-动画完毕后可能的成功提示,没有的话请直接执行done
* _pulldownLoaingAnimationEndHook //下拉刷新的动画完成后的回调，可以用来重置状态
* _pullupLoaingAnimationHook(isFinished) //上拉加载的动画
* _pullupLoaingAnimationSuccessHook(isFinished) //上拉加载的成功动画-动画完毕后可能的成功提示，或者重置状态
* _scrollEndHook //滑动完毕后的end回调(这个比较少用到)
* _enablePullUpHook //允许pullup后的回调
* _disablePullUpHook //禁止pullup后的回调
```

### 源码说明


#### `pulltorefresh.skin.css`
是所有自定义下拉刷新皮肤使用的css样式，这里所有的样式一起打包成了一个文件

#### `pulltorefresh.core.js`
下拉刷新的核心实现，依赖于`IScroll5`，里面将下拉刷新的核心逻辑都抽取出来了，并规定了一些特定的UI实现API，方便自定义继承实现。

这样，可以方便单独去继承这个类实现各色各样不同的皮肤。

#### `pulltorefresh.skin.×××.js`
对应的皮肤实现，所有皮肤实现均继承了上述的下拉刷新核心类，因此皮肤类中只关注UI层面的实现。

* `default`和`type1`皮肤依赖于`mui.css`
* 其它皮肤依赖于`pulltorefresh.skin.css`

#### `pulltorefresh.skin.native.js`
这个是一个特殊的皮肤，它重新定义了一个简单的下拉刷新。

应用场景是:在混合开发的原生容器内部使用，例如钉钉等环境。在这种环境下，原生已经提供了下拉API了，所以这里面都是基于它的API来实现，同时增加了一个上拉加载。

注意，这种皮肤只适用于原生环境，因此在h5环境下会兼容下其它皮肤，参考示例。

#### `pulltorefresh.bizlogic.impl.js`
下拉刷新业务层面的封装，上述的皮肤类实现了下拉刷新功能，但是没有对业务场景进行封装的。

因此在实际业务是，会有大量重复的代码(如相同的ajax，相同的接口数据处理等等)

因此这里有封装了一层，将通用业务写进去了，进一步减少代码。

当然了，实际情况下可以去根据不同业务修改这个源文件，重新打包。

调用示例:
```
new PullToRefreshTools.bizlogic({
    skin: PullToRefreshTools.skin.defaults,
    url: 'http://115.29.151.25:8012/request.php',
    template: '#list_item',
    dataRequest: function(currPage, callback) {
        var result = {
            action: 'testPullrefreshListDemoV3',
            paras: {
                currentpageindex: currPage.toString(),
                pagesize: 10,
                tabType: 'tab1',
                // 搜索值,接口里没有实现,这里可以打印代表搜索值已经获取到
                searchValue: ''
            }
        };
        return result;
    },
    itemClick: function(e) {
        console.log("点击:" + this.id);
    }
});
```

最终生成的对象开放的API:

```
* refresh() //触发一次上拉加载(一般搜索中用到，搜索完毕后会刷新页面)
* pullToRefreshInstance //属性，这个是原始的下拉刷新对象引用(可以使用上述的下拉刷新api)
* 至于生成业务下拉刷新时需要传入的参数，由于与业务耦合，因此不赘述，详情可以参考源码或示例
```

### 如何自定义实现皮肤
参考源码中的skin系列，只需要继承核心类，然后实现对应的UI函数即可。