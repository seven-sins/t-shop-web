import React from "react";
import FootNav from '../../components/foot/index';
import Header from '../../components/header/index';
import Swiper from "../../components/swiper/index";

import banner1 from '../../static/images/banner1.png';
import banner2 from '../../static/images/banner2.png';
import banner3 from '../../static/images/banner3.png';
import banner4 from '../../static/images/banner4.png';
import banner5 from '../../static/images/banner5.png';
import banner6 from '../../static/images/banner6.png';

const Home = (props) => {

    const cusHandler = () => {
        props.history.push("/user");
    }

 
    return (
        <div>
            <Header />
            <Swiper banners={ [banner1, banner2, banner3, banner4, banner5, banner6] } />
            <FootNav />
        </div>
    )
    
}
export default Home;

