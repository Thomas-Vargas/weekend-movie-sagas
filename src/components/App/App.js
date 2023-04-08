import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import NavBar from '../Navbar/Navbar';
import EditPage from '../EditPage/EditPage';

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
        {/* Add Movie Page */}
        <Route path='/addMovie'>
          <MovieForm />
        </Route>
        {/* Edit page */}
        <Route path='/edit/:id'>
          <EditPage />
        </Route>
      </Router>
    </div>
  );
}


export default App;
