import React, {Component} from 'react';
import {Tree, Icon, Input, Row, Col, Select, Button, Popconfirm} from 'antd';
import styles from '../rescource/css/EditableTree.less';
import commonUtil from "../utils/utils";
import {Form, message} from "antd/lib/index";
import Util from "../utils/utils";

const {TreeNode} = Tree;

class AddEditForm extends Component {


    componentDidMount() {
        this.props.onRef(this)
    }

    setMenuData1 = (value) => {
        console.log(6666);
        const {setFieldsValue} = this.props.form;
        console.log(value);
        if (value) {
            const {showText, sort, url, id, status} = value;
            if ("1" == status) {
                setFieldsValue({"status": "启用"})
            } else {
                setFieldsValue({"status": "禁用"})
            }
            setFieldsValue({showText, sort, url, id});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Util.post('/menu/updateMenu', values,
                    success => {
                        if (success.code == 1) {
                            message.success("更新菜单成功");
                            this.props.getAllMenu();
                        } else {
                            message.error(error.msg);
                        }
                    }, error => {
                        message.error(error.msg);
                    });
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14}
            }
        };
        const {getFieldDecorator, setFieldsValue} = this.props.form;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Form.Item style={{display: 'none'}}>
                        {getFieldDecorator('id')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="菜单名称">
                        {getFieldDecorator('showText', {
                            rules: [{required: true, message: '请输入菜单名称'}],
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="URL">
                        {getFieldDecorator('url')(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="排序">
                        {getFieldDecorator('sort', {
                            rules: [{required: true, message: '请输入排序'}],
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
                    <Form.Item>
                        <Button style={{marginLeft: 380}} type="primary" htmlType="submit">
                            保存
                        </Button>
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
            children: []
        }
    ];
    state = {
        expandedKeys: [],
        data: this.data,
        editValue: '',
        autoExpandParent: true,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getAllMenu();
        // Tip: Must have, or the parent node will not expand automatically when you first add a child node
        console.log(this.data);
    }

    getAllMenu = () => {
        commonUtil.getOld("/menu/getAllMenu", {}, success => {
            if (success.code == "1") {
                this.data[0].children = success.data;
                this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
                commonUtil.getOld("/menu/getAllMenuId", {}, success => {
                    if (success.code == "1") {
                        let myArray=[0]
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
                        {item.value}
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
        console.log('add');
        console.log(e);
        //后台保存数据
        commonUtil.post('/menu/saveMenu', {"parentId": e}, success => {
            if (success.code == 1) {
                // 防止expandedKeys重复
                // Tip: Must have, expandedKeys should not be reduplicative
                if (this.state.expandedKeys.indexOf(e) === -1) {
                    this.state.expandedKeys.push(e);
                }
                console.log("id:" + success.data);
                this.addNode(e, this.data, success.data);
                this.setState({
                    data: this.data
                });
            } else {
                message.error("新增菜单失败");
            }
        }, error => {
            message.error("新增菜单失败");
        });
        //
    }

    addNode = (parentKey, data, key) => data.map((item) => {
        if (item.key === parentKey) {
            if (item.children) {
                item.children.push({
                    value: 'default',
                    defaultValue: 'default',
                    key: key, // 这个 key 应该是唯一的。 Tip: The key should be unique
                    parentKey: parentKey,
                    isEditable: false,
                    showText: 'default',
                    status: '1',
                    id: key,
                    parentId: parentKey
                });
            } else {
                item.children = [];
                item.children.push({
                    value: 'default',
                    defaultValue: 'default',
                    key: key,
                    parentKey: parentKey,
                    isEditable: false,
                    showText: 'default',
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
        console.log('edit');
        this.child.setMenuData1(item);

        /*this.editNode(key, this.data);
        this.setState({
          data: this.data
        });*/
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

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <div>
                            <Tree expandedKeys={this.state.expandedKeys} selectedKeys={[]} onExpand={this.onExpand}>
                                {this.renderTreeNodes(this.state.data)}
                            </Tree>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{marginTop: 25}}>
                            <WrappedAddEditForm onRef={(ref) => {this.child = ref}} getAllMenu={this.getAllMenu}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditableTree;