import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App'

import Home from './pages/home/Home';
import User from './pages/gb/sys/User';
// import NotFound from './pages/common/NotFound';

export default (
    <div className="App">
        <Route exact={ true } path="/" component={ Home }></Route>
        <Route path="/user" component={ User }></Route>
        {/* <Route component={ NotFound }></Route> */}
    </div>
)