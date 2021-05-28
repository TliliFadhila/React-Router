import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
// import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import AddMovie from "./component/AddMovie";
import Filter from "./component/Filter";
import MovieList from "./component/MovieList";
import Description from './component/Description'
import { moviedata } from './data';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
const [movieList , setMovieList ] = useState(moviedata)
const [title, setTitle] = useState("")
const [rate, setRate] = useState(0)

const handleChange = (e) => {
  setTitle(e.target.value);
};

const ratingChanged = (newRating) => {
  setRate(newRating)
};
const handleAdd = (newMovie) => {
  setMovieList([...MovieList, newMovie])
};


  return (
    <div className="App">
      <Router>
      <Filter handleChange={handleChange} title ratingChanged={ratingChanged}/>
      <Route path="/" exact render={() =>
      <MovieList
      movieList={movieList.filter((movie)=>
        movie.title.trim().toUpperCase().includes(title.toUpperCase()) && movie.rate>=rate
        )}
      />}/>
      
      <AddMovie handleAdd={handleAdd}/>
      <Route
            path="/movieCard/:id"
            render={(props) => <Description {...props} movieList={movieList} exact/>}
          />
      </Router>
    </div>

  );
}

export default App;
