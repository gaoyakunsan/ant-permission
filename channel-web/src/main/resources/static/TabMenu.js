import React, { Component } from 'react';
import { Tabs } from 'antd';
import './common.less'

const TabPane = Tabs.TabPane;

class TabMenu extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
        ];
        this.state = {
            activeKey: '',
            panes,
            activeTitle:'',
            activeSrc:'',
            display:'none'
        };
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
        this.state.panes.forEach((pane, i) => {
            if (pane.key == activeKey) {
                this.props.tabChangeTitleSrc(pane.content.props.src)
            }
        });
    }

    menuChange = (title) =>{
        this.state.panes.forEach((pane, i) => {
            if (pane.title == title) {
                this.setState({ activeKey:pane.key});
            }
        });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
           let flag = true;
            this.state.panes.forEach((pane, i) => {
                if (pane.title == this.props.title) {
                    flag = false;
                }
            });
            if(flag){
                const panes = this.state.panes;
                const activeKey = `newTab${this.newTabIndex++}`;
                panes.push({ title: this.props.title , content: <iframe  style={{height:'100%',width:'100%',border:'none'}}   src= {this.props.src}></iframe>, key: activeKey });
                this.setState({ panes, activeKey,display:'' });
           }else{
                this.menuChange(this.props.title);
            }
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
        if(panes.length == 0){
            this.setState({ panes, activeKey,display:'none' });
            this.props.changeImgDisplay();
        }
    }

    render() {
        return (
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                style={{display:this.state.display}}
            >
                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}
export  default TabMenu;