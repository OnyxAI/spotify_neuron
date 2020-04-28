/*
 *
 * Spotify reducer
 *
 */
import produce from 'immer';

import {
  SET_CONFIG_ERROR,
  GET_CONFIG_ERROR,
  GET_CONFIG_SUCCESS,
  CHANGE_REDIRECT,
  CHANGE_CLIENT_ID,
  CHANGE_CLIENT_SECRET,
  CONNECT_SUCCESS,
} from './constants';

export const initialState = {
  errorText: '',
  config: {},
  clientId: '',
  clientSecret: '',
  redirect: '',
  access_token: '',
};

/* eslint-disable default-case, no-param-reassign */
const spotifyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_REDIRECT:
        draft.redirect = action.redirect;
        break;
      case CHANGE_CLIENT_ID:
        draft.clientId = action.clientId;
        break;
      case CHANGE_CLIENT_SECRET:
        draft.clientSecret = action.clientSecret;
        break;
      case SET_CONFIG_ERROR:
        draft.errorText = action.error;
        break;
      case CONNECT_SUCCESS:
        draft.access_token = action.token;
        break;
      case GET_CONFIG_SUCCESS:
        draft.config = action.config;
        draft.redirect = action.config.redirect;
        draft.clientId = action.config.clientId;
        draft.clientSecret = action.config.clientSecret;
        break;
      case GET_CONFIG_ERROR:
        draft.errorText = action.error;
    }
  });

export default spotifyReducer;
