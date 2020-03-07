import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import APP from './App';
import Frame from './Frame';
import MenuList from './source/MenuList'
import UserList from './source/UserList'
import RoleList from './source/RoleList'
import SchoolList from './source/SchoolList'
import ScoreList from './source/ScoreList'
import ScoreDetail from './source/ScoreDetail'

const RouterView = () => (
    <Router>
        <div>
            <Route exact path="/" component={APP}/>
            <Route path="/index" component={Frame}/>
            <Route path="/menu/list" component={MenuList}/>
            <Route path="/role/list" component={RoleList}/>
            <Route path="/user/list" component={UserList}/>
            <Route path="/school/list" component={SchoolList}/>
            <Route path="/score/list" component={ScoreList}/>
            <Route path="/score/detail" component={ScoreDetail}/>
        </div>
    </Router>
)
export default RouterView;

