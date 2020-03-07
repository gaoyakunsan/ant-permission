import React, {Component} from 'react';
import {
    Button, Form, Input,
    LocaleProvider,
    message,
    Modal,
    Popconfirm,
    Row,
    Table,
    Tooltip,
    Icon,
    Tree
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Highlighter from 'react-highlight-words';
import '../common.less'
import Util from "../utils/utils";

const {TreeNode} = Tree;

const loadRoleData = {
    loadRoleData: function (values, successcallback) {
        Util.postOld('/source/getRoleDetail', values,
            success => {
                if (success.code == 1) {
                    const result = success.data.list;
                    const retr = {
                        data: result,
                        totalNum: success.data.total
                    }
                    successcallback(retr);
                } else {
                    message.error(error.msg);
                }
            }, error => {
                message.error(error.msg);
            });
    }
}

class submitDetailForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var data = {
                    name: values.name == undefined ? "" : values.name,
                    pageNo: 1,
                    pageSize: document.body.scrollHeight > 700 ? 10 : 5
                };
                loadRoleData.loadRoleData(data, success => {
                    this.props.changeStateData(success, data);
                })
            }
        });
    }

    componentDidMount() {
        console.log(document.body.scrollHeight);
        Util.validToken(success => {
        });
        const data = {
            pageNo: 1,
            pageSize: document.body.scrollHeight > 700 ? 10 : 5,
        }
        loadRoleData.loadRoleData(data, success => {
            this.props.changeStateData(success, data);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}
                  style={{marginTop: '30px', marginLeft: '1.5%'}}>
                <Form.Item wrapperCol={{span: 24}} style={{width: '150px'}}>
                    {getFieldDecorator('name')(
                        <Input name="name" placeholder="请输角色名称"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalSubmitForm = Form.create()(submitDetailForm);

class AddEditForm extends Component {
    componentDidMount() {
        this.init();
    }

    init = () => {
        const {setFieldsValue} = this.props.form;
        const editValue = this.props.editValue;
        if (editValue) {
            setFieldsValue(editValue);
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10}
            }
        };
        const {getFieldDecorator, setFieldsValue} = this.props.form;
        return (
            <Form {...formItemLayout}>
                <Row gutter={24}>
                    <Form.Item style={{display: 'none'}}>
                        {getFieldDecorator('id')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="角色名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入角色名称'}],
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                </Row>
            </Form>
        );
    }
}

const WrappedAddEditForm = Form.create()(AddEditForm);

class MenuList extends Component {
    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData: [],
    };

    componentDidMount() {
        const roleId = this.props.roleId;
        this.initMenuList(roleId);
    }

    initMenuList = (roleId) => {
        Util.getOld("/menu/getAllMenuByTree", {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({treeData: success.data}, () => {
                    this.getRoleMenu(roleId);
                });
            } else {
                message.error(error.msg);
            }
        }, error => {
            message.error(error.msg);
        })
    }

    getRoleMenu = (roleId) => {
        Util.getOld("/menu/getAllMenuByRoleId?roleId=" + roleId, {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({checkedKeys: success.data})
            } else {
                message.error(error.msg);
            }
        }, error => {
            message.error(error.msg);
        })
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({checkedKeys});
        this.props.getChooseMenuIds(checkedKeys.checked);
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({selectedKeys});
    };

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    render() {
        return (
            <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                defaultExpandAll={true}
                checkStrictly={true}
            >
                {this.renderTreeNodes(this.state.treeData)}
            </Tree>
        );
    }
}


class UserTable extends Component {
    state = {
        selectedRowKeys: [],
        searchText: '',
        searchedColumn: '',
        data: []
    };

    componentDidMount() {
        const roleId = this.props.roleId;
        this.initUserList(roleId);
    }

    initUserList = (roleId) => {
        Util.getOld("/source/getAllUser", {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({data: success.data}, () => {
                    this.getRoleUser(roleId);
                })
            } else {
                message.error(error.msg);
            }
        }, error => {
            message.error(error.msg);
        })
    }
    getRoleUser = (roleId) => {
        Util.getOld("/source/getRoleUser?roleId=" + roleId, {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({selectedRowKeys: success.data}, () => {
                    console.log(this.state.selectedRowKeys);
                })
            } else {
                message.error(error.msg);
            }
        }, error => {
            message.error(error.msg);
        })
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(
                        e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm,
                        dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm,
                        dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small"
                        style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    onSelectChangeUser = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
        this.props.getChooseUserIds(selectedRowKeys);
    };

    render() {
        const {data, selectedRowKeys} = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                ...this.getColumnSearchProps('userName'),
            },
            {
                title: '真实姓名',
                dataIndex: 'realName',
                key: 'realName',
                ...this.getColumnSearchProps('realName'),
            },
            {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
                ...this.getColumnSearchProps('phone'),
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email'),
            }
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChangeUser,
        };
        return <Table pagination={{
            pageSize: 5
        }} rowKey={(record, index) => `${record.id}`} rowSelection={rowSelection} columns={columns}
                      dataSource={data}/>;
    }
}

class RoleList extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        userSetRoleSelectedRowKeys: [], // Check here to configure the default column
        data: [],
        pageSize: document.body.scrollHeight > 700 ? 10 : 5,
        pageNo: 1,
        totalNum: null,
        filter: null,
        visible: false,
        userSetRoleVisible: false,
        menuSetRoleVisible: false,
        newKey: Util.getGuid(),
        userSetRoleNewKey: Util.getGuid(),
        menuSetRoleNewKey: Util.getGuid(),
        editValue: null,
        roleId: null,
        checkedMenuKeys: [],
    };

    changeStateData = (result, filter) => {
        this.setState({
            data: result.data,
            totalNum: result.totalNum,
            pageNo: filter.pageNo,
            filter: filter
        })
    }

    onTableChange = (pagination) => {
        this.setState({
            pageSize: pagination.pageSize,
            pageNo: pagination.current,
        }, () => {
            this.state.filter.pageSize = this.state.pageSize;
            this.state.filter.pageNo = this.state.pageNo;
            loadRoleData.loadRoleData(this.state.filter,
                success => {
                    this.setState({
                        data: success.data,
                        totalNum: success.totalNum
                    })
                })
        });
    }

    reloadTable = () => {
        this.setState({
            pageNo: 1,
            pageSize: document.body.scrollHeight > 700 ? 10 : 5,
        }, () => {
            this.state.filter.pageSize = this.state.pageSize;
            this.state.filter.pageNo = this.state.pageNo;
            loadRoleData.loadRoleData(this.state.filter,
                success => {
                    this.setState({
                        data: success.data,
                        totalNum: success.totalNum
                    })
                })
        });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    confirm = (id) => {
        const data = {id: id}
        Util.postOld('/source/delRole', data, success => {
            if (success.code == 1) {
                this.reloadTable();
                message.success("删除成功");
            } else {
                message.error("删除失败");
            }
        }, error => {
            message.error("删除失败");
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
            title: "新增角色",
            editValue: null,
            newKey: Util.getGuid()
        });
    };
    editModal = (values) => {
        //console.log(values);
        this.setState({
            visible: true,
            title: "修改角色",
            editValue: values,
            newKey: Util.getGuid()
        });
    };
    userSetRole = (values) => {
        //console.log(values);
        this.setState({
            userSetRoleVisible: true,
            roleId: values,
            userSetRoleNewKey: Util.getGuid()
        });
    };
    menuSetRole = (values) => {
        //console.log(values);
        this.setState({
            menuSetRoleVisible: true,
            roleId: values,
            menuSetRoleNewKey: Util.getGuid()
        });
    };
    handleOk = e => {
        this.refs.getFormVlaue.validateFields((err, values) => {
            if (!err) {
                const id = values.id;
                if (id) {
                    Util.post('/source/updateRole', values, success => {
                        if (success.code == 1) {
                            this.reloadTable();
                            message.success("修改成功");
                            this.setState({
                                visible: false,
                            });
                        } else {
                            message.error(error.msg);
                        }
                    }, error => {
                        message.error(error.msg);
                    });
                } else {
                    Util.post('/source/insertRole', values, success => {
                        if (success.code == 1) {
                            this.reloadTable();
                            message.success("保存成功");
                            this.setState({
                                visible: false,
                            });
                        } else {
                            message.error(error.msg);
                        }
                    }, error => {
                        message.error(error.msg);
                    });
                }
            }
        });
    }

    userSetRoleHandleOk = e => {
        const data = {
            roleId: this.state.roleId,
            userIdArr: this.state.userSetRoleSelectedRowKeys
        }
        Util.postOld('/source/userSetRole', data, success => {
            if (success.code == 1) {
                message.success("分配成功");
                this.userSetRoleHandleCancel();
            } else {
                message.error("分配失败");
            }
        }, error => {
            message.error("分配失败");
        });
    }

    menuSetRoleHandleOk = e => {
        const data = {
          roleId: this.state.roleId,
            menuIdArr: this.state.checkedMenuKeys
        }
        Util.postOld('/source/menuSetRole', data, success => {
          if (success.code == 1) {
            message.success("分配成功");
            this.menuSetRoleHandleCancel();
          } else {
            message.error("分配失败");
          }
        }, error => {
          message.error("分配失败");
        });
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    userSetRoleHandleCancel = e => {
        this.setState({
            userSetRoleVisible: false,
        });
    };

    menuSetRoleHandleCancel = e => {
        this.setState({
            menuSetRoleVisible: false,
        });
    };
    getChooseUserIds = (value) => {
        this.setState({userSetRoleSelectedRowKeys: value});
    }
    getChooseMenuIds = (value) => {
        this.setState({checkedMenuKeys: value}, () =>{
            console.log(1111);
            console.log(this.state.checkedMenuKeys);
            console.log(2222);
        });
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'name',
            render: text => <Tooltip title={text}><span>{text != undefined
            && text.length > 10 ? text.substr(0, 10) + '...' : text}</span></Tooltip>,
        }, {
            title: '插入时间',
            dataIndex: 'inserttime'
        }, {
            title: '更新时间',
            dataIndex: 'updatetime'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Popconfirm title="确认删除？" okText="确认" cancelText="取消"
                                    onConfirm={this.confirm.bind(this,
                                        record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                        &nbsp;|&nbsp;
                        <span>
            <a onClick={this.editModal.bind(this, record)}>编辑</a>
            </span>
                        &nbsp;|&nbsp;
                        <span>
            <a onClick={this.userSetRole.bind(this, record.id)}>分配用户</a>
            </span>
                        &nbsp;|&nbsp;
                        <span>
            <a onClick={this.menuSetRole.bind(this, record.id)}>分配菜单</a>
            </span>
                    </div>

                )
            }
        }];
        return (
            <div>
                <WrappedNormalSubmitForm changeStateData={this.changeStateData}/>
                <Button type="primary" onClick={this.showModal}
                        style={{marginBottom: -5, marginTop: -5, marginLeft: 25}}>
                    新增
                </Button>
                <Modal key={this.state.newKey} title={this.state.title}
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                >
                    <WrappedAddEditForm ref="getFormVlaue"
                                        editValue={this.state.editValue}/>
                </Modal>
                <Modal width="50%" key={this.state.userSetRoleNewKey} title="分配用户"
                       visible={this.state.userSetRoleVisible}
                       onOk={this.userSetRoleHandleOk}
                       onCancel={this.userSetRoleHandleCancel}
                >
                    <UserTable getChooseUserIds={this.getChooseUserIds} roleId={this.state.roleId}/>
                </Modal>
                <Modal width="50%" key={this.state.menuSetRoleNewKey} title="分配菜单"
                       visible={this.state.menuSetRoleVisible}
                       onOk={this.menuSetRoleHandleOk}
                       onCancel={this.menuSetRoleHandleCancel}
                >
                    <MenuList getChooseMenuIds={this.getChooseMenuIds} roleId={this.state.roleId}/>
                </Modal>
                <LocaleProvider locale={zh_CN}>
                    <Table rowSelection={rowSelection} columns={columns}
                           dataSource={this.state.data}
                           rowKey={(record, index) => `complete${record.id}${index}`}
                           style={{width: '97%', marginLeft: '1.5%', marginTop: '20px'}}
                           pagination={{
                               total: this.state.totalNum,
                               showSizeChanger: false,
                               showQuickJumper: true,
                               defaultPageSize: this.state.pageSize,
                               pageSize: 5,
                               current: this.state.pageNo,
                               showTotal: total => {
                                   return `共${total}条`;
                               },
                           }}
                           onChange={this.onTableChange}/>
                </LocaleProvider>
            </div>
        );
    }
}

export default RoleList;