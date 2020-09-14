import React, {Component} from 'react';
import styles from './rescource/css/login.less';
import {Button, Form, Icon, Input, message, Layout, Alert, location, Col} from 'antd';
import Util from './utils/utils.js'
import jwt_decode from 'jwt-decode'


const {
    Header, Footer, Sider, Content,
} = Layout;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    state = {
        loading: false,
        visible: false,
        message: "",
        userNameBg: "rgba(0,0,0,.25)",
        passwordBg: "rgba(0,0,0,.25)"
    }
    inputUserNameOnFocus = () => {
        this.setState({
            userNameBg: "#7E25FF"
        })
    }
    inputUserNameOnBlur = () => {
        this.setState({
            userNameBg: "rgba(0,0,0,.25)"
        })
    }

    inputPasswordOnFocus = () => {
        this.setState({
            passwordBg: "#7E25FF"
        })
    }
    inputPasswordOnBlur = () => {
        this.setState({
            passwordBg: "rgba(0,0,0,.25)"
        })
    }
    handleSubmit = (e) => {
        this.setState({loading: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Util.post('/login', values, success => {
                    if (success.code == 1) {
                        const decoded = jwt_decode(success.msg)
                        localStorage.setItem('userButtonId',decoded.userButtonId)
                        Util.setCookie("token", success.msg);
                        window.location.href = "/#/index";
                    } else {
                        this.setState({
                            visible: true,
                            message: success.msg
                        })
                    }
                    this.setState({loading: false});
                }, error => {
                    this.setState({
                        visible: true,
                        message: error.msg
                    })
                    this.setState({loading: false});
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.loginForm}
                  style={{margin: '300px auto', marginBottom: '0px'}}>
                <div className={styles.product_title}>体智能</div>
                {this.state.visible ? (
                    <Alert
                        message={this.state.message}
                        type="error"
                        style={{
                            background: '#FFEFF0',
                            height: '30px',
                            fontSize: '12px',
                            color: '#F56C6C',
                            border: 'none',
                            marginBottom: '10px',
                            lineHeight: '15px'
                        }}
                    />) : null}
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入您的域账号!'}],
                    })(
                        <Input onFocus={this.inputUserNameOnFocus} onBlur={this.inputUserNameOnBlur}
                               prefix={<Icon type="user" style={{color: this.state.userNameBg}}/>} placeholder="域账号"
                               name="userName"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入您的密码!'}],
                    })(
                        <Input onFocus={this.inputPasswordOnFocus} onBlur={this.inputPasswordOnBlur}
                               prefix={<Icon type="lock" style={{color: this.state.passwordBg}}/>} type="password"
                               placeholder="请输入您的密码" name="password"/>
                    )}
                </Form.Item>
                <FormItem style={{textAlign: 'right', marginTop: '24px'}}>
                    <Button type="primary" htmlType="submit" style={{padding: '0px 30px'}} loading={this.state.loading}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class App extends Component {
    render() {
        return (
            <Layout style={{height: '100vh'}}>
                {/*<Sider className={styles.left}>
                <img className={styles.logoImage} src={logo}/>
                <img className={styles.bg_svg} src={left}/>
                <div className={styles.title} >流量管理平台</div>
            </Sider>*/}
                <Layout style={{height: '100%', background: '#fff'}}>
                    <Content>
                        <WrappedNormalLoginForm/>
                    </Content>
                    <Footer style={{background: '#fff'}} className={styles.footer}>

                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;