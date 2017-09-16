import React from 'react';
import {Table} from 'antd';

class MyTable extends React.Component{
    constructor(props){
        super(props);
        this.data = [{
            name:'GM',
            word:'Hello'
        }]
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },{
            title: 'Word',
            dataIndex: 'word',
            key: 'word'
        }]

        }

    render(){
        return (
            <Table columns={this.columns} dataSource={this.data}/>
        )
    }
}

export default MyTable;