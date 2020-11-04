# Vue打包app实现检查更新功能
最近接收到一个需求，就是把移动h5的代码打包成安卓app
这个确实很符合这个时代“一套代码，多处编译”的趋势

而且混生App发展到这个时期
也已经可以做到很多原生app所能做到的事情

我的项目是使用Vue搭建的，我选择的打包方式是使用HbuilderX打包

而这次的需求是app的检查更新功能（未上架各类市场）
开始这个需求之前，我构思了一下思路，大概如下

1.app会有一个版本号，可以根据版本号来判定是否更新
2.可以让后端编写接口，返回当前发布版本号（需要更新的版本号），与下载链接
3.通过比对版本号差异，选择是否提醒更新

好了思路完成后，就开始写业务代码：

1.首先，我新建了一个updateDialog.vue的更新弹窗组件，引入App.vue,然后开始写检查更新的函数，在这里我们需要后端给我写一个接口

```javascript
    checkupdate(){
      axios({
        url: "你的请求地址",
        method: "get",
      })
      .then((res) => {
        if (res.data.status === 200) {
          //获取后端提供的版本号与下载地址
          if(把获取的版本号与当前手机app判断){
            this.tipsShow = true //弹窗显示
          }
        }
      });
    },
```

2.第二步，我需要使用plusready函数获取到当前app的版本号

```javascript
    let _that = this;//这一步非常重要
    document.addEventListener("plusready", function () {
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        console.log(wgtinfo.version);
        _that.myVersion = wgtinfo.version;
        _that.checkupdate()//调用检查版本号的函数
      });
    });
```
好了，大概的业务代码如上，经过试验是可以实现需求的
但是这一定不是最优的方案，还需要接下来继续摸索
