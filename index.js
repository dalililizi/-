
Page({

  
  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function () {

    var APIkey = "ymRc026SzCBailmLqZBEKZJ6yZE=" //oneNET的api
    
    //读取oneNET上数据
    wx.request({
      url: 'https://api.heclouds.com/devices/642915130/datapoints', 
      header: {
        "api-key": "ymRc026SzCBailmLqZBEKZJ6yZE="                     
        //换成自己的api-key
      },
      data: {
        limit: 1
      },
      method: "GET",
      success: (res)=> {
        console.log(`APIKey: ${APIkey}`, res.data)
        //此处打印GET回来的json数据

      
      
        // 利用正则字符串从onenet的返回数据中截出当前床上亮度及人的状况
        try {
          var light = res.data.data.datastreams[0].datapoints[0].value;
          var people = res.data.data.datastreams[1].datapoints[0].value;//一定要仔细看数据名，卡在这个0上好久，最后才发现
        } catch (e) {
          throw new Error(e)
        }
//判断人在不在和睡了没，light的值越大越暗
        if(people==1){
          if (light <1000) {
              
           wx.showModal({

            title: '警报！',
            content: `没有睡觉！！！`
          
           }) }
           else if(light>=1000){ wx.showModal({

            title: '安心吧',
            content: `你的宝贝有好好睡觉哦`

           })};}
         else if(people==0){//同上，用一个函数
            wx.showModal({

              title: '警报！',
              content: `没有睡觉！！！`
  
             })
          }
         
          
          
          
          },


      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
//按钮发挥作用
  change: function (e) {
    

      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  //没啥用，想尝试推送来着，没做出来
  /**
   * 页面的初始数据
   */

  /*sendNew(res){
    var that = this
    var time = util.formatTime(new Date());
    wx.cloud.callFunction({
      name:'getOpenId',
      success(a){
        console.log(a.result.openid)
      }
    }),
    wx.requestSubscribeMessage({
      tmplIds: ['FOpZ2IS3JxLdhvK7uyfNIA_sjXDdDR0rrOCNF28UjoQ'],

      success(res){

        date:{openid:this.e.result.openid}
        wx.cloud.callFunction({
          name:'1',
          data:{
            openid:'e.result.openid',
            title1:'二手物品',
            title2:'二手物品',
            time:time
          },
          success(res){
            console.log('成功',res);
          },
          fail(res){
            console.log('失败',res);
          }
        })
      }
    })
  },*/
  
})



