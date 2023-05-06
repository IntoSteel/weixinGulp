import { ajax } from './util';

const api = {
  user: {
    login: (option) =>
      ajax('api/app/wx/user/login', { ...option, method: 'POST' }),
    logout: (option) =>
      ajax('api/app/wx/user/logout', { ...option,method: 'POST'  }),// 暂时清除用户的openid，用户切换账号登录
    
  },
  permission: {
    getUserPermissions: (option) =>
      ajax('api/app/wx/user/getUserPermissions', { ...option }), 
  },
};
export default api;
