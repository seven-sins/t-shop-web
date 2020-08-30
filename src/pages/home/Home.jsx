import React from "react";

const Home = (props) => {

    const cusHandler = () => {
        props.history.push("/user");
    }

 
    return (
        <div>home
            <button onClick={ cusHandler }>to user</button>
        </div>
    )
    
}
export default Home;