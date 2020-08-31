import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';
import Mine from '../pages/mine/Mine';
import ShoppingCart from '../pages/shoppingcart/ShoppingCart';
import Category from '../pages/category/Category';
import NotFound from '../pages/notfound/NotFound';

const AppRouter = () => {



 
    return (
        <Router>
            <Switch>
                <Route exact={ true } path="/" component={ Home }></Route>
                <Route path="/mine" component={ Mine }></Route>
                <Route path="/cart" component={ ShoppingCart }></Route>
                <Route path="/category" component={ Category }></Route>
                <Route path="*" component={ NotFound }></Route>
            </Switch>
        </Router>
    )
    
}
export default AppRouter;