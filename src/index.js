import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('POST_NEW_MOVIE', postNewMovie);
    yield takeEvery('UPDATE_MOVIE', updateMovie);
}

function* updateMovie(action) {
    try {
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch (error) {
        console.log('Error updating movie error', error)
    }
}

function* postNewMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch (error) {
        console.log('get single movie error', error)
    }
}

function* fetchMovieDetails(action) {
    // get single movie details
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`);
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data[0]});
    } catch (error) {
        console.log('get single movie error', error)
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        case 'CLEAR_MOVIE_DETAILS':
            return {};
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
