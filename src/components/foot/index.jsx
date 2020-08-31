import React from "react";
import { NavLink } from 'react-router-dom';
import "./style.less"

const FootNav = () => {



    return (
        <div className="nav-footer">
            <ul className="clear-fix">
                <li>
                    <NavLink exact to="/">
                        <i className="icon iconfont icon-shouye"></i>
                            首页
                        </NavLink>
                </li>
                <li>
                    <NavLink to="/category">
                        <i className="icon iconfont icon-category"></i>
                            分类
                        </NavLink>
                </li>
                <li>
                    <NavLink to="/cart">
                        <i className="icon iconfont icon-cart"></i>
                            购物车
                        </NavLink>
                </li>
                <li>
                    <NavLink to="/mine">
                        <i className="icon iconfont icon-mine"></i>
                            我的
                        </NavLink>
                </li>
            </ul>
        </div>
    )

}
export default FootNav;