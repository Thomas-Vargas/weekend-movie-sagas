import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import NavBar from '../Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path='/details/:id'>
          <MovieDetails />
        </Route>
        {/* add movie route, improve form, add cancel button */}
        <Route path='/addMovie'>
          <MovieForm />
        </Route>
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
