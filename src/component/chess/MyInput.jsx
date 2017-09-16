import React from 'react';
import { Input, Icon } from 'antd';

class MyInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    onChangeUserName = (e) => {
        this.props.onChange(e.target.value,this.props.iName);
        this.setState({ userName: e.target.value });
    }
    render() {
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <Input
                placeholder=""
                prefix={<Icon type="info-circle" />}
                suffix={suffix}
                value={userName}
                onChange={this.onChangeUserName}
                ref={node => this.userNameInput = node}
            />
        );
    }
}

export default MyInput;