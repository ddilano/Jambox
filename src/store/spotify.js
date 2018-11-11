import Spotify from 'spotify-web-api-js';

const spotifyWebAPi = new Spotify();

const SET_CURRENTLY_PLAYING = 'SET_CURRENTLY_PLAYING';
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_SEARCH_FINDINGS = 'SET_SEARCH_FINDINGS';
const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
const CHANGE_TOTAL_VOTE = 'CHANGE_TOTAL_VOTE';
const SHIFT_QUEUE = 'SHIFT_QUEUE';

const initialState = {findings: [], queue: []};

export const setLoggedIn = (token) => ({
  type: SET_LOGGED_IN,
  token
});

export const setCurrentlyPlaying = nowPlaying => ({
  type: SET_CURRENTLY_PLAYING,
  nowPlaying
});

export const setSearchFindings = findings => ({
  type: SET_SEARCH_FINDINGS,
  findings
});

export const addToQueue = song => ({
  type: ADD_TO_QUEUE,
  song
});

export const changeTotalVote = (idToChange, newVoteCount) => ({
  type: CHANGE_TOTAL_VOTE,
  idToChange,
  newVoteCount
});

export const shiftQueue = () => ({
  type: SHIFT_QUEUE
});

export const playNextSongThunk = (song) => {
 return async (dispatch) => {
   await spotifyWebAPi.play({uris: [`spotify:track:${song.id}`]});
   dispatch(setCurrentlyPlaying(song));
   dispatch(shiftQueue());
 };
};

export const getNowPlayingThunk = (callback) => {
  return async (dispatch) => {
    const {progress_ms,item} = await spotifyWebAPi.getMyCurrentPlayingTrack();
    let nowPlaying = {};
    nowPlaying.name = item.name;
    nowPlaying.artist = item.artists[0].name;
    nowPlaying.image = item.album.images[0].url;
    nowPlaying.duration = item.duration_ms;
    nowPlaying.progress = progress_ms;
    dispatch(setCurrentlyPlaying(nowPlaying));
    callback(nowPlaying.duration);
  };
};

export const searchThunk = (q='Red Pill Blues', types=['track'], limit = '15') => {
  return async (dispatch) => {
    if (!q) {
      dispatch(setSearchFindings([]));
      return;
    }
    q = q.replace(/ /gi, '+');
    const {tracks} = await spotifyWebAPi.search(q, types, {limit});
    const {items} = tracks;

    let findings = items.map(item => {
      const result = {};
      result.artist = item.artists[0].name;
      result.name = item.name;
      result.id = item.id;
      result.image = item.album.images[0].url;
      result.duration = item.duration_ms;
      return result;
    });
    dispatch(setSearchFindings(findings));
  };
};

const spotifyReducer = (state=initialState, action) => {
  try {
    switch(action.type) {
      case SET_CURRENTLY_PLAYING:
        return {...state, nowPlaying: action.nowPlaying};
      case SET_LOGGED_IN:
        spotifyWebAPi.setAccessToken(action.token);
        return {...state, isLoggedIn: true};
      case SET_SEARCH_FINDINGS:
        return {...state, findings: action.findings};
      case ADD_TO_QUEUE:
        if (state.queue.some(song => song.id === action.song.id)) {
          return state;
        }
        const queue = [...state.queue, {...action.song, totalVotes: 0}];
        return {...state, queue};
      case CHANGE_TOTAL_VOTE:
      {
        const newQueue = state.queue.map(song => song.id === action.idToChange ? {...song, totalVotes: action.newVoteCount} : song);
        newQueue.sort((s1, s2) => s1.totalVotes < s2.totalVotes);
        return {...state, queue: newQueue};
      }
      case SHIFT_QUEUE:
      {
        const newQueue = state.queue.slice(1);
        return {...state, queue: newQueue};
      }
      default:
        return state;
    }
  } catch(err) {
    console.error(err);
  }
};

export default spotifyReducer;
