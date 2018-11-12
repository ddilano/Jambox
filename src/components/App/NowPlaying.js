import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import { getNowPlayingThunk, playNextSongThunk } from '../../store/spotify';
import ProgressBar from './ProgressBar';

const mapStateToProps = (state) => ({
  loggedIn: state.spotifyReducer.loggedIn,
  nowPlaying: state.spotifyReducer.nowPlaying,
  queue: state.spotifyReducer.queue
});

const mapDispatchToProps = (dispatch) => ({
  getNowPlayingThunk: (callback) => dispatch(getNowPlayingThunk(callback)),
  playNextSongThunk: (song) => dispatch(playNextSongThunk(song))
});

class NowPlaying extends Component {
  playNext = (ms) => {
    setTimeout(() => {
      const song = this.props.queue[0];
      this.props.playNextSongThunk(song);
      this.playNext(song.duration);
    }, ms);
  }
  componentDidMount() {
    this.props.getNowPlayingThunk(this.playNext);
  }

  render() {
    const {nowPlaying} = this.props;
    if (nowPlaying) {
      return (
        <div>
            <h3>Now Playing:</h3>
            <div>
              <img src={nowPlaying.image} className="now-playing-image"/>
              <div className="now-playing-info">{nowPlaying.name} - {nowPlaying.artist}</div>
            </div>

          <ProgressBar key={nowPlaying.id} duration={nowPlaying.duration} />
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
