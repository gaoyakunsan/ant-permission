import React, { Component } from 'react';
import { Menu, Icon,message } from 'antd';
import styles from './rescource/css/menuContent.less'
import './rescource/icon/iconfont.css'
import Util from "./utils/utils";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class MenuContent extends React.Component {

    constructor (props) {
        super(props);
    }
    rootSubmenuKeys = [];

    componentDidMount() {
        this.props.onRef(this);
        Util.postOld('/user/getMenu', '', success => {
            if(success.code == 1){
                //const list = this.renderMenu(success.data);
                let openKeys = [];
                success.data.forEach((data,i)=>{
                    openKeys.push(data.text);
                })
                this.setState({
                    data:success.data,
                    openKeys:openKeys
                })
            }else{
                message.error(success.msg);
            }
        }, error => {
            message.error(error.msg);
        });


    }

    //使用递归
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children && item.children.length>0) {
                return (
                    <SubMenu  key={item.text} className={styles.parentMenu} title={<span><span  className= {item.icon} style={{color:(item.text == this.state.currentKey?'#FFBD00':'#5B627A')}}></span ><span>{item.text}</span></span>}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <MenuItem key={item.url} className={styles.childMenu}>
                        {item.text}
                    </MenuItem>
                )
            }
        })
    };

    state = {
        currentKey:null,
        openKeys: [],
        selectedKeys:[],
        data:[],
        items:[]
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    onClick =(item)=>{
        let items = new Array();
        this.state.items.forEach((current,i)=>{
            items.push(current);
        })
        items.push(item);
        this.setState({items:items})
        const currentKey = item.keyPath[item.keyPath.length-1];
        this.setState({currentKey:currentKey});
        if(item.key.indexOf("rendertoken.html")>0){
            Util.post('/getToken',null,success=>{
                this.props.changeStateSrc(item.key+"?token="+success.data,item.item.props.children)
                item.key = item.key+"?token="+success.data;
            },error=>{
                message.error("获取token失败");
            })
        }else{
            this.props.changeStateSrc(item.key,item.item.props.children)
        }
    }

    onSelect = (item)=>{
        this.setState({selectedKeys:item.selectedKeys})
    }

    changeMenu = (selectKeys) =>{
        this.state.items.forEach((item,i)=>{
            if(item.key == selectKeys){
                this.setState({currentKey:item.keyPath[1]})
            }
        })
        if(selectKeys.indexOf("rendertoken.html")>0){
            this.setState({selectedKeys:[selectKeys.substr(0,selectKeys.lastIndexOf("?"))]})
        }else{
            this.setState({selectedKeys:[selectKeys]})
        }
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys = {this.state.selectedKeys}
                onOpenChange={this.onOpenChange}
                onClick={this.onClick}
                style={{ width: '100%' }}
                onSelect={this.onSelect}
            >
                {this.renderMenu(this.state.data)}
            </Menu>
        );
    }
}
export default  MenuContent;