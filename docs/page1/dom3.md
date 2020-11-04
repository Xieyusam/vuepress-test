# Vue.js下使用vue-full-calendar的那些坑（二）
上次提到在开发日程模块时，用到了vue-full-calendar组件，但是这个组件并没有提供很多原版才有的api，这就需要我们自己去发掘了

下面是vue-full-calendar所提供的鼠标点击事件和渲染函数

```javascript
//event点击事件
@event-selected="eventClick"
// day的点击事件
@day-click="dayClick"
//渲染函数
@event-render="eventRender"
```

但是原文档中的event-mouseover和event-mouseout却没有提及和生效
所以我到了fullcalendar.vue里面去找答案
果然，让我找到了

```javascript
                    eventClick(...args) {
                        self.$emit('event-selected', ...args)
                    },

                    eventDrop(...args) {
                        self.$emit('event-drop', ...args)
                    },

                    eventReceive(...args) {
                        self.$emit('event-receive', ...args)
                    },

                    eventResize(...args) {
                        self.$emit('event-resize', ...args)
                    },
                    dayClick(...args){
                        self.$emit('day-click', ...args)
                    },
```
作者在改写vue版本的时候，没有把这两个事件添加进去，所以没办法使用（也可能是作者觉得这两个事件在vue版本下没什么用吧hhhh）
但是我们也可以依葫芦画瓢，把我们想要的加上去哈哈哈

```javascript
                    eventMouseover(...args) {
                        self.$emit('event-mouseover', ...args)
                    },
                    eventMouseout(...args) {
                        self.$emit('event-mouseout', ...args)
                    },
```
保存后，在组件中尝试使用

```javascript
//添加鼠标滑过事件
      @event-mouseover="hoveritem1"
      @event-mouseout="hoveritem2"
//写函数内容（与dayclick一样，提供了三个参数event, jsEvent, view）
//大家可以输出看看是什么东西
    hoveritem1(event, jsEvent, view) {
      console.log(1);
    },
    hoveritem2(event, jsEvent, view) {
       console.log(2);
    },     
```
初来乍到
多多指教
