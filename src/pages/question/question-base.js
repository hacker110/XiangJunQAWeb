/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-07 00:11:25
 */
// @flow
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

class QuestionBase extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      selectedTab: 'redTab',
      hidden: false
    };
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab'
              });
            }}
            data-seed="logId"
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab'
              });
            }}
            data-seed="logId1"
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab'
              });
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'
            }}
            selectedIcon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
            }}
            title="My"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab'
              });
            }}
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default QuestionBase;
