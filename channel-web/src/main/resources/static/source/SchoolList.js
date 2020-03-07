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

const {RangePicker} = DatePicker;
const InputGroup = Input.Group;

const {Option} = Select;
const {TextArea} = Input;

const loadSchoolData = {
    loadSchoolData: function (values, successcallback) {
        Util.postOld('/source/getSchoolDetail', values,
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
    state = {
        option: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var data = {
                    schoolName: values.schoolName == undefined ? "" : values.schoolName,
                    pageNo: 1,
                    pageSize: document.body.scrollHeight > 700 ? 10 : 5
                };
                loadSchoolData.loadSchoolData(data, success => {
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
        loadSchoolData.loadSchoolData(data, success => {
            this.props.changeStateData(success, data);
        });
        /*const option = loadSchoolData.getInterfaceInfo(success => {
          this.setState({
            option: success
          })
        });*/

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}
                  style={{marginTop: '30px', marginLeft: '1.5%'}}>
                <Form.Item wrapperCol={{span: 24}} style={{width: '150px'}}>
                    {getFieldDecorator('schoolName')(
                        <Input name="schoolName" placeholder="请输入学校名称"/>
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

class SchoolList extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
        pageSize: document.body.scrollHeight > 700 ? 10 : 5,
        pageNo: 1,
        totalNum: null,
        filter: null
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
            loadSchoolData.loadSchoolData(this.state.filter,
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
            loadSchoolData.loadSchoolData(this.state.filter,
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
        Util.postOld('/source/delSchool', data, success => {
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

    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
            title: "新增学校",
            schoolName: "",
            id: "",
        });
    };
    handleOk = e => {
        var schoolName = this.state.schoolName;

        const data = {
            schoolName: schoolName,
        };

        Util.post('/source/insertSchool', data, success => {
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
    handleValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            //console.log(this.state.jobName)
        })
        //console.log("value:" + event.target.value);
        //console.log(this.state.jobName);
    };
    handleAgent = (event) => {
        this.setState({
            isagentaccount: event.target.value,
        })
    };

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
            title: '学校名称',
            dataIndex: 'schoolName',
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
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    学校名称：&nbsp;&nbsp;&nbsp;&nbsp;<Input placeholder="" name="schoolName"
                                                        value={this.state.schoolName}
                                                        onChange={this.handleValue}
                                                        style={{width: '300px'}}/><br/><br/>
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
                               pageSize:5,
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

export default SchoolList;