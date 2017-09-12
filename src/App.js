import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Router, Route, hashHistory} from 'react-router';
import Main from './component/content/Main';
import Article from './component/content/Article';

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        this.history = hashHistory;
        this.state = {times : 0};
    }

    addTimes = () =>{
        this.setState({times:this.state.times++});
    }

    lip = (ite) => {
        // console.log(ite);
        this.history.push(ite.key);
    }

    render() {
        return (
            <Layout>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">百战练磨</Menu.Item>
                </Menu>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '12px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: '#ffffff'}}>
                        <Sider width={200} style={{background: '#ffffff'}}>
                            <Menu
                                onClick={this.lip}
                                mode="inline"
                                style={{height: '100%'}}
                                theme="light"
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user"/>Demo</span>}>
                                    <Menu.Item key="chess">chess</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="user"/>Article</span>}>
                                    <Menu.Item key="title">title</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Router history={hashHistory}>
                            <Route path="chess/:addTimes" component={Main}/>
                            <Route path="title" component={Article}/>
                        </Router>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}

export default App;
