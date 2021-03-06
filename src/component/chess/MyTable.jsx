import React from 'react';
import {Table} from 'antd';
import reqwest from 'reqwest';

class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.dataSource};
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Word',
            dataIndex: 'word',
            key: 'word'
        }]
    }

    fetch = () => {
        reqwest({
            url: 'http://localhost:8081/chess/findAllComments?flag=true',
            method: 'get',
            type: 'json',
        }).then((data) => {
            this.setState({
                data: data
            });
        });
    }

    componentWillUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        this.fetch();
    }

    onChange = () => {
        this.fetch();
    }

    render() {
        return (
            <Table columns={this.columns} dataSource={this.state.data} pagination={false}>
                console.log(this.data)
            </Table>
        )
    }
}

export default MyTable;