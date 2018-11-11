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
          <div>
            {findings.map(
              f => <div key={f.id} onClick={() => this.clickResult(f)}>{f.name} - {f.artist}</div>
            )}
          </div>
        );
    } else {
      returnVal = <div>No tracks found</div>;
    }
    return (
      <div>
        <h3>Search</h3>
        <input placeholder="search something" onChange={this.searchOnChange}></input>
        {returnVal}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
