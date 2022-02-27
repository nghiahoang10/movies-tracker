import React, { useState } from "react";
import axios from "axios";
import Button from "@restart/ui/esm/Button";

const UpdateMovieForm = (props) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [time, setTime] = useState('');
    const [genre, setGenre] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    return (
        <div className="add-movie-form">
            <Button className="btn btn-primary" onClick={(e) => setShowUpdateForm(!showUpdateForm)} style={{marginBottom: "10px"}}>Update</Button>
            {showUpdateForm && <form onSubmit={async (e) => {
                e.preventDefault();
                const movie = {
                    name: name,
                    year: year,
                    time: time,
                    genre: genre
                }
                console.log(props.id);
                await axios({
                    url: 'https://mern-movies-tracker.herokuapp.com/movies/update/' + props.id,
                    method: 'post',
                    headers: {'Authorization': props.token},
                    data: movie
                }).then((response) => {
                    console.log(response.data);
                })
                .catch((err) => console.log(err));
                props.getMovies();
            }}>
                <label className="form-label">Name of the movie:</label>
                <input className="form-control" type="text" placeholder="Name of the movie" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label className="form-label">Release year:</label>
                <input className="form-control" type="text" placeholder="Release year" value={year} onChange={(e) => setYear(e.target.value)}></input>
                <label className="form-label">Running time:</label>
                <input className="form-control" type="text" placeholder="Running time" value={time} onChange={(e) => setTime(e.target.value)}></input>
                <label className="form-label">Genre:</label>
                <input className="form-control" type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}></input>
                <Button type="submit" className="btn btn-outline-primary">Update</Button>
            </form>}
        </div>
    )
}

export default UpdateMovieForm