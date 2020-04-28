import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectSpotifyDomain = state => state.spotify || initialState;

const makeSelectSpotify = () =>
  createSelector(
    selectSpotifyDomain,
    substate => substate,
  );

export { makeSelectSpotify };
