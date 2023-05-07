let app = getApp();
Component({
  data: {
    selected: null,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/tab1/index",
      iconPath: "/images/icon_component.png",
      selectedIconPath: "/images/icon_component_HL.png",
      text: "组件"
    }, {
      pagePath: "/pages/tab2/index",
      iconPath: "/images/icon_API.png",
      selectedIconPath: "/images/icon_API_HL.png",
      text: "接口"
    }]
  },
  
  ready(){
    this.setData({
      selected: app.globalData.tabSelect
    });
  },

  attached() {

  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      if(data.index===this.data.selected){
        return false;
      }
      wx.switchTab({url});
      app.globalData.tabSelect = data.index;
      this.setData({
        selected: data.index
      });
    }
  }
});