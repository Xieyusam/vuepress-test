module.exports = {
  title: "Sam Xie's Blog",
  description: "It's wonderful to have a beginner's mind",
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    search: true, //搜索
    searchMaxSuggestions: 10,
    nav: [ // 导航栏配置
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'VUE',
        link: '/page1/'
      },
      {
        text: '前端',
        link: '/page1/',
        items: [{
            text: 'Javascript(ES)',
            link: '/jsDom/',
          },
          {
            text: 'Html',
            link: '/page1/',
          },
          {
            text: 'Css',
            link: '/page1/',
          },
          {
            text: '微信H5',
            link: '/page1/',
          },
          {
            text: '微信小程序',
            link: '/page1/',
          }
        ]
      },
      {
        text: 'Nodejs',
        link: '/page1/'
      },
      {
        text: 'github',
        link: 'https://github.com/Xieyusam'
      }
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    // 侧边栏
    sidebar: [{
        title: 'VUE',
        collapsable: true,
        children: [
          'page1/',
          'page1/dom1',
          'page1/dom2',
          'page1/dom3',
          'page1/dom4',
          'page1/dom5'
        ]
      },
      {
        title: 'JavaScript',
        collapsable: true,
        children: [
          'jsDom/',
          'jsDom/blog1',
        ]
      }
    ]
  }
}