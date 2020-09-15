const pre = ISDEV ? 'http://localhost:8082' : '';
const commonUtil = {
    post: function (url, param, successcallback, errorcallback) {
        return fetch(pre + url, {
            method: "POST",
            credentials: 'include', //带上本地sessionid信息
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.getCookie("token")
            },
            body: JSON.stringify(param)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else if (errorcallback) {
                    console.error('Network response was not ok.')
                    errorcallback('Network response was not ok.');
                } else {
                    console.error('Network response was not ok.')
                }
            })
            .then(function (json) {
                if (json.code == 1) {
                    successcallback(json)
                } else {
                    console.error(json)
                    errorcallback(json);
                }
            });
    },
    postOld: function (url, param, successcallback, errorcallback) {
        return fetch(pre + url, {
            method: "POST",
            credentials: 'include', //带上本地sessionid信息
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.getCookie("token")
            },
            body: paramToFormParam(param)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else if (errorcallback) {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                    errorcallback('Network response was not ok.');
                } else {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                }
            })
            .then(function (json) {
                if (json.code == 1) {
                    successcallback(json)
                } else {
                    console.error(json)
                    errorcallback(json);
                }
            });
    },
    postOldExcel: function (url, param, successcallback, errorcallback) {
        return fetch(pre + url, {
            method: "POST",
            credentials: 'include', //带上本地sessionid信息
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.getCookie("token")
            },
            body: paramToFormParam(param)
        })
            .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "data.xls";
                a.click();
            });
    },
    postTextOld: function (url, param, successcallback, errorcallback) {
        return fetch(url, {
            method: "POST",
            credentials: 'include', //带上本地sessionid信息
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            body: paramToFormParam(param)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else if (errorcallback) {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                    errorcallback('Network response was not ok.');
                } else {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                }
            })
            .then(function (text) {
                successcallback(text)
            });
    },
    getOld: function (url, param, successcallback, errorcallback) {
        return fetch(pre + url, {
            method: "GET",
            credentials: 'include', //带上本地sessionid信息
            headers: {
                'Authorization': 'Bearer ' + this.getCookie("token")
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else if (errorcallback) {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                    errorcallback('Network response was not ok.');
                } else {
                    top.window.location.href = "/";
                    console.error('Network response was not ok.')
                }
            })
            .then(function (json) {
                successcallback(json)
            });
    },
    getUrl: function (url, initData, callback) { // 通过url获取url
        let pathUrl = '';
        if (url.indexOf("showShareOptions") > -1) {
            commonUtil.getOld("../user/getTableauTicket", {}, success => {
                let ticket = success;
                callback(initData.tableauServer + "/" + ticket + "/" + url)
            });
        } else {
            if (url.indexOf("http://") > -1) {
                callback(encodeURI(url));
            } else if (url.indexOf("bi_tools") > -1) {
                callback(encodeURI(url.replace("bi_tools", initData.biTools) + "?token=" + initData.userId))
            } else if (url.indexOf("bi_kettel") > -1) {
                callback(url.replace("bi_kettel", initData.biToolsUrlKettel) + "?token=" + initData.userId);
            } else if (url.indexOf("dbExplorer") > -1) {
                callback(url.replace("dbExplorer", initData.dbExplorer) + "?token=" + initData.userId);
            } else if (url.indexOf("iview") > -1) {
                callback('/user/temp?url=' + url);
            } else {
                callback('../resource/views/' + url);
            }
        }
    },
    getQueryString: function (name) {
        let href = window.location.href;
        if (href.indexOf(name + '=') != -1) {
            return href.substring(href.indexOf(name + '=') + (name + '=').length);
        }
        return null
    },
    getCookie: function (key) {
        const name = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookie: function (key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (6 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    },
    deleteCookie: function (key, value) {
        const d = new Date();
        d.setTime(d.getTime() - 1);
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    },
    validToken: function (successcallback) {
        return this.post('/user/vaildToken', null, success => {
            if (success.code != 1) {
                top.window.location.href = "/";
            } else {
                if (success.msg != null) {
                    successcallback(success.msg);
                } else {
                    top.window.location.href = "/";
                }
            }
        }, error => {
            top.window.location.href = "/";
        });
    },
    getGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    containValue: function (valueSt, value) {
        var arr = valueSt.split(",");
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] == value){
                return true;
            }
        }
    }

}

function paramToFormParam(param) {
    let result = "";
    Object.keys(param).forEach(key => {
        result += `${key}=${param[key]}&`
    });
    return result;
}


export default commonUtil;
