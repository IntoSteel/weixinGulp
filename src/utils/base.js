const base = {
  /**
   * [isXXX 基础方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isUndefined(item) {
    return typeof item === 'undefined';
  },
  isDefined(item) {
    return !base.isUndefined(item);
  },
  isString(item) {
    return typeof item === 'string';
  },
  isNumber(item) {
    return typeof item === 'number';
  },
  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
  },
  isObject(item) {
    return item && typeof item === 'object' && !base.isArray(item);
  },
  isFunction(item) {
    return typeof item === 'function';
  },
  isBoolean(item) {
    return typeof item === 'boolean';
  },

  /**
   * [公共方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  noop() {
    return null;
  },

  /**
   * [getXXX 增强方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  getString(item, defaultStr) {
    if (base.isString(item)) return item.trim();
    if (base.isNumber(item)) return `${item}`.trim();
    return defaultStr || '';
  },

  /**
   * [自定义导航方法]
   * @param  {...[type]} arg [description]
   * @return {[type]}        [description]
   */
  _navigateTo(obj) {
    const len = getCurrentPages().length;
    if (len >= 10) {
      /* eslint-disable */
      console.warn('[getCurrentPages] length: ', len, '. navigateTo -> redirectTo');
      /* eslint-enable */
      wx.redirectTo(obj);
    } else {
      wx.navigateTo(obj);
    }
  }
};

export default base;
