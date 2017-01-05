import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import { ZTable } from '../components';

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
    }
  }

  componentDidMount() {
    const data = [];
    const total = 160;
    for (let i = 0; i < total; i += 1) {
      data.push({
        key: Math.random(),
        id: Math.random(),
        name: `${Math.random()}test${i}`,
        tel: `${Math.random()}`
      });
    }
    const pagination = this.state.pagination;
    pagination.total = total;
    this.setState({ data, pagination });
  }

  render() {
    return <ZTable
      bordered
      disableLeftTitle
      disableColumnMenu
      size="small"
      columns={ this.state.columns }
      loading={ this.state.loading }
      dataSource={ this.props.data }
      pagination={ this.state.pagination }
    />
  }
}