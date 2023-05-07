const app = getApp();
Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#ff5900',
    list: [],
    list1: [],
    scrollInView: null,
    show: false,
  },
  attached () {
    let selected = wx.getStorageSync('selected');
    const scrollInView = wx.getStorageSync('scrollInView');
    console.log(scrollInView,'scrollInView');
    if (app.globalData.customTabBarList.length > 4) {
      selected = selected === 0 ? app.globalData.customTabBarList[0].pagePath : selected;
      let arr = app.globalData.customTabBarList.slice(0, 3);
      arr.push(
        {
          selectedIconPath: '/images/buttomIcon/more.png',
          iconPath: '/images/buttomIcon/more2.png',
          pagePath: arr.some(item => item.pagePath === selected) ? '' : selected,
          text: '更多',
          more: 1,
        });
      this.setData({
        list: arr,
        selected: selected,
        list1: app.globalData.customTabBarList.slice(3)
      });
    } else {
      selected = selected === 0 ? app.globalData.customTabBarList[0].pagePath : selected;
      this.setData({
        selected: selected,
        list: app.globalData.customTabBarList
      });
    }
    this.setData({
      scrollInView: scrollInView ? scrollInView : null
    });
    console.log(this.data.scrollInView,'scrollInViewscrollInView');
  },
  methods: {
    // BO
    switchTab (e) {
      const { path } = e.currentTarget.dataset;
      const { show } = this.data;

      if (path.more) {
        this.setData({
          show: !show
        });
        return;
      }
      const url = path.pagePath;
      wx.setStorageSync('selected', url);
      wx.reLaunch({ url });
    },
    // ON
    switchView (e) {
      const { path } = e.currentTarget.dataset;
      wx.setStorageSync('scrollInView', path.enText);
      this.setData({
        scrollInView: path.enText
      });
      const url = path.pagePath;
      wx.setStorageSync('selected', url);
      wx.reLaunch({ url });
    }
  },
});