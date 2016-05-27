import {JumboTron} from '../components/jumbotron/jumbotron';
import JumboSearch from '../search/search';
import MovieTile from '../movie-tile/movie-tile';
import React from 'react';
import {connect} from 'react-redux';
import {
    clearSearchInput,
    getMovieDetails,
    getShowDetails,
    searchHelpers
} from '../../domain/search'

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(clearSearchInput());

        this.fetchSelectionDetails(
            this.props.params.type,
            this.props.params.id
        )
    }

    fetchSelectionDetails(type, id) {
        if (type === 'tv') {
            this.props.dispatch(getShowDetails(id))
        }

        this.props.dispatch(getMovieDetails(id))
    }

    render() {
        const media = this.props.details;
        const genres = media.genres || [];
        return (
            <div className="animated fadeIn">
            <JumboTron
                extraClasses={['jumbotron-xl']}
                url="http://i.imgur.com/g65f3jk.png"
                style={{
                    background: `url('${searchHelpers.getImgUrl(this.props.search, media.backdrop_path,'original')}')`
                }}
                >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="movie-description-title">
                                {media.title || media.name}
                                <small className="tagline">{media.tagline}</small>
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 details-panel-container">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h3 className="panel-title">Details</h3>
                          </div>
                          <div className="panel-body">
                            <dl className="">
                              <dt className="text-muted">Type</dt>
                              <dd>{this.props.params.type}</dd>
                              <dt className="text-muted">Run time</dt>
                              <dd>{media.runtime} minutes</dd>
                              <dt className="text-muted">Released</dt>
                              <dd>{media.release_date}</dd>
                              <dt className="text-muted">Avg. Rating</dt>
                              <dd>{media.vote_average} <small className="text-muted">of 10</small></dd>
                              <dt className="text-muted">Votes</dt>
                              <dd>{media.vote_count}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 details-panel-container">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h3 className="panel-title">Description</h3>
                          </div>
                          <div className="panel-body">
                            <p>{media.overview}</p>
                            <dl>
                              <dt className="text-muted">Genres</dt>
                              <dd>{genres.map(a => a.name, []).join(', ')}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </JumboTron>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search,
        details: state.search.details,
        params: ownProps.params
    }
}

export default connect(mapStateToProps)(Details)
