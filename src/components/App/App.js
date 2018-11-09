import React, { Component } from 'react';
// import {connect} from 'react-redux'
// import logo from './logo.svg';
import './App.css';
import Search from './Search';


class App extends Component {

  constructor() {
    super()
    this.state = {
      songs: [
        {'songName': 'Fireflies', 'artistName': 'Owl City'},
        {'songName':'Whatever It Takes', 'artistName': 'Imagine Dragons'}
      ],
      newSongName: '',
      newArtistName: ''
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(
      {
        songs: [...this.state.songs, {'songName': this.state.newSongName, 'artistName': this.state.newArtistName}],
        newSongName: '',
        newArtistName: ''
      }
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    const {songs, newSongName, newArtistName} = this.state;
    console.log(songs);

    return (
      <div>
          <div>Search results:
            <Search />
          </div>
          <form>
            <input placeholder='search' onChange={this.handleChange} name='newSongName' value={newSongName}/>
            <input placeholder='search' onChange={this.handleChange} name='newArtistName' value={newArtistName}/>
            <button type="submit" onClick={this.handleSubmit}>Add to the queue</button>
          </form>

          <table>
            <tbody>
              <tr>
                <th>Song name</th>
                <th>Artist</th>
              </tr>
              {songs.map(song => (
                <tr key={songs.indexOf(song)}>
                  <td>{song.songName}</td>
                  <td>{song.artistName}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
