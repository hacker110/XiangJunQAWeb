/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-07 18:06:36
 */
// @flow
/* eslint no-dupe-keys: 0 */
import React, { Component } from "react";

import { findDOMNode } from "react-dom";
import { ListView } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import QuestionItemCommon from "./question-item-common";

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
    const hei =
      document.documentElement.clientHeight -
      findDOMNode(this.lv).parentNode.offsetTop;
    console.log(findDOMNode(this.lv).parentNode.offsetTop);
    this.setState({ height: hei });
    this.dealData();
  }
  componentWillUnmount() {
    console.log("B00000000");
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
    const data = await this.getData(pageIndex);
    tempData = data.concat(tempData);
    this.setState({ data }, () => {
      for (let jj = 0; jj < data.length; jj++) {
        const rowName = `${pageIndex}-R${jj}`;
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
  }

  getData(pageIndex) {
    return new Promise(resolve => {
      post(QUESTION.GET_NEW_QUESTION, {
        currentPage: pageIndex,
        pageSize: 6
      }).then(res => {
        totalPage = res.data.totalPage;
        resolve(res.data.rows);
      });
    });
  }

  render() {
    const { data } = this.state;
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
    console.log(data);
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = 0;
      }
      console.log(index);
      const obj = tempData[index++];
      return (
        <QuestionItemCommon key={rowID} key={index} index={index} data={obj} />
      );
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
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(" ")[1]}`}</div>
        // )}
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
