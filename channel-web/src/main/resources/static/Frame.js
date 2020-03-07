import React, { Component } from 'react';
import { Layout, Menu, Icon,Dropdown } from 'antd';
import styles from './rescource/css/frame.less';
import './rescource/icon/iconfont.css'
import Util from "./utils/utils";
import MenuContent from './MenuContent'
import TabMenu from './TabMenu'
import logoBgPng from './rescource/image/Logo_bg.png'
import welcome from './rescource/image/welcome.png'

const { Header, Sider, Content } = Layout;




class Frame extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        collapsed: false,
        userName:"",
        src:"",
        title:"",
        imgDisplay:"table",
        itemMenu:(
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)" onClick={this.exit}><Icon type="export" /><span style={{paddingLeft:'8px'}}>退出</span></a>
                </Menu.Item>
            </Menu>
        )
    };}
    toggle = () => {
        let obj = {tgt_event_id:"kraken_close",tgt_name:""};
        if(!this.state.collapsed){
            obj.tgt_name = "章鱼-导航栏位-展开"
        }else{
            obj.tgt_name = "章鱼-导航栏位-收起"
        }
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
     changeStateSrc =(src,title)=>{
       this.setState({src:src,title:title,imgDisplay:"none"},() => {this.child.add()});
   }

   changeImgDisplay = ()=>{
        this.setState({imgDisplay:""})
   }

   tabChangeTitleSrc = (src)=>{
        this.menuChild.changeMenu(src)
   }

    onRef = (ref) =>{
        this.child = ref;
    }
    onMenuRef = (ref) =>{
        this.menuChild = ref;
    }
    componentDidMount(){
         Util.validToken(success =>{
            this.setState({userName:success});
             Util.setCookie("userName",success);
        });

    }

    exit = (e)=> {
        e.preventDefault();
        Util.deleteCookie("token",null);
        window.location.href = "/";
    }

    render() {
        return (
            <Layout  style={{height:'100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsedWidth={0}
                    collapsed={this.state.collapsed}
                    className={styles.nvLeft}
                    width = "220"
                    >
                    <div className={styles.logo} >
                        <img src={logoBgPng} style={{position:'relative',top:'-2px',left:0}}></img>
                    </div>
                    <MenuContent  changeStateSrc = {this.changeStateSrc} onRef={this.onMenuRef} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,height:'80px' }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{marginTop:'10px'}}
                            />
                        <Dropdown overlay={this.state.itemMenu}>
                            <a className={styles.userName + ' '+'ant-dropdown-link'} href="javascript:void(0)"><span>Hello,{this.state.userName}</span> <Icon type="caret-right" />
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{margin: '1px 1px', padding: 20,  height: '90%',background:"#FCFCFC"}}>
                      {/* <iframe  style={{height:'100%',width:'100%',border:'none'}}   src="http://www.baidu.com"></iframe>*/}
                        <div className={styles.imgContent} style={{display:this.state.imgDisplay}}>
                            <div className={styles.imgBox}>
                                {/*<img src = {welcome}></img>*/}
                                <div className={styles.welcome}>{this.state.userName}，体智能管理平台</div>
                            </div>
                        </div>
                        <TabMenu title={this.state.title} src={this.state.src} onRef={this.onRef} tabChangeTitleSrc={this.tabChangeTitleSrc} changeImgDisplay = {this.changeImgDisplay}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default  Frame;
