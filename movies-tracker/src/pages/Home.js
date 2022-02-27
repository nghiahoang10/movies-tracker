import React from "react";
import { useLocation } from "react-router-dom";
import MovieList from "../components/MoviesList";

const Home = () => {
    const location = useLocation();
    const token = (location.state ? location.state.token : null);
    const id = (location.state ? location.state.userID : null);
    const authenticated = (location.state ? location.state.authenticated : false);
    return (
        <div>
            {!authenticated && <div style={{fontSize: "30px", marginTop: "30px"}}>Login or register to use</div>}
            <MovieList token={ token } id={ id } authenticated={ authenticated } />
        </div>
    )
}

export default Home