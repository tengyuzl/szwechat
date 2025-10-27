import request from '~/api/request';
import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoad: false,
    endDate: "2030-04-01",
    personalInfo: {
      name: "系统管理员",
      company: "微梦科技",
      detp: "超级管理员",
      role: "测试管理员"
    },
    settingList: [
      { name: '服务器管理', icon: 'service', type: 'service' },
      // { name: '设置', icon: 'setting', type: 'setting', url: '/pages/setting/index' },
    ],
  },

  onLoad() {
  },

  async onShow() {
    const Token = wx.getStorageSync('access_token');
    const personalInfo = await this.getPersonalInfo();

    if (Token) {
      this.setData({
        isLoad: true,
        personalInfo,
      });
    }
  },

  getServiceList() {
  },

  async getPersonalInfo() {
    const info = await request('/api/genPersonalInfo').then((res) => res.data.data);
    return info;
  },

  onLogin(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  onNavigateTo() {
    wx.navigateTo({ url: `/pages/my/info-edit/index` });
  },

  onEleClick(e) {
    const { name, url } = e.currentTarget.dataset.data;
    if (url) return;
    this.onShowToast('#t-toast', name);
  },
});
