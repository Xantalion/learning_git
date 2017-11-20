// Содержимое App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  addTrack() {
    console.log('addTrack', this.trackInput.value);
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  }

  findTrack(){
    console.log('findTrack', this.searchInput.value);
    this.props.onFindTrack(this.searchInput.value);
  }

  render() {
    console.log(this.props.testStore);
    return (
      <div>
        <div>
          <input type="text" ref={ (input)=> {this.trackInput = input} }/>
          <button onClick={this.addTrack.bind(this)}>Add track</button>
        </div>
        <div>
          <input type="text" ref={ (input)=> {this.searchInput = input} }/>
          <button onClick={this.findTrack.bind(this)}>Find track</button>
        </div>
        <ul>
          {this.props.tracks.map((track, index) =>
            <li key={index}>{track.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks))
  }),
  dispatch => ({
    onAddTrack: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      }
      dispatch({ type: 'ADD_TRACK', payload });
    },
    onFindTrack: (name) => {
      console.log('name', name);
      dispatch({ type: 'FIND_TRACK', payload: name });
    }
  })
)(App);

// Содержимое reducers/tracks.js
const initialState = [];

export default function tracks(state = initialState, action) {
  if (action.type === 'ADD_TRACK') {
    return [
      ...state,
      action.payload
    ];
  } else if (action.type === 'DELETE_TRACK') {
    return state;
  }
  return state;
}


// Содержимое reducers/filterTracks.js
const initialState = '';
export default function filterTracks(state = initialState, action) {
  if (action.type === "FIND_TRACK"){
    return action.payload;
  }
  return state;
}


// Содержимое reducers/index.js
import { combineReducers } from 'redux';
import tracks from './tracks';
import playlists from './playlists';
import filterTracks from './filterTracks';

export default combineReducers({
  tracks,
  playlists,
  filterTracks
});
