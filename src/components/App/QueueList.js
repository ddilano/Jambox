import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeTotalVote} from '../../store/spotify';

const mapStateToProps = state => ({
  queue: state.spotifyReducer.queue
});

const mapDispatchToProps = dispatch => ({
  changeTotalVote: (idToChange, newVoteCount) => dispatch(changeTotalVote(idToChange, newVoteCount))
})

class QueueList extends Component {

  clickResult = (event, song) => {
    event.preventDefault();
    let newVote = song.totalVotes;
    event.target.name === 'Upvote' ? newVote++ : newVote--;
    this.props.changeTotalVote(song.id, newVote);
  }

  render(){
    const {queue} = this.props;
    let queueList;
    if (queue.length) {
      queueList = (
        <div>
          {queue.map(
            q => (
              <div key={q.id}>
                <img src={q.image} style={{width: 45}}/> {q.name} - {q.artist} - {q.totalVotes}
                <button type='button' name='Upvote' onClick={(event) => this.clickResult(event, q)}>↑</button>
                <button type='button' name='Downvote' onClick={(event) => this.clickResult(event, q)}>↓</button>
              </div>
            )
          )}
        </div>
      )
    } else {
      queueList = <div>No songs in the queue!</div>
    }

    return (
      <div>
        <h3>Queue List</h3>
        {queueList}
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueList);
