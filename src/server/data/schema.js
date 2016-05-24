const graphql = require('graphql');
const Promise = require('bluebird');
const MovieDb = require('moviedb');
const mdb = MovieDb(config.api_key);
const graphRelay = require('graphql-relay');

const TvType = new graphql.GraphQLObjectType({
    name: 'Show',
    fields: {
      backdrop_path: { type: graphql.GraphQLString },
      first_air_date: { type: graphql.GraphQLString },
      genre_ids: {type: new graphql.GraphQLList(graphql.GraphQLInt)},
      id: { type: graphql.GraphQLInt },
      original_language: { type: graphql.GraphQLString },
      original_name: { type: graphql.GraphQLString },
      overview: { type: graphql.GraphQLString },
      origin_country: {type: new graphql.GraphQLList(graphql.GraphQLString)},
      poster_path: { type: graphql.GraphQLString },
      popularity: { type: graphql.GraphQLFloat },
      name: { type: graphql.GraphQLString },
      vote_average: { type: graphql.GraphQLFloat },
      vote_count: { type: graphql.GraphQLInt },
      media_type: { type: graphql.GraphQLString }
    }
});

const MovieType = new graphql.GraphQLObjectType({
    name: 'Movie',
    fields: {
        adult: { type: graphql.GraphQLBoolean },
        backdrop_path: { type: graphql.GraphQLString },
        genre_ids: {type: new graphql.GraphQLList(graphql.GraphQLInt)},
        id: { type: graphql.GraphQLInt },
        original_language: { type: graphql.GraphQLString },
        original_title: { type: graphql.GraphQLString },
        overview: { type: graphql.GraphQLString },
        origin_country: {type: new graphql.GraphQLList(graphql.GraphQLString)},
        release_date: { type: graphql.GraphQLString },
        poster_path: { type: graphql.GraphQLString },
        popularity: { type: graphql.GraphQLFloat },
        title: { type: graphql.GraphQLString },
        video: { type: graphql.GraphQLBoolean },
        vote_average: { type: graphql.GraphQLFloat },
        vote_count: { type: graphql.GraphQLInt },
        media_type: { type: graphql.GraphQLString }
    }
})

const multimediaType = new graphql.GraphQLUnionType({
    name: 'MultiMedia',
    types: [TvType, MovieType],
    resolveType(val) {
        const type = val.media_type === 'tv' ? TvType : MovieType;

        return type;
    }
})


const MultiQuery = new graphql.GraphQLObjectType({
    name: 'MultiQuery',
    fields: () => ({
        page: { type: graphql.GraphQLInt },
        results: {type: new graphql.GraphQLList(multimediaType)},
        total_pages: { type: graphql.GraphQLInt },
        total_results: { type: graphql.GraphQLInt }
    })
})

const multiQuery = (name) => {
    return new Promise((resolve, reject) => {
        mdb.searchMulti({query: name }, (err, res) => {
            if (err) {return reject(err)}

            resolve(res);
        });
    })
};

export default const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      multi: {
        type: MultiQuery,
        args: {
          name: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return multiQuery(args.name)
        }
      }
    }
  })
});
