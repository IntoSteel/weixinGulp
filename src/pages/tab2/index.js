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
    }
  }
});
