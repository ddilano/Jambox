import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchThunk, addToQueue} from '../../store/spotify';
import './App.css';

const mapStateToProps = state => ({
  findings: state.spotifyReducer.findings
});

const mapDispatchToProps = dispatch => ({
  searchThunk: (q, types, limit) => dispatch(searchThunk(q, types, limit)),
  addToQueue: (song) => dispatch(addToQueue(song))
});

class Search extends Component {

  searchOnChange = (event) => {
    let q = event.target.value;
    this.props.searchThunk(q);
  };

  clickResult = (song) => {
    this.props.addToQueue(song);
  }

  render() {
    const {findings} = this.props;

    let returnVal;
    if (findings.length) {
        returnVal = (
          <div className="search-bar">
            {findings.map(
              f => <div key={f.id} onClick={() => this.clickResult(f)}>{f.name} - {f.artist}</div>
            )}
          </div>
        );
    } else {
      returnVal = <div className="search-results">No songs found</div>;
    }
    return (
      <div>
        <h3>Search</h3>
        <input placeholder="Search a song, an album or artist" onChange={this.searchOnChange} className="search-bar"></input>
        {returnVal}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
