import React, {Component} from 'react';
import {Tree, Icon, Input, Row, Col, Select, Button, Popconfirm, Modal} from 'antd';
import styles from '../rescource/css/EditableTree.less';
import commonUtil from "../utils/utils";
import {Form, message} from "antd/lib/index";
import Util from "../utils/utils";
import {
    FolderOutlined,
    FilterOutlined
} from '@ant-design/icons';

const {TreeNode} = Tree;

class AddEditForm extends Component {

    componentDidMount() {
        this.props.onRef(this)
        const {setFieldsValue} = this.props.form;
        const editValue = this.props.editValue;
        if (editValue) {
            const {showText, sort, url, id, status, type, buttonId} = editValue;
            setFieldsValue({buttonId, showText, sort, url, id, status, type});
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 18},
                sm: {span: 5}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14}
            }
        };
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <Form {...formItemLayout}>
                <Row gutter={24}>
                    <Form.Item style={{display: 'none'}}>
                        {getFieldDecorator('id')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="名称">
                        {getFieldDecorator('showText', {
                            rules: [{required: true, message: '请输入名称'}],
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="类型">
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: '请选择类型'}], initialValue: "1"
                        })(
                            <Select>
                                <Option value="1">菜单</Option>
                                <Option value="2">按钮</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="按钮唯一键">
                        {getFieldDecorator('buttonId', {
                            rules: [{
                                required: getFieldValue("type") == "2" ? true : false,
                                message: '请输入按钮唯一键'
                            }]
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    {
                        getFieldValue("type") == "1" ? (
                            <Form.Item label="URL">
                                {getFieldDecorator('url', {
                                    rules: [{required: getFieldValue("type") == "1" ? true : false, message: '请输入URL'}]
                                })(
                                    <Input style={{width: '100%'}} autoComplete="off"/>
                                )}
                            </Form.Item>
                        ) : ''
                    }
                    <Form.Item label="排序">
                        {getFieldDecorator('sort', {
                            rules: [{message: '请输入排序'}],
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="是否启用">
                        {getFieldDecorator('status', {
                            rules: [{required: true}],
                            initialValue: "1",
                        })(
                            <Select>
                                <Option value="1">启用</Option>
                                <Option value="0">禁用</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Row>
            </Form>
        );
    }
}

const WrappedAddEditForm = Form.create()(AddEditForm);

class EditableTree extends Component {
    data = [
        {
            value: 'Root',
            defaultValue: 'Root',
            key: 0,
            parentKey: -1,
            isEditable: false,
            url: '',
            children: [],
            type: '',
        }
    ];
    state = {
        expandedKeys: [],
        data: this.data,
        editValue: '',
        autoExpandParent: true,
        newKey: Util.getGuid(),
        visible: false,
        parentId: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getAllMenu();
    }

    getAllMenu = () => {
        commonUtil.getOld("/menu/getAllMenu", {}, success => {
            if (success.code == "1") {
                this.data[0].children = success.data;
                this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
                commonUtil.getOld("/menu/getAllMenuId", {}, success => {
                    if (success.code == "1") {
                        let myArray = [0]
                        myArray = success.data;
                        myArray.push("0");
                        this.setState({"expandedKeys": myArray});
                    } else {
                    }
                }, error => {
                })
            } else {

            }
        }, error => {
        })
    }

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        //this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }
    confirm = (id) => {
        const data = {menuId: id}
        Util.postOld('/menu/delMenu', data, success => {
            if (success.code == 1) {
                message.success("删除成功");
                this.onDelete(id);
            } else {
                message.error("删除失败");
            }
        }, error => {
            message.error("删除失败");
        });
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.isEditable) {
            item.title = (
                <div>
                    <input
                        className={styles.inputField}
                        value={item.value}
                        onChange={(e) => this.onChange(e, item.key)}/>
                    <Icon type='close' style={{marginLeft: 10}}
                          onClick={() => this.onClose(item.key, item.defaultValue)}/>
                    <Icon type='check' style={{marginLeft: 10}}
                          onClick={() => this.onSave(item.key)}/>
                </div>
            );
        } else {
            item.title = (
                <div className={styles.titleContainer}>
                    <span>
                        {item.type == 1 ? <FolderOutlined/> : <FilterOutlined/>}&nbsp;{item.value}
                    </span>
                    <span className={styles.operationField}>
                        <Icon style={{marginLeft: 10}} type='edit'
                              onClick={() => this.onEdit(item)}/>
                        <Icon style={{marginLeft: 10}} type='plus'
                              onClick={() => this.onAdd(item.key)}/>
                        {item.parentKey === '0' ? null : (
                            <Popconfirm title="确认删除？" okText="确认" cancelText="取消"
                                        onConfirm={this.confirm.bind(this, item.key)}>
                                <Icon style={{marginLeft: 10}} type='minus'/>
                            </Popconfirm>
                        )}
                    </span>
                </div>
            )
        }

        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }

        return <TreeNode {...item} />;
    })

    onAdd = (e) => {
        this.setState({
            visible: true,
            title: "新增",
            editValue: null,
            newKey: Util.getGuid(),
            parentId: e
        });
    }

    addNode = (parentKey, data, key) => data.map((item) => {
        if (item.key === parentKey) {
            if (item.children) {
                item.children.push({
                    value: item.showText,
                    defaultValue: item.showText,
                    key: key, // 这个 key 应该是唯一的。 Tip: The key should be unique
                    parentKey: parentKey,
                    isEditable: false,
                    showText: item.showText,
                    status: '1',
                    id: key,
                    parentId: parentKey
                });
            } else {
                item.children = [];
                item.children.push({
                    value: item.showText,
                    defaultValue: item.showText,
                    key: key,
                    parentKey: parentKey,
                    isEditable: false,
                    showText: item.showText,
                    status: '1',
                    id: key,
                    parentId: parentKey
                });
            }
            return;
        }
        if (item.children) {
            this.addNode(parentKey, item.children, key)
        }
    })

    onDelete = (key) => {
        console.log('delete');
        //删除数据库
        this.deleteNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    deleteNode = (key, data) => data.map((item, index) => {
        if (item.key === key) {
            data.splice(index, 1);
            return;
        } else {
            if (item.children) {
                this.deleteNode(key, item.children)
            }
        }
    })

    onEdit = (item) => {
        this.setState({
            visible: true,
            title: "修改",
            editValue: item,
            newKey: Util.getGuid(),
        });
        console.log(item)
        /*console.log('edit');
        this.child.setMenuData1(item);*/
    }

    editNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.isEditable = true;
        } else {
            item.isEditable = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
        if (item.children) {
            this.editNode(key, item.children)
        }
    })

    onClose = (key, defaultValue) => {
        console.log('close');
        this.closeNode(key, defaultValue, this.data);
        this.setState({
            data: this.data
        });
    }

    closeNode = (key, defaultValue, data) => data.map((item) => {
        item.isEditable = false;
        if (item.key === key) {
            item.value = defaultValue;
        }
        if (item.children) {
            this.closeNode(key, defaultValue, item.children)
        }
    })

    onSave = (key) => {
        console.log('save')
        this.saveNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    saveNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.defaultValue = item.value;
        }
        if (item.children) {
            this.saveNode(key, item.children)
        }
        item.isEditable = false;
    })

    onChange = (e, key) => {
        console.log('onchange')
        this.changeNode(key, e.target.value, this.data);
        this.setState({
            data: this.data
        });
    }

    changeNode = (key, value, data) => data.map((item) => {
        if (item.key === key) {
            item.value = value;
        }
        if (item.children) {
            this.changeNode(key, value, item.children)
        }
    })
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        let parentId = this.state.parentId;
        this.refs.getFormVlaue.validateFields((err, values) => {
            if (!err) {
                let id = values["id"]
                if (id) {
                    Util.post('/menu/updateMenu', values,
                        success => {
                            if (success.code == 1) {
                                message.success("更新成功");
                                this.getAllMenu();
                                this.handleCancel();
                            } else {
                                message.error(error.msg);
                            }
                        }, error => {
                            message.error(error.msg);
                        });
                } else {
                    values["parentId"] = parentId;
                    commonUtil.post('/menu/saveMenu', values, success => {
                        if (success.code == 1) {
                            // 防止expandedKeys重复
                            // Tip: Must have, expandedKeys should not be reduplicative
                            if (this.state.expandedKeys.indexOf(parentId) === -1) {
                                this.state.expandedKeys.push(parentId);
                            }
                            console.log("id:" + success.data);
                            //this.data[0].showText = values["showText"];
                            //this.addNode(parentId, this.data, success.data);
                            this.getAllMenu();
                            this.setState({
                                data: this.data
                            });
                            this.handleCancel();
                        } else {
                            message.error("新增失败");
                        }
                    }, error => {
                        message.error("新增失败");
                    });
                }
            }
        })
    }

    render() {
        return (
            <div style={{marginLeft: '1%', marginTop: '0.5%'}}>
                <Modal key={this.state.newKey} title={this.state.title}
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <WrappedAddEditForm ref="getFormVlaue" onRef={(ref) => {
                        this.child = ref
                    }} getAllMenu={this.getAllMenu} editValue={this.state.editValue}/>
                </Modal>
                <Row>
                    <Col span={8}>
                        <div>
                            <Tree expandedKeys={this.state.expandedKeys} selectedKeys={[]} onExpand={this.onExpand}>
                                {this.renderTreeNodes(this.state.data)}
                            </Tree>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditableTree;