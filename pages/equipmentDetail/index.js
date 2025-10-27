import Message from 'tdesign-miniprogram/message';
import request from '~/api/request';

// 获取应用实例
// const app = getApp()

Page({
  data: {
    isLoad: false,
    service: [
      {
        title: "model9",
        description: "tb724173767991373"
      },
      {
        title: "model10",
        description: "tb724173767991374"
      },
      {
        title: "model11",
        description: "tb724173767991375"
      },
      {
        title: "model11",
        description: "tb724173767991375"
      },
      {
        title: "model11",
        description: "tb724173767991375"
      },
      {
        title: "model11",
        description: "tb724173767991375"
      },
      {
        title: "model11",
        description: "tb724173767991375"
      }
    ],
    personalInfo: {
      name: "测试公司名称",
      city: "测试公司地址",
      image: ""
    }
  },
  // 生命周期
  async onReady() {
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    this.setData({
      cardInfo: cardRes.data,
      focusCardInfo: cardRes.data.slice(0, 3),
      swiperList: swiperRes.data,
    });
  },
  onLoad(option) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    if (option.oper) {
      let content = '';
      if (option.oper === 'release') {
        content = '发布成功';
      } else if (option.oper === 'save') {
        content = '保存成功';
      }
      this.showOperMsg(content);
    }
  },
  onRefresh() {
    this.refresh();
  },
  onBack() {
    console.log(111);
    // wx.navigateBack();
    wx.switchTab({ url: `/pages/home/index` })
  },
  /** 打开对话页 */
  toDeatil(event) {
    const { userId } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/chat/index?userId${userId}` }).then(({ eventChannel }) => {
      currentUser = { userId, eventChannel };
      const { user } = this.getUserById(userId);
      eventChannel.emit('update', user);
    });
    this.setMessagesRead(userId);
  },
  async refresh() {
    this.setData({
      enable: true,
    });
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    setTimeout(() => {
      this.setData({
        enable: false,
        cardInfo: cardRes.data,
        swiperList: swiperRes.data,
      });
    }, 1500);
  },
  showOperMsg(content) {
    Message.success({
      context: this,
      offset: [120, 32],
      duration: 4000,
      content,
    });
  },
  goRelease() {
    wx.navigateTo({
      url: '/pages/release/index',
    });
  },
});
