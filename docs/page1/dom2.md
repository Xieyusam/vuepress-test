# Vue.js下使用vue-full-calendar的那些坑（一）
近期接到一个任务就是用大日历组件开发一个日程管理的功能，刚刚接到这个任务时我立马想到了full-calendar的日历组件，因为它接口多，功能强大，但是在vue下使用该full-calendar就得用vue版本的vue-full-calendar，这就导致了一些问题，就是vue-full-calendar没有很详细的api文档，毕竟是基于jquery开发的，我只能看着原版jquery的文档来摸索。

这里先转载一下原版的中文文档：
[full-calendar日历插件说明文档](https://blog.csdn.net/supingemail/article/details/48371927)
[FullCalendar 官方文档翻](http://www.cnblogs.com/mycoding/archive/2011/05/20/2052152.html)
[fullCalendar:中文API](http://blog.sina.com.cn/s/blog_9475b1c101012c5f.html)

现在开始看我现在的日历界面

![vue-full-calendar](https://img-blog.csdnimg.cn/2019110809242830.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzgyMDk2NA==,size_16,color_FFFFFF,t_70)
大家可以看到我的日历的的header部分是与原版api提供的是不同的样式，这是我用原生的js写的，通过调用api来实现和原版api按钮一样的功能，但是大家看了文档发现，大部分提供的函数api都是基于jquery的，那在vue下要怎么用呢，通过仔细查看vue-full-calendar的fullcalendar.vue文件我找到了答案

首先我们要给fullcalendar设置一个ref

```c
    <!-- （起点）*********日历组件主体******** -->
    <full-calendar
      :config="config"
      :events="events"
      ref="calendar"
      @event-mouseover="hoveritem1"
      @event-mouseout="hoveritem2"
      @event-render="eventRender"
      @event-selected="eventClick"
      @day-click="dayClick"
    ></full-calendar>

    <!-- （终点）******日历组件主体*** -->

```
然后下面是我使用其官方api的js方法

```javascript
//获取当前日期，返回一个moment
this.View_title = this.$refs.calendar.fireMethod("getDate");
//上一个月（周）
 this.$refs.calendar.fireMethod("prev");
 //下一个月（周）
 this.$refs.calendar.fireMethod("next");
 //切换到月视图
 this.$refs.calendar.fireMethod("changeView", "month");
 //切换到basicWeek视图
 this.$refs.calendar.fireMethod("changeView", "basicWeek");
 //很多文档中的api都可以用该方法去使用
 //这是因为我看了fullcalendar.vue的源码，在转化为vue版本时其实留了一些api给我们使用
 //但是文档中却没有提及，也算是一个小坑了吧
 //其他的api大家可以自己摸索一下
 //下面是fullcalendar.vue的一小段源码
         methods: {
            fireMethod(...options) {
                return $(this.$el).fullCalendar(...options)
            },
        },

 
```
建议大家在使用vue-full-calendar的时候多看看fullcalendar.vue源码或者看看fullcalendar.js源文件
当然可以直接阅读和修改源码的大佬就可以跳过这一步了哈哈哈
新来乍到
多多指教