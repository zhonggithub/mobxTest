/**
* @Author: Zz
* @Date:   2016-09-14T19:25:42+08:00
* @Email:  quitjie@gmail.com
* @Last modified by:   Zz
* @Last modified time: 2016-10-08T23:30:28+08:00
*/
import React from 'react';
import { Modal, } from 'antd';
import { ZSideNavigation, ZIcon, } from '../components';
import { appStore, groupStore } from '../common';

const g_defIconLargenSize = '24px';
const g_defItemIconLargenSize = "21px";
const g_pageMenuDef = [{
    key: 'moblie-preview',
    text: '手机预览',
    defIcon: <ZIcon iconfont='&#xe638;' />,
    defIconLargen: <ZIcon iconfont='&#xe638;' size={g_defIconLargenSize} marginRight='0px' />,
  },{
     to: '/group/groupmgr/info',
     text: '集团信息',
     defIcon: <ZIcon iconfont='&#xe621;' />,
     defIconLargen: <ZIcon iconfont='&#xe621;' size={g_defIconLargenSize} marginRight='0px' />,
     items: [{
       to: '/group/groupmgr/info/base',
       text: '基础信息',
       defIcon: <ZIcon iconfont='&#xe7cc;' />,
       //defIconLargen: <ZIcon iconfont='&#xe7cc;' size={g_defItemIconLargenSize} />,
     },{
       to: '/group/groupmgr/info/style',
       text: '页面设置',
       defIcon: <ZIcon iconfont='&#xe62d;' />,
       //defIconLargen: <ZIcon iconfont='&#xe62d;' size={g_defItemIconLargenSize} />,
     }
     ,{
       to: '/group/groupmgr/info/templatemsg',
       text: '模版消息',
       defIcon: <ZIcon iconfont='&#xe650;' />,
       //defIconLargen: <ZIcon iconfont='&#xe650;' size={g_defItemIconLargenSize} />,
     }]
   },{
     to: '/group/groupmgr/order',
     text: '订单管理',
     defIcon: <ZIcon iconfont='&#xe62f;' />,
     defIconLargen: <ZIcon iconfont='&#xe62f;' size={g_defIconLargenSize} marginRight='0px' />,
     items: [
    //    {
    //    to: '/group/groupmgr/order/count',
    //    text: '订单数据统计',
    //    defIcon: <ZIcon iconfont='&#xe61f;' /> ,
    //    //defIconLargen: <ZIcon iconfont='&#xe61f;' size={g_defItemIconLargenSize} />,
    //  },
     {
       to: '/group/groupmgr/order/unchecked',
       text: '查看待确定订单',
       defIcon: <ZIcon iconfont='&#xe634;' />,
       //icon: 'bars',
     },{
       to: '/group/groupmgr/order/pending',
       text: '查看待处理订单',
       defIcon: <ZIcon iconfont='&#xe634;' />,
       //icon: 'bars',
     },{
       to: '/group/groupmgr/order/invalid',
       text: '查看无效订单',
       //icon: 'bars',
       defIcon: <ZIcon iconfont='&#xe634;' />,
     }]
   },
   {
     to: '/group/groupmgr/evaluate',
     text: '点评管理',
     defIcon: <ZIcon iconfont='&#xe630;' />,
     defIconLargen: <ZIcon iconfont='&#xe630;' size={g_defIconLargenSize} marginRight='0px' />,
     items: [{
       to: '/group/groupmgr/evaluate/count',
       text: '点评数据统计',
       defIcon: <ZIcon iconfont='&#xe61f;' />,
       //defIconLargen: <ZIcon iconfont='&#xe61f;' size={g_defItemIconLargenSize} />,
     },{
       to: '/group/dockingplatform/crs/hotelmanager',
       text: '查看酒店点评',
       //icon: 'bars',
       defIcon: <ZIcon iconfont='&#xe634;' />,
     }]
   }
 ];

export default class GroupSideNavigatio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      current: [g_pageMenuDef[1].items[0].to],
      defaultOpenKeys : [g_pageMenuDef[1].to],//g_pageMenuDef.map( item => {return item.to;})
    };
  }

  componentWillMount(){
    const localHref = window.location.href;
    if(!localHref)
      return;
    for(let item of g_pageMenuDef) {
      if(!item.items)
        continue;
      for( let subItem of item.items) {
        if(localHref.indexOf(subItem.to) !== -1) {
          this.setState({ current: [subItem.to] });
          return;
        }
      }
    }
  }

  // componentDidMount() {
  //   // 获取集团信息
  //   groupStore.groupRetrieve(appStore.payload.t).then(res => {
  //     groupStore.group = res.data;
  //   }).catch(err => {
  //     this.state.message = err.message;
  //   })
  // }

  onSelect = (info) => {
    this.setState({ current: [info.key] })
  }

  onMenuClick = (item, key, keyPath) => {
    switch(item.key) {
      case 'moblie-preview': {
        this.setState({
          previewVisible: true,
          previewImage: `/group/api/createqrcode?text=${encodeURIComponent(groupStore.group.url)}`,
        });
      }break;
    }
  }

  handlePreviewCancel = () => {
    this.setState({ previewVisible: false });
  }

  render() {
    return (
      <div>
        <ZSideNavigation
          menus={g_pageMenuDef}
          collapse={this.props.collapse}
          defaultOpenKeys={this.state.defaultOpenKeys}
          defaultSelectedKeys={this.state.current}
          selectedKeys={this.state.current}
          onSelect={ this.onSelect }
          onClick={ this.onMenuClick }
          />
        <Modal
          title="手机扫描预览"
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handlePreviewCancel}
          width="580px"
          style={{textAlign: 'center'}}
         >
           <img alt="example"
             style={{maxWidth: '420px', maxHeight: '420px'}}
             src={this.state.previewImage} />
        </Modal>
      </div>
    )
  }
}
