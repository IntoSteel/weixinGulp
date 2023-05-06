import base from './base';
import config from '../env';
import LangUtils from './LangUtils';
import api from './api';

let count = 0;
const {
  isFunction,
} = base;



export const getToken = () => {
  return wx.getStorageSync('access_token') || '';
};

export const setLanguage = () => {
  if (!LangUtils.getLang()) {
    return 'zh'; //默认为中文
  } else {
    return LangUtils.getLang();
  }
};

export const ajax = (
  url,
  {
    data = {},
    method = 'GET',
    header = {},
    success = () => {
    },
    fail = () => {
    },
    complete = () => {
    },
    failToast = true,
    modalLoading = '加载中...',
    showLog = true,
  }
) => {

  // 构造请求体
  const request = {
    url: config.host + url,
    method: ['GET', 'POST'].indexOf(method) > -1 ? method : 'GET',
    header: Object.assign({ token: getToken(), language: setLanguage() }, header),
    data: Object.assign({}, data),
    timeout: 30000
  };

  // 打印日志
  showLog && console.table && console.table(request);
  modalLoading && wx.showLoading({ title: modalLoading, mask: true });

  // 塞入缓存队列
  // if (cache.url !== 'api/app/wx/user/login') {
  //   updataCache(cache);
  // }
  count++;

  wx.request(
    Object.assign(request, {
      success: ({ data, statusCode }) => {
        count--;
        // // token失效
        // if (data.code === 11002) {
        //   if (abcd) {
        //     abcd = false;
        //     wx.login({
        //       success: e => {
        //         api.user.login({
        //           data: {
        //             code: e.code,
        //           },
        //           success: res => {
        //             const { token, userInfo } = res.data;
        //             wx.setStorageSync('access_token', token);
        //             wx.setStorageSync('userInfo', userInfo);
        //             // this.getUserPermissions();
        //             console.log(getCache());
        //             getCache().forEach(item => {
        //               ajax(item.url, item.content);
        //             });
        //             setTimeout(() => {
        //               app.globalData.oldToken = token;
        //               abcd = true;
        //             }, 5000);
        //           }
        //         });
        //       }
        //     });
        //   }
        //   return;
        // }
        // 异地登陆或者旧的 token 请求
        // if (data.code === 11004) {
        //   // 回到登陆
        //   wx.reLaunch({
        //     url: '/pages/login/index',
        //   });
        // }
        // 借口请求完毕后弹出缓存队列
        // delCache(url);
        const aaa = [11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11010];
        if (aaa.includes(data.code) && request.url.slice(-5) !== 'login') {
          const pages = getCurrentPages(); //页面对象
          const { route, options } = pages[pages.length - 1];
          let query = '';
          Object.keys(options).forEach((item, index) => {
            query += `${index === 0 ? '?' : '&'}${item}=${options[item]}`;
          });
          wx.setStorageSync('token_page', '/' + route + query);
          wx.reLaunch({
            url: '/pages/login/index',
          });
        }
        showLog &&
          console.log &&
          console.log(
            '[AJAX SUCCESS]',
            statusCode,
            typeof data === 'object' ? data : data.toString().substring(0, 100)
          );
        if (modalLoading && !count) {
          wx.hideLoading();
        }
        // 状态码正常 & 确认有数据
        if (data && +data.code === 200) {
          isFunction(success) && success(Object.assign({ statusCode }, data));
          return;
        }
        // 其他情况，执行错误回调
        failToast &&
          wx.showToast({ title: data.msg || '网络走神了~', icon: 'none' });
        isFunction(fail) && fail(Object.assign({ statusCode }, data));
      },
      fail: ({ error, errorMessage }) => {
        count--;

        if (modalLoading && !count) {
          wx.hideLoading();
        }
        showLog &&
          console.log &&
          console.log('[AJAX FAIL]', error, errorMessage);

        failToast &&
          wx.showToast({ title: errorMessage || '网络走神了~', icon: 'none' });
        isFunction(fail) && fail({ error, errorMessage });
      },
      complete: () => {
        isFunction(complete) && complete();
      },
    })
  );
};


