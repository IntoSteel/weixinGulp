let app = getApp();

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        });
        app.globalData.tabSelect = 1;

      }
    },
    
  },
  methods:{
    onChanges(event) {
      console.log(event,'2323');
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
    },
  }
  
});
