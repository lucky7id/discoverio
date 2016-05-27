import {
    multiQuery,
    configQuery,
    popularMovieQuery,
    showDetailQuery,
    movieDetailQuery
} from './http';
import ImageService from '../service/image-service';

let imgService;
const initialState = {
    query: '',
    results: [],
    config: {},
    details: {},
    popular: {}
}


// Get search results for typeahead
const multiQueryResponse = (json) => {
    return {
        type: 'MULTI_QUERY_RESPONSE',
        payload: json
    }
}

const handleMultiQueryResponse = (state = {}, action) => {
    const data = (action.payload.data && action.payload.data.multi.results) || [];
    const newState = [...state, ...data]

    return Object.assign({}, state, {results: newState})
}

export const doMultiQuery = (input) => {
    return dispatch => {
        return multiQuery(input).then(json => {
            dispatch(multiQueryResponse(json))
        });
    }
}


// Handle User Input
export const SEARCH_INPUT = 'SEARCH_INPUT';
export const searchInput = (query) => {
    return {
        type: SEARCH_INPUT,
        payload: query
    }
}

const handleSearchInput = (state = '', action) => {
    return action.payload || state;
}

export const query = (input) => {
    return dispatch => {
        multiQuery(input).then(json => {
            dispatch(multiQueryResponse(json))
        });
    }
}

// Handle User Input
export const CLEAR_SEARCH_INPUT = 'CLEAR_SEARCH_INPUT';
export const clearSearchInput = () => {
    return {
        type: CLEAR_SEARCH_INPUT,
        payload: {}
    }
}

const handleClearSearchInput = (state = {}, action) => {
    const newState = Object.assign({}, state.results, {results:[]});

    return Object.assign({}, state, newState)
}



// base config lifecycle
const CONFIG_RESPONSE = 'CONFIG_RESPONSE';
const configResponse = (data) => {
    return {
        type: CONFIG_RESPONSE,
        payload: data
    }
}

const handleConfig = (state = {}, action) => {
    return Object.assign({}, state, {config: action.payload})
}

export const getConfig = () => {
    return dispatch => {
        configQuery().then(json => {
            imgService = new ImageService(json);
            dispatch(configResponse(json))
        });
    }
}

// Popular movie lifecycle
const POPULAR_MOVIE_RESPONSE = 'POPULAR_MOVIE_RESPONSE';
const popularMovieResponse = (data) => {
    return {
        type: POPULAR_MOVIE_RESPONSE,
        payload: data
    }
}

const handlePopularMovies = (state = {}, action) => {
    return Object.assign({}, state, {popular: action.payload})
}

export const getPopularMovies = () => {
    return dispatch => {
        popularMovieQuery().then(json => {
            dispatch(popularMovieResponse(json))
        });
    }
}

// Popular movie lifecycle
const MOVIE_DETAILS_RESPONSE = 'MOVIE_DETAILS_RESPONSE';
const movieDetailsResponse = (data) => {
    return {
        type: MOVIE_DETAILS_RESPONSE,
        payload: data
    }
}

const handleMovieDetails = (state = {}, action) => {
    return Object.assign({}, state, {details: action.payload})
}

export const getMovieDetails = (id) => {
    return dispatch => {
        movieDetailQuery(id).then(json => {
            dispatch(movieDetailsResponse(json))
        });
    }
}

// Show us the World
export const searchReducer = (state = initialState, action) => {
    if (action.type === 'MULTI_QUERY_RESPONSE') {
        return handleMultiQueryResponse(state, action);
    }

    if (action.type === CLEAR_SEARCH_INPUT) {
        return handleClearSearchInput(state, action);
    }

    if (action.type === SEARCH_INPUT) {
        return handleSearchInput(state, action);
    }

    if (action.type === CONFIG_RESPONSE) {
        return handleConfig(state, action);
    }

    if (action.type === POPULAR_MOVIE_RESPONSE) {
        return handlePopularMovies(state, action);
    }

    if (action.type === MOVIE_DETAILS_RESPONSE) {
        return handleMovieDetails(state, action);
    }

    return state;
}


//UI Helpers that need to know about state
const getImgUrl = (state, url, size) => {
    return imgService.expandImgUrl(url, size);
}

export const searchHelpers = {
    getImgUrl
}
