import React, {Component} from 'react';
import {
    Table,
    message,
    Form,
    Select,
    Input,
    Button,
    DatePicker,
    Row,
    Tooltip,
    LocaleProvider,
    Icon,
    Popconfirm,
    Badge,
    Modal,
    Radio,
    Col
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../common.less'
import moment from 'moment'
import Util from "../utils/utils";
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
const InputGroup = Input.Group;

const {Option} = Select;
const {TextArea} = Input;

const loadUserData = {
    loadUserData: function (values, successcallback) {
        Util.postOld('/source/getUserDetail', values,
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
                    userName: values.userName == undefined ? "" : values.userName,
                    status: values.status == undefined ? "" : values.status,
                    pageNo: 1,
                    pageSize: document.body.scrollHeight > 700 ? 10 : 5
                };
                loadUserData.loadUserData(data, success => {
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
        loadUserData.loadUserData(data, success => {
            this.props.changeStateData(success, data);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}
                  style={{marginTop: '30px', marginLeft: '1.5%'}}>
                <Form.Item wrapperCol={{span: 24}} style={{width: '150px'}}>
                    {getFieldDecorator('userName')(
                        <Input name="userName" placeholder="请输登录名"/>
                    )}
                </Form.Item>
                <Form.Item style={{width: '100px'}}>
                    {getFieldDecorator('status',{initialValue: "",})(
                        <Select>
                            <Option value="">全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="0">禁用</Option>
                        </Select>
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
            const status = editValue.status;
            if ("1" == status) {
                setFieldsValue({status: "启用"})
            } else {
                setFieldsValue({status: "禁用"})
            }

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
                    <Form.Item label="登录名">
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入登录名'}],
                        })(
                            <Input style={{width: '100%'}} autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名">
                        {getFieldDecorator('realName', {
                            rules: [{required: true, message: '请输入真实姓名'}],
                        })(
                            <Input autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码'}],
                        })(
                            <Input type="password" autoComplete="new-password"/>
                        )}
                    </Form.Item>
                    <Form.Item label="手机号">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号'}],
                        })(
                            <Input autoComplete="off"/>
                        )}
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '请输入邮箱'}],
                        })(
                            <Input autoComplete="off"/>
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


class UserList extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
        pageSize: document.body.scrollHeight > 700 ? 10 : 5,
        pageNo: 1,
        totalNum: null,
        filter: null,
        visible: false,
        newKey: Util.getGuid(),
        editValue: null
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
            loadUserData.loadUserData(this.state.filter,
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
            loadUserData.loadUserData(this.state.filter,
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
        Util.postOld('/source/delUser', data, success => {
            if (success.code == 1) {
                this.reloadTable();
                message.success("禁用成功");
            } else {
                message.error("禁用失败");
            }
        }, error => {
            message.error("禁用失败");
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
            title: "新增用户",
            editValue: null,
            newKey: Util.getGuid()
        });
    };
    editModal = (values) => {
        //console.log(values);
        this.setState({
            visible: true,
            title: "修改用户",
            editValue: values,
            newKey: Util.getGuid()
        });
    };
    handleOk = e => {
        this.refs.getFormVlaue.validateFields((err, values) => {
            if (!err) {
                const id = values.id;
                if(id){
                    Util.post('/source/updateUser', values, success => {
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
                }else {
                    Util.post('/source/insertUser', values, success => {
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

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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
            title: '登录名',
            dataIndex: 'userName',
            render: text => <Tooltip title={text}><span>{text != undefined
            && text.length > 10 ? text.substr(0, 10) + '...' : text}</span></Tooltip>,
        }, {
            title: '真实姓名',
            dataIndex: 'realName',
            render: text => <Tooltip title={text}><span>{text != undefined
            && text.length > 10 ? text.substr(0, 10) + '...' : text}</span></Tooltip>,
        }, {
            title: '状态',
            dataIndex: 'status',
            render: text => text == '1' ? "启用" : "禁用"
        }, {
            title: '手机号',
            dataIndex: 'phone'
        }, {
            title: '邮箱',
            dataIndex: 'email'
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
                        <Popconfirm title="确认禁用？" okText="确认" cancelText="取消"
                                    onConfirm={this.confirm.bind(this,
                                        record.id)}>
                            <a>禁用</a>
                        </Popconfirm>
                        &nbsp;|&nbsp;
                        <span>
            <a onClick={this.editModal.bind(this, record)}>编辑</a>
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
                <Modal
                    key={this.state.newKey}
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <WrappedAddEditForm ref="getFormVlaue" editValue={this.state.editValue}/>
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

export default UserList;