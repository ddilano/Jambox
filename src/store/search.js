

const SET_RESULTS = 'SET_RESULTS'

const initialState = [];

const searchResults = [{'songName': 'Hymn For The Weekend', 'artistName': 'Coldplay'},
{'songName':'Good Life', 'artistName': 'One Republic'},
{'songName':'IDGAF', 'artistName': 'Dua Lipa'},
{'songName':'Viva La Vida', 'artistName': 'Coldplay'},
{'songName':'Viva La Vida', 'artistName': '2 Cellos'}];

export const setResults = results => ({
  type: SET_RESULTS,
  results
});

export const searchThunk = () => {
  return (dispatch) => {
    dispatch(setResults(searchResults));
  }
};

const searchReducer = (state=initialState, action) => {
  try {
    switch(action.type) {
      case SET_RESULTS:
        return [...state, ...action.results];
      default:
        return state;
    }
  } catch(err) {
    console.error(err);
  }
}

export default searchReducer
