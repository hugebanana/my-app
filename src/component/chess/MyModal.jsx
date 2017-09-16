import React from 'react';
import {Modal} from 'antd';
import MyInput from "./MyInput";


class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.comment = {
            name: '',
            word: '',
            winFlag:false
        }
    }

    winFlag = () => {
        this.comment.winFlag = true;
    }

    changeData = (name, type) => {
        this.comment[type] = name;
    }

    state = {
        ModalText: 'Content of the modal',
        visible: false,
    }
    showModal = (changeState) => {
        this.setState({
            visible: true,
        });
        this.changeState = changeState;
    }
    handleOk = () => {
        // console.log(this.comment);
        fetch('http://localhost:8081/chess/comment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.comment)
        })
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.changeState();
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.changeState();
        this.setState({
            visible: false,
        });
    }

    render() {
        const {visible, confirmLoading, ModalText} = this.state;
        return (
            <div>
                <Modal title="请留下您宝贵的评论！！！"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <p>Name</p>
                    <MyInput onChange={this.changeData} iName={'name'}/>
                    <p>Message</p>
                    <MyInput onChange={this.changeData} iName={'word'}/>
                </Modal>
            </div>
        );
    }
}

export default MyModal;