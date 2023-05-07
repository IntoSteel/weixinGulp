// index.js
import LangUtils from '@utils/LangUtils';
let langSrc = LangUtils.getLangSrc();
// 获取应用实例
const app = getApp();

Page({
  data: {
    lang: {
      ...langSrc.common,
    },
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onShow(){
    //每次 onShow 重新设置语言，以防语言更新
    this.setLanguage();
    this.getUserPermissions();
  },
  /**
   * 重新设置语言
   */
  setLanguage() {
    langSrc = LangUtils.getLangSrc();
    this.setData({
      lang: {
        ...langSrc.common,
      }
    });
  },
  // 查询按钮权限
  getUserPermissions () {
    // 获取的权限，目前写死
    const permissionsList = ['mini:applicationManage','mini:applicationManageSGS', 'mini:productInspection',
      'mini:checkout', 'mini:checkQuery'];
    wx.setStorageSync('permissions', permissionsList);
    this.setCustomTabBar();

  },
  // 添加底部栏数据
  setCustomTabBar () {
    // 所有菜单
    const lists = [
      {
        selectedIconPath: '/images/buttomIcon/file.png',
        iconPath: '/images/buttomIcon/file2.png',
        pagePath: '/pages/tab1/index',
        text: 'tab1',
        enText: 'RequestForm',
        role:'mini:applicationManage'
      },
      {
        selectedIconPath: '/images/buttomIcon/file.png',
        iconPath: '/images/buttomIcon/file2.png',
        pagePath: '/pages/tab2/index',
        text: 'tab2',
        enText: 'ApplyManage',
        role:'mini:applicationManageSGS'
      },
      {
        selectedIconPath: '/images/buttomIcon/file.png',
        iconPath: '/images/buttomIcon/file2.png',
        pagePath: '/pages/tab3/index',
        text: 'tab3',
        enText: 'DispatchManage',
        role:'mini:productInspection'
      },
      {
        selectedIconPath: '/images/buttomIcon/file.png',
        iconPath: '/images/buttomIcon/file2.png',
        pagePath: '/pages/tab4/index',
        text: 'tab4',
        enText: 'TestOrder',
        role:'mini:checkout'
      },
      {
        selectedIconPath: '/images/buttomIcon/file.png',
        iconPath: '/images/buttomIcon/file2.png',
        pagePath: '/pages/tab5/index',
        text: 'tab5',
        enText: 'InspectProcess',
        role:'mini:checkQuery'
      },
 
    ];
    const permissions = wx.getStorageSync('permissions');
    // 权限过滤
    let list = lists.filter((item) => permissions.includes(item.role));
    // list.push(lists[lists.length - 1]);
    app.globalData.customTabBarList = list;
    console.log(app.globalData.customTabBarList,'app.globalData.customTabBarList');
    wx.setStorageSync('selected', 0);
  },
  //事件处理函数
  bindViewTap() {

    wx.redirectTo({
      url: '/pages/tab1/index'
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  getUserProfile(e) {
    //    推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', //声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        console.log('1111');
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
