import { connect } from 'react-redux';
import {searchInput, query, searchHelpers} from '../../domain/search';
import React from 'react';
import {Link} from 'react-router';

const mapStateToProps = (state, ownProps) => {
    const stateData = state.search.popular && state.search.popular.results;
    const data = stateData || [];

    return {
        popular: data,
        search: state.search
    }
}

class MovieTile extends React.Component {
    constructor(props) {
        super(props);
    }

    getMovieTile(movie) {
        return (
            <div className="col-md-3 movie-tile animated fadeInUp">
                <div className="thumbnail" style={{background: `url('${searchHelpers.getImgUrl(
                    this.props.search,
                    movie.poster_path,
                    "original"
                )}')`, backgroundSize: 'cover'}}>
                    <div className="caption">
                        <h3>{movie.title || movie.name}</h3>
                        <p className="description">{movie.overview}</p>
                        <div className="rating pull-right">
                            <p className="val"> {Math.round(movie.vote_average * 10)/10} </p>
                            <i className="material-icons">star </i>
                        </div>
                        <Link className="btn btn-primary btn-block" to={`/details/movie/${movie.id}`}>Details</Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.popular.map(movie => this.getMovieTile(movie))}
            </div>
        )
    }
}

export default connect(mapStateToProps)(MovieTile);
