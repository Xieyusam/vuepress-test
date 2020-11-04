# 封装cookie、sessionStorage、localStorage公共函数（vue）

通常一个前端项目，我们最常用到的三个浏览器储存有三种：

cookie、sessionStorage、localStorage

这三种各有各的优势

在项目快速搭建的过程中，我通常会写一个公共js文件，方便调用他们

```javascript

// local操作
const localData = function(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:localStorage的名称
   * obj:存入的内容，可以是任意类型
   * localStorage.getItem(key):获取指定key本地存储的值
   * localStorage.setItem(key,value)：将value存储到key字段
   * localStorage.removeItem(key):删除指定key本地存储的值
   * */
  switch (method) {
    case "get":
      if (localStorage.getItem(name + "_obj")) {
        return JSON.parse(localStorage.getItem(name + "_obj"));
      } else if (localStorage.getItem(name + "_str")) {
        return localStorage.getItem(name + "_str");
      } else {
        return null;
      }
    case "set":
      localData("clean", name);
      if (typeof obj == "object") {
        localStorage.setItem(name + "_obj", JSON.stringify(obj));
      } else {
        localStorage.setItem(name + "_str", obj);
      }
      return true;
    case "clean":
      localStorage.removeItem(name + "_obj");
      localStorage.removeItem(name + "_str");
      return true;
  }
};

// session操作
const sessionData = function(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case "get":
      if (sessionStorage.getItem(name + "_obj")) {
        return JSON.parse(sessionStorage.getItem(name + "_obj"));
      } else if (sessionStorage.getItem(name + "_str")) {
        return sessionStorage.getItem(name + "_str");
      } else {
        return null;
      }
    case "set":
      sessionData("clean", name);
      if (typeof obj == "object") {
        sessionStorage.setItem(name + "_obj", JSON.stringify(obj));
      } else {
        sessionStorage.setItem(name + "_str", obj);
      }
      return true;
    case "clean":
      sessionStorage.removeItem(name + "_obj");
      sessionStorage.removeItem(name + "_str");
      return true;
  }
};

// session操作
const cookieData = function(method, name, obj, t) {
  if (method === "set") {
    setCookie(name, obj, t);
  } else if (method === "get") {
    return getCookie(name);
  } else if (method === "clean") {
    removeCookie(name);
  }
};

// 设置cookie
function setCookie(key, value, t) {
  var oDate = new Date(); //创建日期对象
  oDate.setDate(oDate.getDate() + t); //设置过期时间

  document.cookie =
    key + "=" + JSON.stringify(value) + ";expires=" + oDate.toGMTString();
    //设置cookie的名称，数值，过期时间
}

// 获取cookie的单个数值
function getCookie(key) {
  var arr1 = document.cookie.split("; "); 
  //将cookie按“; ”分割，数组元素为： cookie名=cookie值
  for (var i = 0; i < arr1.length; i++) {
    //分割数组里的每个元素
    var arr2 = arr1[i].split("="); //按照“=”分割
    if (arr2[0] == key) {
      return JSON.parse(arr2[1]); //返回翻译编码后的cookie值
    }
  }
}
// 移除cookie
function removeCookie(key) {
  setCookie(key, "", -1); //cookie的过期时间设为昨天
}

export { localData, sessionData, cookieData };
```

这几种浏览器缓存各有各的特点与机制

**Q:cookie和session的区别**
A:存储位置不同
cookie的数据信息存放在客户端浏览器上。
session的数据信息存放在服务器上。

存储容量不同
单个cookie保存的数据<=4KB，一个站点最多保存20个Cookie。
对于session来说并没有上限，但出于对服务器端的性能考虑，session内不要存放过多的东西，并且设置session删除机制。

存储方式不同
cookie中只能保管ASCII字符串，并需要通过编码方式存储为Unicode字符或者二进制数据。
session中能够存储任何类型的数据，包括且不限于string，integer，list，map等。

隐私策略不同
cookie对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗，所以它是不安全的。
session存储在服务器上，对客户端是透明对，不存在敏感信息泄漏的风险。

有效期上不同
开发可以通过设置cookie的属性，达到使cookie长期有效的效果。
session依赖于名为JSESSIONID的cookie，而cookie JSESSIONID的过期时间默认为-1，只需关闭窗口该session就会失效，因而session不能达到长期有效的效果。

服务器压力不同
cookie保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie是很好的选择。
session是保管在服务器端的，每个用户都会产生一个session。假如并发访问的用户十分多，会产生十分多的session，耗费大量的内存。

浏览器支持不同
假如客户端浏览器不支持cookie：
cookie是需要客户端浏览器支持的，假如客户端禁用了cookie，或者不支持cookie，则会话跟踪会失效。关于WAP上的应用，常规的cookie就派不上用场了。
运用session需要使用URL地址重写的方式。一切用到session程序的URL都要进行URL地址重写，否则session会话跟踪还会失效。
假如客户端支持cookie：
cookie既能够设为本浏览器窗口以及子窗口内有效，也能够设为一切窗口内有效。
session只能在本窗口以及子窗口内有效。

跨域支持上不同
cookie支持跨域名访问。
session不支持跨域名访问。

**Q:什么是WebStorage？**
A:WebStorage的目的是克服由cookie所带来的一些限制，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。
WebStorage两个主要目标：（1）提供一种在cookie之外存储会话数据的路径。（2）提供一种存储大量可以跨会话存在的数据的机制。
HTML5的WebStorage提供了两种API：localStorage（本地存储）和sessionStorage（会话存储）。

**Q:对比cookie，WebStorage有什么优点？**
A:（1）存储空间更大：cookie为4KB，而WebStorage是5MB；
（2）节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样美词请求都会传送到服务器，所以减少了客户端和服务器端的交互，节省了网络流量；
（3）对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；
（4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以速度更快；
（5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题；
（6）WebStorage提供了一些方法，数据操作比cookie方便；
　　　　setItem (key, value) ——  保存数据，以键值对的方式储存信息。
      　　 getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值。
        　　removeItem (key) ——  删除单个数据，根据键值移除对应的信息。
        　　clear () ——  删除所有的数据
        　　key (index) —— 获取某个索引的key

**Q:localStorage（本地存储）和sessionStorage（会话存储）的区别**
A:
1、生命周期：
localStorage:localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
 sessionStorage的生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。
2、存储大小：localStorage和sessionStorage的存储数据大小一般都是：5MB
3、存储位置：localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。
4、存储内容类型：localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理
5、获取方式：localStorage：window.localStorage;；sessionStorage：window.sessionStorage;。
6、应用场景：localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据。sessionStorage：敏感账号一次性登录；
