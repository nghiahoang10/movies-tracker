import React, { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';
import AddMovieForm from "../components/AddMovieForm";
import UpdateMovieForm from './UpdateMovieForm';

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const getMovies = () => {
        if (props.authenticated) {
            axios({
                url: 'https://mern-movies-tracker.herokuapp.com/movies/',
                method: 'get',
                headers: {'Authorization': props.token}
            }).then((response) => {
                setMovies(response.data);
            })
            .catch((err) => console.log(err));
        }
    }
    const deleteMovies = (id) => {
        if (props.authenticated && id) {
            axios({
                url: 'https://mern-movies-tracker.herokuapp.com/movies/' + id,
                method: 'delete',
                headers: { 'Authorization': props.token }
            }).then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));
            setMovies(movies.filter(movie => movie._id !== id));
        }
    }
    useEffect(getMovies, []);
    return (
        <div>
            {props.authenticated && <Button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)} style={{marginTop: "20px", marginBottom: "10px"}}>Add movie</Button>}
            {showAddForm && <AddMovieForm token={ props.token } id={ props.id } authenticated={ props.authenticated } getMovies={ getMovies } />}
            <Container style={{marginTop: "20px"}}>
                <ListGroup>
                    {movies.map(movie => 
                        <ListGroupItem> 
                            <Container>
                                <div className="row">
                                    <div className="col-md-8" style={{textAlign: "left"}}>
                                        <div>Name: { movie.name }</div> <div>Release year: { movie.year }</div> <div>Running time: { movie.time }</div> <div>Genre: {movie.genre}</div>
                                    </div>
                                    <div className="col-md-4"><Button className="btn btn-danger" onClick={ () => deleteMovies(movie._id) }>Delete</Button></div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <UpdateMovieForm token={ props.token } id={movie._id} getMovies={ getMovies }/>
                                    </div>
                                </div>
                            </Container>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        </div>
    )
}

export default MovieList;