import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import { ZTable } from '../components';
import { testStore } from '../stores';

@observer
export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      columns : [{
        title: 'id',
        dataIndex: 'id',
        className: 'table-column-hidden',
      },{
        title: '名称',
        dataIndex: 'name',
        className: 'table-column-left',
      },{
        title: '电话号码',
        dataIndex: 'tel',
        className: 'table-column-center',
      }],
      pagination : {
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal (total) {
          return `共 ${total} 条`;
        }
      },
      data: []
    }
  }

  componentDidMount() {
    //testStore.pagination = this.state.pagination;
    this.fetch();
  }

  fetch(params={}) {
    testStore.fetchData().then(ret => {
      testStore.data = ret.data.items;
      this.setState({ data: ret.data.items });
      console.log(ret.data.items);
      console.log(typeof testStore.data, typeof ret.data.items, typeof this.state.data);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return <ZTable
      bordered
      //disableLeftTitle
      //disableColumnMenu
      //disableSearchInput
      size="small"
      rowKey={record => record.id}
      columns={ this.state.columns }
      loading={ this.state.loading }
      dataSource={ testStore.data.slice() }
      //dataSource={ this.state.data }
      pagination={ this.state.pagination }
    />
  }
}