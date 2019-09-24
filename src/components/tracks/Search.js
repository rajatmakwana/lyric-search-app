import React, { Component } from 'react'
import { Consumer } from '../../context';
import Axios from 'axios'

class Search extends Component {
    state = {
        trackTitle: ''
    }

    inputTitle = e => {
        this.setState({ trackTitle: e.target.value });
    }

    findTrack = (e, dispatch) => {
        e.preventDefault();
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=8&page=1&s_track_rating=desc&apikey=7071ebcdf37a37e9b86d36bca5f75145`)
            .then(result => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: result.data.message.body.track_list
                })
                this.setState({ trackTitle: '' });
            })
            .catch(err => console.log(err));

    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fa fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={(e) => this.findTrack(e, dispatch)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={(e) => this.inputTitle(e)}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                    Get Track Lyrics
                            </button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;