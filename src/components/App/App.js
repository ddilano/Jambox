import React, { Component } from 'react';
import {connect} from 'react-redux';
import { subscribeToTimer } from './api';
// import logo from './logo.svg';
import './App.css';
import NowPlaying from './NowPlaying';
import Search from './Search';
import QueueList from './QueueList';
import getHashParams from '../../utils.js';
import {setLoggedIn} from '../../store/spotify';

const mapStateToProps = state => ({
  isLoggedIn: state.spotifyReducer.isLoggedIn
})
const mapDispatchToProps = dispatch => ({
  setLoggedIn: (token) => dispatch(setLoggedIn(token))
});

class App extends Component {
  componentDidMount(){
    const params = getHashParams();
    if (params.access_token) {
      this.props.setLoggedIn(params.access_token);
      window.history.pushState('home', 'Title', '/');
    };
  }

  render() {

    let returnVal = (
    <a href="https://jambox-server.herokuapp.com/login">
      <button>Login with spotify</button>
    </a>);
    if (this.props.isLoggedIn){
      returnVal = (
        <div>
          <NowPlaying />
          <Search />
          <QueueList />
        </div>);
    }
    return (
      <div>
        <div className="jambox">JAMBOX</div>

        {returnVal}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
