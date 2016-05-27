import config from  '../config.json';
import MovieDb from 'moviedb';
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLUnionType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

const mdb = MovieDb(config.api_key);

const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        var {type, id} = fromGlobalId(globalId);

        return data[type][id];
    },
    object => {
        switch (object.media_type) {
            case 'tv':
                return 'Show';
            case 'movie':
                return 'Movie';
        }
    }
);

const creatorType = new GraphQLObjectType({
    name: 'Creator',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        profile_path: { type: GraphQLString }
    }
});

const seasonType = new GraphQLObjectType({
    name: 'Season',
    fields: {
        air_date: { type: GraphQLString },
        episode_count: { type: GraphQLInt },
        id: { type: GraphQLInt },
        poster_path: { type: GraphQLString },
        season_number: { type: GraphQLInt }
    }
});

const genType = new GraphQLObjectType({
    name: 'General',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    }
});

const countryType = new GraphQLObjectType({
    name: 'Country',
    fields: {
        iso_3166_1: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});

const langType = new GraphQLObjectType({
    name: 'Lang',
    fields: {
        iso_639_1: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});

const TvType = new GraphQLObjectType({
    name: 'Show',
    description: 'A Tv Show that matched a search',
    fields: {
        backdrop_path: { type: GraphQLString },
        first_air_date: { type: GraphQLString },
        genre_ids: {type: new GraphQLList(GraphQLInt)},
        id: { type: GraphQLInt },
        original_language: { type: GraphQLString },
        original_name: { type: GraphQLString },
        overview: { type: GraphQLString },
        origin_country: {type: new GraphQLList(GraphQLString)},
        poster_path: { type: GraphQLString },
        popularity: { type: GraphQLFloat },
        name: { type: GraphQLString },
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt },
        media_type: { type: GraphQLString }
    }
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'A Movie that matched a search',
    fields: {
        adult: { type: GraphQLBoolean },
        backdrop_path: { type: GraphQLString },
        genre_ids: {type: new GraphQLList(GraphQLInt)},
        id: { type: GraphQLInt },
        original_language: { type: GraphQLString },
        original_title: { type: GraphQLString },
        overview: { type: GraphQLString },
        origin_country: {type: new GraphQLList(GraphQLString)},
        release_date: { type: GraphQLString },
        poster_path: { type: GraphQLString },
        popularity: { type: GraphQLFloat },
        title: { type: GraphQLString },
        video: { type: GraphQLBoolean },
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt },
        media_type: { type: GraphQLString }
    }
})

const multimediaType = new GraphQLUnionType({
    name: 'MultiMedia',
    types: [TvType, MovieType],
    resolveType(val) {
        const type = val.media_type === 'tv' ? TvType : MovieType;

        return type;
    }
})


const MultiQuery = new GraphQLObjectType({
    name: 'MultiQuery',
    fields: () => ({
        page: { type: GraphQLInt },
        results: {type: new GraphQLList(multimediaType)},
        total_pages: { type: GraphQLInt },
        total_results: { type: GraphQLInt }
    })
})

const ShowQuery = new GraphQLObjectType({
    name: 'ShowQuery',
    fields: () => ({
        backdrop_path: { type: GraphQLString },
        created_by: {type: new GraphQLList(creatorType)},
        episode_run_time: {type: new GraphQLList(GraphQLInt)},
        first_air_date: { type: GraphQLString },
        genres: {type: new GraphQLList(genType)},
        homepage: { type: GraphQLString },
        id: {type: GraphQLInt},
        in_production: {type: GraphQLBoolean },
        languages: {type: new GraphQLList(GraphQLString)},
        last_air_date: { type: GraphQLString },
        name: { type: GraphQLString },
        networks: {type: new GraphQLList(genType)},
        number_of_episodes: { type: GraphQLInt },
        number_of_seasons: { type: GraphQLInt },
        origin_country: {type: new GraphQLList(GraphQLString)},
        original_language: { type: GraphQLString },
        original_name: { type: GraphQLString },
        overview: { type: GraphQLString },
        popularity: { type: GraphQLFloat },
        poster_path: { type: GraphQLString },
        production_companies: {type: new GraphQLList(genType)},
        seasons: {type: new GraphQLList(seasonType)},
        status: { type: GraphQLString },
        type: { type: GraphQLString },
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt }
    })
});

const MovieQuery = new GraphQLObjectType({
    name: 'MovieQuery',
    fields: () => ({
        adult: { type: GraphQLBoolean },
        backdrop_path: { type: GraphQLString },
        belongs_to_collection: { type: GraphQLString },
        budget: { type: GraphQLInt },
        genres: {type: new GraphQLList(genType)},
        homepage: { type: GraphQLString },
        id: {type: GraphQLInt},
        imdb_id: { type: GraphQLString },
        original_language: { type: GraphQLString },
        original_title: { type: GraphQLString },
        overview: { type: GraphQLString },
        popularity: { type: GraphQLFloat },
        poster_path: { type: GraphQLString },
        production_companies: {type: new GraphQLList(genType)},
        production_countries: {type: new GraphQLList(countryType)},
        release_date: { type: GraphQLString },
        revenue: { type: GraphQLInt },
        runtime: { type: GraphQLInt },
        spoken_languages: {type: new GraphQLList(langType)},
        status: { type: GraphQLString },
        tagline: { type: GraphQLString },
        title: { type: GraphQLString },
        video: { type: GraphQLBoolean},
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt }
    })
})

const multiQuery = (name) => {
    return new Promise((resolve, reject) =>
        mdb.searchMulti({query: name }, (err, res) => {
            console.log(res);
            if (err) {return reject(err)}

            return resolve(res);
        })
    );
};


const movieDetails = (id) => {
    return new Promise((resolve, reject) => {
        mdb.movieInfo({id: id }, (err, res) => {
            if (err) {return reject(err)}

            return resolve(res);
        });
    });
};

const showDetails = (id) => {
    return new Promise((resolve, reject) => {
        mdb.tvInfo({id: id }, (err, res) => {
            if (err) {return reject(err)}

            resolve(res);
        });
    });
}



const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            node: nodeField,
            multi: {
                type: MultiQuery,
                args: {
                    name: { type: GraphQLString }
                },
                resolve: (_, args) => multiQuery(args.name)
            },
            show: {
                type: ShowQuery,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (_, args) => movieDetails(args.id)
            },
            movie: {
                type: MovieQuery,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (_, args) => showDetails(args.id)
            }
        }
    })
});

export default schema;
