/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-08 09:19:26
 */
// @flow
/* eslint no-dupe-keys: 0 */
import React, { Component } from "react";

import { findDOMNode } from "react-dom";
import { ListView } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import QuestionItemSelf from "./question-item-self";

const UrlList = {
  1: QUESTION.GET_QUESTION_BY_UID, // 问题
  2: QUESTION.GET_QUESTION_BY_UID, // 分享
  3: QUESTION.GET_COLLECTION_QUESTION // 收藏
};

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const dataBlobs = {};
let pageIndex = 1;
let totalPage = 1;
let tempData = [];
let rowIDs = [];

class ComponentList extends Component {
  constructor(props) {
    super(props);
    tempData = [];
    rowIDs = [];
    totalPage = 1;
    pageIndex = 1;
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      data: [],
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4
    };
  }

  componentDidMount() {
    const hei = findDOMNode(this.lv).parentNode.clientHeight;
    console.log(hei)
    // document.documentElement.clientHeight -
    // findDOMNode(this.lv).parentNode.offsetTop;
    console.log(findDOMNode(this.lv).parentNode.clientHeight);
    this.setState({ height: hei });
    this.dealData();
  }

  onEndReached = event => {
    console.log(pageIndex);
    if (pageIndex >= totalPage) {
      return;
    }
    ++pageIndex;
    if (this.state.isLoading) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    this.dealData(pageIndex);
  };
  async dealData(pageIndex = 1) {
    try {
      const data = await this.getData(pageIndex);
      const { cate } = this.props;
      tempData = data.concat(tempData);
      this.setState({ data }, () => {
        for (let jj = 0; jj < data.length; jj++) {
          const rowName = `${pageIndex}-T${cate}-M${jj}`;
          rowIDs.push(rowName);
          dataBlobs[rowName] = rowName;
        }
        rowIDs = [...rowIDs];
        console.log(rowIDs);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
          isLoading: false
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  getData(pageIndex) {
    const { cate } = this.props;
    return new Promise(resolve => {
      post(UrlList[cate], {
        currentPage: pageIndex,
        pageSize: 6,
        user_id: 1
      })
        .then(res => {
          totalPage = res.data.totalPage;
          resolve(res.data.rows);
        })
        .catch(e => {
          console.log(e);
          this.setState({
            isLoading: false
          });
        });
    });
  }
  render() {
    // const { data } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED"
        }}
      />
    );
    // console.log(data);
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = 0;
      }
      console.log(index);
      const obj = tempData[index++];
      return <QuestionItemSelf key={rowID} data={obj} />;
    };

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 10, textAlign: "center" }}>
            {this.state.isLoading ? "加载中..." : "没有更多了"}
          </div>
        )}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: "auto"
        }}
        pageSize={10}
        onScroll={() => {
          console.log("scroll");
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={20}
      />
    );
  }
}

export default ComponentList;
