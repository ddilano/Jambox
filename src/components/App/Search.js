import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchThunk} from '../../store';
// import logo from './logo.svg';
import './App.css';

const mapStateToProps = state => ({
  songs: state.searchResults
});

const mapDispatchToProps = dispatch => {
  return {
    searchThunk: () => dispatch(searchThunk())
  }
};

class Search extends Component {

  componentDidMount() {
    this.props.searchThunk();
  };

  // constructor() {
  //   super()
  //   this.state = {
  //     newSongName: '',
  //     newArtistName: ''
  //   }
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.setState(
  //     {
  //       songs: [...this.state.songs, {'songName': this.state.newSongName, 'artistName': this.state.newArtistName}],
  //       newSongName: '',
  //       newArtistName: ''
  //     }
  //   );
  // };

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // };

  render() {
    const {songs} = this.props;

    return (
      <div>
          <form>
            <input placeholder='make a search' onChange={this.handleChange} />
            <input placeholder='add artist name' onChange={this.handleChange} />
            <button type="submit" onClick={this.handleSubmit}>Add to the queue</button>
          </form>

          <table>
            <tbody>
              <tr>
                <th>Song name</th>
                <th>Artist</th>
              </tr>
              {songs.map(song =>
                <tr key={songs.indexOf(song)}>
                  <td>{song.songName}</td>
                  <td>{song.artistName}</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
