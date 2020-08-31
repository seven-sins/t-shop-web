import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/common.less';
import './static/font/iconfont.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import routes from './routes';

// import rootReducer from './reducers/index';

import AppRouter from './router/AppRouter';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

// ReactDOM.render(
//     <Provider store= { store }>
//         <Router routes={ routes }>
//             { routes }
//         </Router>
//     </Provider>
//     , 
//     document.getElementById('root'));


ReactDOM.render(
    <AppRouter />
    , 
    document.getElementById('root'));
