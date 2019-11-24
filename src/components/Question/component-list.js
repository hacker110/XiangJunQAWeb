/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-24 22:13:14
 */
// @flow
/* eslint no-dupe-keys: 0 */
import React, { Component } from "react";

import { findDOMNode } from "react-dom";
import { ListView } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import QuestionItem from "./question-item";

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const data = [
  {
    img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    subject_title: "Meet hotel",
    content: "不是所有的兼职汪都需要风吹日晒"
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
    subject_title: "McDonald's invites you",
    content: "不是所有的兼职汪都需要风吹日晒"
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
    subject_title: "Eat the week",
    content: "不是所有的兼职汪都需要风吹日晒"
  }
];
const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;

const pages = 4;

const dataBlobs = {};
let rowIDs = [];

class ComponentList extends Component {
  constructor(props) {
    super(props);
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
    this.getData();
  }

  componentDidMount() {
    const hei =
      document.documentElement.clientHeight -
      findDOMNode(this.lv).parentNode.offsetTop;

    setTimeout(() => {
      // simulate initial Ajax
      this.genData();
      console.log(rowIDs);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
        isLoading: false,
        height: hei
      });
    }, 1000);
  }

  onEndReached = event => {
    console.log(pageIndex);
    if (pageIndex === 2) {
      return;
    }
    if (this.state.isLoading) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
        isLoading: false
      });
    }, 1000);
  };
  genData(pIndex = 0) {
    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `${pageIndex}-R${jj}`;
      rowIDs.push(rowName);
      dataBlobs[rowName] = rowName;
    }
    rowIDs = [...rowIDs];
  }

  getData() {
    post(QUESTION.GET_NEW_QUESTION, { currentPage: 1, pageSize: 30 }).then(
      e => {
        console.log(e.data.rows);
        this.setState(
          {
            data: e.data.rows
          },
          () => {}
        );
      }
    );
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
      const obj = data[index++];
      return (
        <div key={rowID} style={{ padding: "0 15px" }}>
          <QuestionItem key={index} data={obj} />
        </div>
      );
    };

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "Loaded"}
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
