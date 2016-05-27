import config from '../../config/config.json';

export const multiQuery = (query) => {
    return fetch(`${config.api_base_url}/graphql?query={
        multi(name: "${query}"){
            results{
                ... on Movie {
                    id
                    title,
                    poster_path,
                    original_title,
                    release_date,
                    media_type
                }
                ... on Show {
                    id
                }
            }
        }
    }`, {method: 'POST'}).then(response => {
        if (response.ok) {
            return response.json().then(json => {
                return json;
            });
        }
    })
}


export const configQuery = (query) => {
    const location = `http://api.themoviedb.org/3/configuration?api_key=${config.api_key}`

    return baseQuery(location);
}

export const popularMovieQuery = (query) => {
    const location = `http://api.themoviedb.org/3/movie/popular?api_key=${config.api_key}`;

    return baseQuery(location);
}

export const movieDetailQuery = (id) => {
    const location = `http://api.themoviedb.org/3/movie/${id}?api_key=${config.api_key}`

    return baseQuery(location);
}

export const showDetailQuery = (id) => {
    const location = `http://api.themoviedb.org/3/tv/${id}?api_key=${config.api_key}`

    return baseQuery(location);
}

const baseQuery = (url) => {
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json().then(json => {
                return json;
            });
        }
    })
}
