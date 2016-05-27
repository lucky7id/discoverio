import { connect } from 'react-redux';
import {Link} from 'react-router'
import React from 'react';
import {
    searchInput,
    query,
    searchHelpers,
    getPopularMovies,
    getMovieDetails,
    getShowDetails,
    clearSearchInput
} from '../../domain/search';


class JumboSearchComp extends React.Component {
    constructor(props) {
        super(props);
        this.getSearchResults= this.getSearchResults.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.props.dispatch(getPopularMovies())
    }

    renderResults(results) {
        const hasResults = results.length

        if (!hasResults) {return;}

        return (
            <ul className={`dropdown-menu ${hasResults ? 'visible' : ''}`}>
                {results.map((result, index) => {
                    if (!result.title && !result.name) {return ''}

                    return (
                        <li tabindex={index}>
                            <Link
                                to={`/details/${result.media_type}/${result.id}`}
                                key={index}>
                                <div className="media search-result">
                                    <div className="media-left">
                                          <img className="media-object" src={
                                              searchHelpers.getImgUrl(
                                                  this.props.search,
                                                  result.poster_path,
                                                  'w92'
                                              )
                                          } alt="..." />
                                    </div>
                                    <div className="media-body">
                                        <h5>{result.title || result.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }

    getSearchResults(e) {
        const hasVal = e.target.value;
        if (!hasVal) {
            this.props.dispatch(searchInput(e.target.value));

            return;
        }

        this.props.dispatch(query(e.target.value));
    }

    clearSearch(e) {
        e.target.value = '';
    }

    render() {
        return (
            <div>
                <div className="input-group">
                  <input type="text" className="form-control"
                    placeholder="Discover a new movie with a word..."
                    onBlur={(e) => this.clearSearch(e) }
                    onChange={(e) => this.getSearchResults(e)}/>
                  <span className="input-group-addon">
                    <i className="material-icons">search</i>
                  </span>
                </div>
                <div className="dropdown">
                    { this.renderResults(this.props.search.results) }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(JumboSearchComp);
