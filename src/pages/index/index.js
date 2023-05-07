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
