import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, message} from "antd";
import React from "react";
import {Link} from "react-router-dom";
import commonUtil from "../utils/utils";

const {Option} = Select;

@Form.create()
export default class ScoreDetail extends React.Component {
    state = {
        showSave: false,
        schools: [],
        selected: {},
        creativeWordsLoading: false,
        saveLoading: false,
        action: "/source/insertScore",
        adTemp: {},
        allAdTemp: [],
        listLoading: false,
        isShowCpaBid: 'block',
        isMscheduleType: false,
        latestSchoolId: null
    }

    componentDidMount() {
        const {location: {query}, form: {setFieldsValue}} = this.props;
        console.log(query)
        if (query) {
            this.getSchools("edit");
            var sex = query['sex'];
            if ("0" == sex) {
                query['sex'] = "男";
            } else {
                query['sex'] = "女";
            }
            setFieldsValue(query)
            this.setState({action: "/source/updateScore"})
        } else {
            this.getSchools("add");
            this.setState({showSave: true})
        }
        this.setState({listLoading: true})
    }


    getSchools = (value) => {
        commonUtil.getOld("/source/getSchools", {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({schools: success.data})
                if("add" == value){
                    this.getLatestSchoolId();
                }
            } else {

            }
        }, error => {
        })
    }
    getLatestSchoolId = () => {
        commonUtil.getOld("/source/getLatestSchoolId", {}, success => {
            console.log(1, success)
            if (success.code == "1") {
                this.setState({latestSchoolId: success.data})
            } else {

            }
        }, error => {
        })
    }

    changeInputStatus = () => {
        this.setState({showSave: true})
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.setState({saveLoading: true})
                let param = {}
                Object.entries(values).forEach(entry => {
                    let key, value;
                    [key, value] = entry;
                    if (value instanceof Array) {
                        param[key] = value.join("|")
                    } else {
                        param[key] = value
                    }
                })
                commonUtil.post(this.state.action, param, ({code, msg}) => {
                    if (code == 1) {
                        message.success("成功")
                        this.props.history.push({
                            pathname: `/score/list`
                        })
                    } else {
                        message.error(msg)
                    }
                    this.setState({saveLoading: false})
                }, error => {
                    message.error(error.msg)
                    this.setState({saveLoading: false})
                })
            }
        });
    };

    changeAge = (e) => {
        const {getFieldValue, setFieldsValue} = this.props.form;
        var value = e.target.value;
        var sex = getFieldValue("sex");
        var age = value;
        if (age) {
            var zfp = getFieldValue("zfp");
            this.judjeValues(age, sex, zfp, "zfp");
            var ldty = getFieldValue("ldty");
            this.judjeValues(age, sex, ldty, "ldty");
            var wqty = getFieldValue("wqty");
            this.judjeValues(age, sex, wqty, "wqty");
            var lxt = getFieldValue("lxt");
            this.judjeValues(age, sex, lxt, "lxt");
            var tqq = getFieldValue("tqq");
            this.judjeValues(age, sex, tqq, "tqq");
            var phm = getFieldValue("phm");
            this.judjeValues(age, sex, phm, "phm");
        }
    }
    changeSex = (value) => {
        const {getFieldValue, setFieldsValue} = this.props.form;
        var age = getFieldValue("age");
        var sex = value;
        if (age) {
            var zfp = getFieldValue("zfp");
            this.judjeValues(age, sex, zfp, "zfp");
            var ldty = getFieldValue("ldty");
            this.judjeValues(age, sex, ldty, "ldty");
            var wqty = getFieldValue("wqty");
            this.judjeValues(age, sex, wqty, "wqty");
            var lxt = getFieldValue("lxt");
            this.judjeValues(age, sex, lxt, "lxt");
            var tqq = getFieldValue("tqq");
            this.judjeValues(age, sex, tqq, "tqq");
            var phm = getFieldValue("phm");
            this.judjeValues(age, sex, phm, "phm");
        }
    }

    changeValues = (value) => {
        const {getFieldValue, setFieldsValue} = this.props.form;
        var age = getFieldValue("age");
        var sex = getFieldValue("sex");
        if (age) {
            this.judjeValues(age, sex, value.target.value, value.target.id);
        } else {
            message.warn("年龄必填");
        }
    }

    judjeValues = (age, sex, value, option) => {
        const {setFieldsValue} = this.props.form;
        var score = 0;
        if (age > 0 && age <= 3 && sex == 0) { // 0-3岁 男
            if ("zfp" == option) {
                if (value >= 12.9) {
                    score = 1;
                } else if (value >= 10.3 && value <= 12.8) {
                    score = 2;
                } else if (value >= 9.1 && value <= 10.2) {
                    score = 3;
                } else if (value >= 8.0 && value <= 9.0) {
                    score = 4;
                } else if (value < 8.0) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 29) {
                    score = 1;
                } else if (value >= 30 && value <= 42) {
                    score = 2;
                } else if (value >= 43 && value <= 58) {
                    score = 3;
                } else if (value >= 59 && value <= 76) {
                    score = 4;
                } else if (value > 76) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 1.9) {
                    score = 1;
                } else if (value >= 2.0 && value <= 2.9) {
                    score = 2;
                } else if (value >= 3.0 && value <= 3.9) {
                    score = 3;
                } else if (value >= 4.0 && value <= 5.9) {
                    score = 4;
                } else if (value > 5.9) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 19.7) {
                    score = 1;
                } else if (value >= 13.1 && value <= 19.6) {
                    score = 2;
                } else if (value >= 9.2 && value <= 13.0) {
                    score = 3;
                } else if (value >= 6.6 && value <= 9.1) {
                    score = 4;
                } else if (value < 6.6) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 4.8) {
                    score = 1;
                } else if (value >= 4.9 && value <= 8.5) {
                    score = 2;
                } else if (value >= 8.6 && value <= 11.6) {
                    score = 3;
                } else if (value >= 11.7 && value <= 14.9) {
                    score = 4;
                } else if (value > 14.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 30.1) {
                    score = 1;
                } else if (value >= 16.9 && value <= 30.0) {
                    score = 2;
                } else if (value >= 10.6 && value <= 16.8) {
                    score = 3;
                } else if (value >= 6.6 && value <= 10.5) {
                    score = 4;
                } else if (value < 6.6) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 0 && age <= 3 && sex == 1) { // 0-3岁 女
            if ("zfp" == option) {
                if (value >= 13.5) {
                    score = 1;
                } else if (value >= 10.6 && value <= 13.4) {
                    score = 2;
                } else if (value >= 9.4 && value <= 10.5) {
                    score = 3;
                } else if (value >= 8.2 && value <= 9.3) {
                    score = 4;
                } else if (value < 8.2) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 28) {
                    score = 1;
                } else if (value >= 29 && value <= 39) {
                    score = 2;
                } else if (value >= 40 && value <= 54) {
                    score = 3;
                } else if (value >= 55 && value <= 71) {
                    score = 4;
                } else if (value > 71) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 1.4) {
                    score = 1;
                } else if (value >= 1.5 && value <= 2.4) {
                    score = 2;
                } else if (value >= 2.5 && value <= 3.4) {
                    score = 3;
                } else if (value >= 3.5 && value <= 5.0) {
                    score = 4;
                } else if (value > 5.0) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 20.1) {
                    score = 1;
                } else if (value >= 13.5 && value <= 20.0) {
                    score = 2;
                } else if (value >= 9.8 && value <= 13.4) {
                    score = 3;
                } else if (value >= 7.1 && value <= 9.7) {
                    score = 4;
                } else if (value < 7.1) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 6.2) {
                    score = 1;
                } else if (value >= 6.3 && value <= 9.9) {
                    score = 2;
                } else if (value >= 10.0 && value <= 12.9) {
                    score = 3;
                } else if (value >= 13.0 && value <= 15.9) {
                    score = 4;
                } else if (value > 15.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 32.5) {
                    score = 1;
                } else if (value >= 17.4 && value <= 32.4) {
                    score = 2;
                } else if (value >= 10.8 && value <= 17.3) {
                    score = 3;
                } else if (value >= 6.8 && value <= 10.7) {
                    score = 4;
                } else if (value < 6.9) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 3 && age <= 3.5 && sex == 0) { // 3-3.5岁 男
            if ("zfp" == option) {
                if (value >= 11.4) {
                    score = 1;
                } else if (value >= 9.5 && value <= 11.3) {
                    score = 2;
                } else if (value >= 8.4 && value <= 9.4) {
                    score = 3;
                } else if (value >= 7.5 && value <= 8.3) {
                    score = 4;
                } else if (value < 7.5) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 34) {
                    score = 1;
                } else if (value >= 35 && value <= 52) {
                    score = 2;
                } else if (value >= 53 && value <= 69) {
                    score = 3;
                } else if (value >= 70 && value <= 84) {
                    score = 4;
                } else if (value > 84) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 1.9) {
                    score = 1;
                } else if (value >= 2.0 && value <= 2.9) {
                    score = 2;
                } else if (value >= 3.0 && value <= 4.4) {
                    score = 3;
                } else if (value >= 4.5 && value <= 5.9) {
                    score = 4;
                } else if (value > 5.9) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 17.0) {
                    score = 1;
                } else if (value >= 11.2 && value <= 16.9) {
                    score = 2;
                } else if (value >= 8.3 && value <= 11.1) {
                    score = 3;
                } else if (value >= 6.1 && value <= 8.2) {
                    score = 4;
                } else if (value < 6.1) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 4.6) {
                    score = 1;
                } else if (value >= 4.7 && value <= 8.4) {
                    score = 2;
                } else if (value >= 8.5 && value <= 11.5) {
                    score = 3;
                } else if (value >= 11.6 && value <= 14.9) {
                    score = 4;
                } else if (value > 14.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 27.1) {
                    score = 1;
                } else if (value >= 15.1 && value <= 27.0) {
                    score = 2;
                } else if (value >= 9.4 && value <= 15.0) {
                    score = 3;
                } else if (value >= 5.9 && value <= 9.3) {
                    score = 4;
                } else if (value < 5.9) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 3 && age <= 3.5 && sex == 1) { // 3-3.5岁 女
            if ("zfp" == option) {
                if (value >= 12.1) {
                    score = 1;
                } else if (value >= 9.8 && value <= 12.0) {
                    score = 2;
                } else if (value >= 8.7 && value <= 9.7) {
                    score = 3;
                } else if (value >= 7.7 && value <= 8.6) {
                    score = 4;
                } else if (value < 7.7) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 33) {
                    score = 1;
                } else if (value >= 34 && value <= 49) {
                    score = 2;
                } else if (value >= 50 && value <= 64) {
                    score = 3;
                } else if (value >= 65 && value <= 81) {
                    score = 4;
                } else if (value > 81) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 1.9) {
                    score = 1;
                } else if (value >= 2.0 && value <= 2.5) {
                    score = 2;
                } else if (value >= 2.6 && value <= 3.5) {
                    score = 3;
                } else if (value >= 3.6 && value <= 5.0) {
                    score = 4;
                } else if (value > 5.0) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 17.1) {
                    score = 1;
                } else if (value >= 11.3 && value <= 17.0) {
                    score = 2;
                } else if (value >= 8.5 && value <= 11.2) {
                    score = 3;
                } else if (value >= 6.2 && value <= 8.4) {
                    score = 4;
                } else if (value < 6.2) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 6.2) {
                    score = 1;
                } else if (value >= 6.3 && value <= 9.9) {
                    score = 2;
                } else if (value >= 10.0 && value <= 12.9) {
                    score = 3;
                } else if (value >= 13.0 && value <= 15.9) {
                    score = 4;
                } else if (value > 15.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 27.5) {
                    score = 1;
                } else if (value >= 15.1 && value <= 27.4) {
                    score = 2;
                } else if (value >= 9.7 && value <= 15.0) {
                    score = 3;
                } else if (value >= 6.1 && value <= 9.6) {
                    score = 4;
                } else if (value < 6.1) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 3.5 && age <= 4 && sex == 0) { // 3.5-4岁 男
            if ("zfp" == option) {
                if (value >= 10.2) {
                    score = 1;
                } else if (value >= 8.6 && value <= 10.1) {
                    score = 2;
                } else if (value >= 7.7 && value <= 8.5) {
                    score = 3;
                } else if (value >= 6.9 && value <= 7.6) {
                    score = 4;
                } else if (value < 6.9) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 46) {
                    score = 1;
                } else if (value >= 47 && value <= 64) {
                    score = 2;
                } else if (value >= 65 && value <= 79) {
                    score = 3;
                } else if (value >= 80 && value <= 95) {
                    score = 4;
                } else if (value > 95) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 2.9) {
                    score = 1;
                } else if (value >= 3.0 && value <= 3.9) {
                    score = 2;
                } else if (value >= 4.0 && value <= 4.9) {
                    score = 3;
                } else if (value >= 5.0 && value <= 6.9) {
                    score = 4;
                } else if (value > 6.9) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 13.2) {
                    score = 1;
                } else if (value >= 9.2 && value <= 13.1) {
                    score = 2;
                } else if (value >= 7.1 && value <= 9.1) {
                    score = 3;
                } else if (value >= 5.6 && value <= 7.0) {
                    score = 4;
                } else if (value < 5.6) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 4.4) {
                    score = 1;
                } else if (value >= 4.5 && value <= 8.4) {
                    score = 2;
                } else if (value >= 8.5 && value <= 11.4) {
                    score = 3;
                } else if (value >= 11.5 && value <= 14.9) {
                    score = 4;
                } else if (value > 14.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 21.6) {
                    score = 1;
                } else if (value >= 11.6 && value <= 21.5) {
                    score = 2;
                } else if (value >= 7.4 && value <= 11.5) {
                    score = 3;
                } else if (value >= 4.9 && value <= 7.3) {
                    score = 4;
                } else if (value < 4.9) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 3.5 && age <= 4 && sex == 1) { // 3.5-4岁 女
            if ("zfp" == option) {
                if (value >= 10.9) {
                    score = 1;
                } else if (value >= 9.1 && value <= 10.8) {
                    score = 2;
                } else if (value >= 8.1 && value <= 9.0) {
                    score = 3;
                } else if (value >= 7.2 && value <= 8.0) {
                    score = 4;
                } else if (value < 7.2) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 43) {
                    score = 1;
                } else if (value >= 44 && value <= 59) {
                    score = 2;
                } else if (value >= 60 && value <= 73) {
                    score = 3;
                } else if (value >= 74 && value <= 89) {
                    score = 4;
                } else if (value > 89) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 2.5) {
                    score = 1;
                } else if (value >= 2.5 && value <= 2.9) {
                    score = 2;
                } else if (value >= 3.0 && value <= 3.9) {
                    score = 3;
                } else if (value >= 4.0 && value <= 4.9) {
                    score = 4;
                } else if (value > 5.0) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 13.5) {
                    score = 1;
                } else if (value >= 9.6 && value <= 13.4) {
                    score = 2;
                } else if (value >= 7.4 && value <= 9.5) {
                    score = 3;
                } else if (value >= 5.9 && value <= 7.3) {
                    score = 4;
                } else if (value < 5.9) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 5.9) {
                    score = 1;
                } else if (value >= 6.0 && value <= 9.9) {
                    score = 2;
                } else if (value >= 10.0 && value <= 12.9) {
                    score = 3;
                } else if (value >= 13.0 && value <= 15.9) {
                    score = 4;
                } else if (value > 15.9) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 22.6) {
                    score = 1;
                } else if (value >= 12.5 && value <= 22.5) {
                    score = 2;
                } else if (value >= 8.2 && value <= 12.4) {
                    score = 3;
                } else if (value >= 5.3 && value <= 8.1) {
                    score = 4;
                } else if (value < 5.3) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 4 && age <= 4.5 && sex == 0) { // 4-4.5岁 男
            if ("zfp" == option) {
                if (value >= 9.8) {
                    score = 1;
                } else if (value >= 8.1 && value <= 9.7) {
                    score = 2;
                } else if (value >= 7.3 && value <= 8.0) {
                    score = 3;
                } else if (value >= 6.7 && value <= 7.2) {
                    score = 4;
                } else if (value < 6.7) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 54) {
                    score = 1;
                } else if (value >= 55 && value <= 72) {
                    score = 2;
                } else if (value >= 73 && value <= 88) {
                    score = 3;
                } else if (value >= 89 && value <= 102) {
                    score = 4;
                } else if (value > 102) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 2.9) {
                    score = 1;
                } else if (value >= 3.0 && value <= 3.9) {
                    score = 2;
                } else if (value >= 4.0 && value <= 5.9) {
                    score = 3;
                } else if (value >= 6.0 && value <= 8.0) {
                    score = 4;
                } else if (value > 8.0) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 11.3) {
                    score = 1;
                } else if (value >= 8.2 && value <= 11.2) {
                    score = 2;
                } else if (value >= 6.5 && value <= 8.1) {
                    score = 3;
                } else if (value >= 5.3 && value <= 6.4) {
                    score = 4;
                } else if (value < 5.3) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 4.1) {
                    score = 1;
                } else if (value >= 4.2 && value <= 7.9) {
                    score = 2;
                } else if (value >= 8.0 && value <= 10.9) {
                    score = 3;
                } else if (value >= 11.0 && value <= 14.4) {
                    score = 4;
                } else if (value > 14.4) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 17.9) {
                    score = 1;
                } else if (value >= 9.7 && value <= 17.8) {
                    score = 2;
                } else if (value >= 6.3 && value <= 9.6) {
                    score = 3;
                } else if (value >= 4.3 && value <= 6.2) {
                    score = 4;
                } else if (value < 4.3) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 4 && age <= 4.5 && sex == 1) { // 4-4.5岁 女
            if ("zfp" == option) {
                if (value >= 10.3) {
                    score = 1;
                } else if (value >= 8.6 && value <= 10.2) {
                    score = 2;
                } else if (value >= 7.7 && value <= 8.5) {
                    score = 3;
                } else if (value >= 7.0 && value <= 7.6) {
                    score = 4;
                } else if (value < 7.0) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 49) {
                    score = 1;
                } else if (value >= 50 && value <= 67) {
                    score = 2;
                } else if (value >= 68 && value <= 80) {
                    score = 3;
                } else if (value >= 81 && value <= 96) {
                    score = 4;
                } else if (value > 96) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 2.4) {
                    score = 1;
                } else if (value >= 2.5 && value <= 3.4) {
                    score = 2;
                } else if (value >= 3.5 && value <= 4.0) {
                    score = 3;
                } else if (value >= 4.1 && value <= 5.5) {
                    score = 4;
                } else if (value > 5.5) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 12.0) {
                    score = 1;
                } else if (value >= 8.6 && value <= 11.9) {
                    score = 2;
                } else if (value >= 6.8 && value <= 8.5) {
                    score = 3;
                } else if (value >= 5.5 && value <= 6.7) {
                    score = 4;
                } else if (value < 5.5) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 5.9) {
                    score = 1;
                } else if (value >= 6.0 && value <= 9.9) {
                    score = 2;
                } else if (value >= 10.0 && value <= 12.9) {
                    score = 3;
                } else if (value >= 13.0 && value <= 16.0) {
                    score = 4;
                } else if (value > 16.0) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 18.7) {
                    score = 1;
                } else if (value >= 10.2 && value <= 18.6) {
                    score = 2;
                } else if (value >= 7.0 && value <= 10.1) {
                    score = 3;
                } else if (value >= 4.7 && value <= 6.9) {
                    score = 4;
                } else if (value < 4.7) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 4.5 && age <= 5 && sex == 0) { // 4.5-5岁 男
            if ("zfp" == option) {
                if (value >= 9.0) {
                    score = 1;
                } else if (value >= 7.7 && value <= 8.9) {
                    score = 2;
                } else if (value >= 7.0 && value <= 7.6) {
                    score = 3;
                } else if (value >= 6.4 && value <= 6.9) {
                    score = 4;
                } else if (value < 6.4) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 64) {
                    score = 1;
                } else if (value >= 65 && value <= 79) {
                    score = 2;
                } else if (value >= 80 && value <= 95) {
                    score = 3;
                } else if (value >= 96 && value <= 100) {
                    score = 4;
                } else if (value > 100) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 3.9) {
                    score = 1;
                } else if (value >= 4.0 && value <= 5.4) {
                    score = 2;
                } else if (value >= 5.5 && value <= 7.4) {
                    score = 3;
                } else if (value >= 7.5 && value <= 8.9) {
                    score = 4;
                } else if (value > 8.9) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 9.9) {
                    score = 1;
                } else if (value >= 7.3 && value <= 9.8) {
                    score = 2;
                } else if (value >= 6.0 && value <= 7.2) {
                    score = 3;
                } else if (value >= 5.1 && value <= 5.9) {
                    score = 4;
                } else if (value < 5.1) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 3.4) {
                    score = 1;
                } else if (value >= 3.5 && value <= 7.5) {
                    score = 2;
                } else if (value >= 7.6 && value <= 10.9) {
                    score = 3;
                } else if (value >= 11.0 && value <= 14.4) {
                    score = 4;
                } else if (value > 14.4) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 14.1) {
                    score = 1;
                } else if (value >= 7.9 && value <= 14.0) {
                    score = 2;
                } else if (value >= 5.3 && value <= 7.8) {
                    score = 3;
                } else if (value >= 3.7 && value <= 5.2) {
                    score = 4;
                } else if (value < 3.7) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 4.5 && age <= 5 && sex == 1) { // 4.5-5岁 女
            if ("zfp" == option) {
                if (value >= 9.7) {
                    score = 1;
                } else if (value >= 8.1 && value <= 9.6) {
                    score = 2;
                } else if (value >= 7.3 && value <= 8.0) {
                    score = 3;
                } else if (value >= 6.7 && value <= 7.2) {
                    score = 4;
                } else if (value < 6.7) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 59) {
                    score = 1;
                } else if (value >= 60 && value <= 74) {
                    score = 2;
                } else if (value >= 75 && value <= 88) {
                    score = 3;
                } else if (value >= 89 && value <= 102) {
                    score = 4;
                } else if (value > 102) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 3.4) {
                    score = 1;
                } else if (value >= 3.5 && value <= 4.4) {
                    score = 2;
                } else if (value >= 4.5 && value <= 5.9) {
                    score = 3;
                } else if (value >= 6.0 && value <= 8.5) {
                    score = 4;
                } else if (value > 8.5) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 10.1) {
                    score = 1;
                } else if (value >= 7.6 && value <= 10) {
                    score = 2;
                } else if (value >= 6.2 && value <= 7.5) {
                    score = 3;
                } else if (value >= 5.2 && value <= 6.1) {
                    score = 4;
                } else if (value < 5.2) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 5.4) {
                    score = 1;
                } else if (value >= 5.5 && value <= 9.6) {
                    score = 2;
                } else if (value >= 9.7 && value <= 13.1) {
                    score = 3;
                } else if (value >= 13.1 && value <= 16.6) {
                    score = 4;
                } else if (value > 16.6) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 14.1) {
                    score = 1;
                } else if (value >= 8.3 && value <= 14.0) {
                    score = 2;
                } else if (value >= 5.8 && value <= 8.2) {
                    score = 3;
                } else if (value >= 4.1 && value <= 5.7) {
                    score = 4;
                } else if (value < 4.1) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 5 && age <= 5.5 && sex == 0) { // 5-5.5岁 男
            if ("zfp" == option) {
                if (value >= 8.6) {
                    score = 1;
                } else if (value >= 7.4 && value <= 8.5) {
                    score = 2;
                } else if (value >= 6.8 && value <= 7.3) {
                    score = 3;
                } else if (value >= 6.2 && value <= 6.7) {
                    score = 4;
                } else if (value < 6.2) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 69) {
                    score = 1;
                } else if (value >= 70 && value <= 89) {
                    score = 2;
                } else if (value >= 90 && value <= 102) {
                    score = 3;
                } else if (value >= 103 && value <= 119) {
                    score = 4;
                } else if (value > 119) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 3.9) {
                    score = 1;
                } else if (value >= 4.0 && value <= 5.9) {
                    score = 2;
                } else if (value >= 6.0 && value <= 7.9) {
                    score = 3;
                } else if (value >= 8.0 && value <= 10) {
                    score = 4;
                } else if (value > 10) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 9.4) {
                    score = 1;
                } else if (value >= 6.9 && value <= 9.3) {
                    score = 2;
                } else if (value >= 5.7 && value <= 6.8) {
                    score = 3;
                } else if (value >= 4.9 && value <= 5.6) {
                    score = 4;
                } else if (value < 4.9) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 3.2) {
                    score = 1;
                } else if (value >= 3.3 && value <= 7.5) {
                    score = 2;
                } else if (value >= 7.6 && value <= 10.9) {
                    score = 3;
                } else if (value >= 11 && value <= 14.4) {
                    score = 4;
                } else if (value > 14.4) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 12.1) {
                    score = 1;
                } else if (value >= 6.8 && value <= 12.0) {
                    score = 2;
                } else if (value >= 4.6 && value <= 6.7) {
                    score = 3;
                } else if (value >= 3.3 && value <= 4.5) {
                    score = 4;
                } else if (value < 3.3) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 5 && age <= 5.5 && sex == 1) { // 5-5.5岁 女
            if ("zfp" == option) {
                if (value >= 9.1) {
                    score = 1;
                } else if (value >= 7.7 && value <= 9) {
                    score = 2;
                } else if (value >= 7 && value <= 7.6) {
                    score = 3;
                } else if (value >= 6.4 && value <= 6.9) {
                    score = 4;
                } else if (value < 6.4) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 65) {
                    score = 1;
                } else if (value >= 66 && value <= 81) {
                    score = 2;
                } else if (value >= 82 && value <= 95) {
                    score = 3;
                } else if (value >= 96 && value <= 109) {
                    score = 4;
                } else if (value > 109) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 3.4) {
                    score = 1;
                } else if (value >= 3.5 && value <= 4.9) {
                    score = 2;
                } else if (value >= 5.0 && value <= 6.4) {
                    score = 3;
                } else if (value >= 6.5 && value <= 8.5) {
                    score = 4;
                } else if (value > 8.5) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 9.4) {
                    score = 1;
                } else if (value >= 6.9 && value <= 9.3) {
                    score = 2;
                } else if (value >= 5.7 && value <= 6.8) {
                    score = 3;
                } else if (value >= 4.9 && value <= 5.6) {
                    score = 4;
                } else if (value < 4.9) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 3.2) {
                    score = 1;
                } else if (value >= 3.3 && value <= 7.5) {
                    score = 2;
                } else if (value >= 7.6 && value <= 10.9) {
                    score = 3;
                } else if (value >= 11 && value <= 14.4) {
                    score = 4;
                } else if (value > 14.4) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 12.1) {
                    score = 1;
                } else if (value >= 6.8 && value <= 12.0) {
                    score = 2;
                } else if (value >= 4.6 && value <= 6.7) {
                    score = 3;
                } else if (value >= 3.3 && value <= 4.5) {
                    score = 4;
                } else if (value < 3.3) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 5.5 && age <= 6 && sex == 0) { // 5.5-6岁 男
            if ("zfp" == option) {
                if (value >= 8) {
                    score = 1;
                } else if (value >= 6.9 && value <= 7.9) {
                    score = 2;
                } else if (value >= 6.3 && value <= 6.8) {
                    score = 3;
                } else if (value >= 5.8 && value <= 6.2) {
                    score = 4;
                } else if (value < 5.8) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 78) {
                    score = 1;
                } else if (value >= 79 && value <= 94) {
                    score = 2;
                } else if (value >= 95 && value <= 110) {
                    score = 3;
                } else if (value >= 111 && value <= 127) {
                    score = 4;
                } else if (value > 127) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 4.4) {
                    score = 1;
                } else if (value >= 4.5 && value <= 6.9) {
                    score = 2;
                } else if (value >= 7.0 && value <= 9.4) {
                    score = 3;
                } else if (value >= 9.5 && value <= 12) {
                    score = 4;
                } else if (value > 12) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 8.3) {
                    score = 1;
                } else if (value >= 6.2 && value <= 8.2) {
                    score = 2;
                } else if (value >= 5.2 && value <= 6.1) {
                    score = 3;
                } else if (value >= 4.4 && value <= 5.1) {
                    score = 4;
                } else if (value < 4.4) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 3.1) {
                    score = 1;
                } else if (value >= 3.2 && value <= 7) {
                    score = 2;
                } else if (value >= 7.1 && value <= 10.4) {
                    score = 3;
                } else if (value >= 10.5 && value <= 14.4) {
                    score = 4;
                } else if (value > 14.4) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 9.4) {
                    score = 1;
                } else if (value >= 5.4 && value <= 9.3) {
                    score = 2;
                } else if (value >= 3.8 && value <= 5.3) {
                    score = 3;
                } else if (value >= 2.7 && value <= 3.7) {
                    score = 4;
                } else if (value < 2.7) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        } else if (age > 5.5 && age <= 6 && sex == 1) { // 5.5-6岁 女
            if ("zfp" == option) {
                if (value >= 8.6) {
                    score = 1;
                } else if (value >= 7.3 && value <= 8.5) {
                    score = 2;
                } else if (value >= 6.6 && value <= 7.2) {
                    score = 3;
                } else if (value >= 6.1 && value <= 6.5) {
                    score = 4;
                } else if (value < 6.1) {
                    score = 5;
                }
                setFieldsValue({zfpScore: score});
            } else if ("ldty" == option) {
                if (value <= 70) {
                    score = 1;
                } else if (value >= 71 && value <= 86) {
                    score = 2;
                } else if (value >= 87 && value <= 100) {
                    score = 3;
                } else if (value >= 101 && value <= 116) {
                    score = 4;
                } else if (value > 116) {
                    score = 5;
                }
                setFieldsValue({ldtyScore: score});
            } else if ("wqty" == option) {
                if (value <= 3.4) {
                    score = 1;
                } else if (value >= 3.5 && value <= 4.9) {
                    score = 2;
                } else if (value >= 5.0 && value <= 6.4) {
                    score = 3;
                } else if (value >= 6.5 && value <= 8.0) {
                    score = 4;
                } else if (value > 8) {
                    score = 5;
                }
                setFieldsValue({wqtyScore: score});
            } else if ("lxt" == option) {
                if (value >= 8.4) {
                    score = 1;
                } else if (value >= 6.3 && value <= 8.3) {
                    score = 2;
                } else if (value >= 5.3 && value <= 6.2) {
                    score = 3;
                } else if (value >= 4.6 && value <= 5.2) {
                    score = 4;
                } else if (value < 4.6) {
                    score = 5;
                }
                setFieldsValue({lxtScore: score});
            } else if ("tqq" == option) {
                if (value <= 5.3) {
                    score = 1;
                } else if (value >= 5.4 && value <= 9.5) {
                    score = 2;
                } else if (value >= 9.6 && value <= 12.9) {
                    score = 3;
                } else if (value >= 13 && value <= 16.7) {
                    score = 4;
                } else if (value > 16.7) {
                    score = 5;
                }
                setFieldsValue({tqqScore: score});
            } else if ("phm" == option) {
                if (value >= 10.8) {
                    score = 1;
                } else if (value >= 6.2 && value <= 10.7) {
                    score = 2;
                } else if (value >= 4.3 && value <= 6.1) {
                    score = 3;
                } else if (value >= 3 && value <= 4.2) {
                    score = 4;
                } else if (value < 3) {
                    score = 5;
                }
                setFieldsValue({phmScore: score});
            }
            //计算总分，平均分，级别
            this.sumCount();
        }

    }

    sumCount = () => {
        const {getFieldValue, setFieldsValue} = this.props.form;
        var zfpScore = getFieldValue("zfpScore");
        var ldtyScore = getFieldValue("ldtyScore");
        var wqtyScore = getFieldValue("wqtyScore");
        var lxtScore = getFieldValue("lxtScore");
        var tqqScore = getFieldValue("tqqScore");
        var phmScore = getFieldValue("phmScore");
        if (zfpScore && ldtyScore && wqtyScore && lxtScore && tqqScore && phmScore) {
            var total = zfpScore + ldtyScore + wqtyScore + lxtScore + tqqScore + phmScore;
            var avg = (total / 6).toFixed(2);
            setFieldsValue({totalScore: total});
            setFieldsValue({avgScore: avg});
            //计算等级
            var level = "优秀";
            if (avg > 4.7) {
                level = "优秀";
            } else if (avg >= 3.67 && avg <= 4.17) {
                level = "良好";
            } else if (avg >= 2.50 && avg <= 3.66) {
                level = "中"
            } else if (avg < 2.50) {
                level = "中下"
            }
            setFieldsValue({level: level});
        }
    }


    checkAge = (rule, value, callback) => { //
        if (value && value > 6) {
            callback('年龄必须小于6岁');
        } else {
            callback();
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8}
            }
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 14, offset: 6},
            },
        };
        const {showSave, saveLoading, allAdTemp, listLoading, isMscheduleType} = this.state;
        return (

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item {...submitFormLayout} style={{marginTop: 5}}>
                    <div>
                        <Button type="primary" style={{float: 'right', marginLeft: 20}}>
                            <Link to={'/score/list'}>返回</Link>
                        </Button>
                        <Button type="primary" htmlType="submit" loading={saveLoading}
                                style={{float: 'right', display: this.state.showSave ? 'block' : 'none'}}>
                            保存
                        </Button>
                        <Button type="primary"
                                style={{float: 'right', display: !this.state.showSave ? 'block' : 'none'}}
                                onClick={this.changeInputStatus}>
                            编辑
                        </Button>
                    </div>
                </Form.Item>
                <Row gutter={24}>
                    <Col span={12} style={{display: 'none'}}>
                        <Form.Item label="id">
                            {getFieldDecorator('id')(
                                <Input disabled={!showSave} style={{width: '100%'}} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '输入name'}],
                            })(
                                <Input disabled={!showSave} style={{width: '100%'}} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="性别">
                            {getFieldDecorator('sex', {
                                rules: [{required: true}],
                                initialValue: "0",
                            })(
                                <Select disabled={!showSave} onChange={e => this.changeSex(e)}>
                                    <Option value="0">男</Option>
                                    <Option value="1">女</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="年龄">
                            {getFieldDecorator('age', {
                                rules: [{required: true, message: '输入年龄'}, {
                                    validator: this.checkAge,
                                }],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeAge(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="身高(cm)">
                            {getFieldDecorator('height', {
                                rules: [{required: true, message: '输入身高'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="体重(kg)">
                            {getFieldDecorator('weight', {
                                rules: [{required: true, message: '输入体重'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="学校">
                            {getFieldDecorator('schoolId', {
                                rules: [{required: true}],
                                initialValue: this.state.latestSchoolId,
                            })(
                                <Select disabled={!showSave}>
                                    {this.state.schools.map(r => <Option key={r.id} value={r.id}>{r.schoolName}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="十米折返跑(s)">
                            {getFieldDecorator('zfp', {
                                rules: [{required: true, message: '输入十米折返跑'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="十米折返跑成绩">
                            {getFieldDecorator('zfpScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="立定跳远(cm)">
                            {getFieldDecorator('ldty', {
                                rules: [{required: true, message: '输入立定跳远'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="立定跳远成绩">
                            {getFieldDecorator('ldtyScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="网球投远(cm)">
                            {getFieldDecorator('wqty', {
                                rules: [{required: true, message: '输入网球投远'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="网球投远成绩">
                            {getFieldDecorator('wqtyScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="双脚连续跳(s)">
                            {getFieldDecorator('lxt', {
                                rules: [{required: true, message: '输入双脚连续跳'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="双脚连续跳成绩">
                            {getFieldDecorator('lxtScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="坐位体前屈(cm)">
                            {getFieldDecorator('tqq', {
                                rules: [{required: true, message: '输入坐位体前屈'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="坐位体前屈成绩">
                            {getFieldDecorator('tqqScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="走平衡木(s)">
                            {getFieldDecorator('phm', {
                                rules: [{required: true, message: '输入走平衡木'}],
                            })(
                                <Input disabled={!showSave} autoComplete="off" onChange={e => this.changeValues(e)}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="走平衡木成绩">
                            {getFieldDecorator('phmScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="总分">
                            {getFieldDecorator('totalScore', {
                                rules: [{required: true}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="平均分">
                            {getFieldDecorator('avgScore', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="等级">
                            {getFieldDecorator('level', {
                                rules: [{required: true,}],
                            })(
                                <Input disabled={true} autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}