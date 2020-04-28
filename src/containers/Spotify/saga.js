import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'onyx/utils';
import { SET_CONFIG, GET_CONFIG, CONNECT } from './constants';

import {
  getConfigError,
  getConfigSuccess,
  setConfigError,
  setConfigSuccess,
  connectError,
  connectSuccess,
} from './actions';

import { makeSelectSpotify } from './selectors';

// Get Config
export function* loadGetConfig() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/neuron/spotify/config`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getConfigSuccess(result.config));
    } else if (result && result.status === 'error') {
      yield put(getConfigError(result.message));
    } else {
      yield put(getConfigError('An error has occured'));
    }
  } catch (error) {
    yield put(getConfigError(error.toString()));
  }
}

// Connect
export function* loadConnect() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/neuron/spotify/connect`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(connectSuccess(result.access_token));
    } else if (result && result.status === 'error') {
      yield put(connectError(result.message));
    } else {
      yield put(connectError('An error has occured'));
    }
  } catch (error) {
    yield put(connectError(error.toString()));
  }
}

// Set Config
export function* loadSetConfig() {
  const token = localStorage.getItem('access_token');

  const spotify = yield select(makeSelectSpotify());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/neuron/spotify/config`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        clientId: spotify.clientId,
        clientSecret: spotify.clientSecret,
        redirect: spotify.redirect,
      },
    });
    if (result && result.status === 'success') {
      yield put(setConfigSuccess());
    } else if (result && result.status === 'error') {
      yield put(setConfigError(result.message));
    } else {
      yield put(setConfigError('An error has occured'));
    }
  } catch (error) {
    yield put(setConfigError(error.toString()));
  }
}

// Individual exports for testing
export default function* spotifySaga() {
  yield takeLatest(GET_CONFIG, loadGetConfig);
  yield takeLatest(SET_CONFIG, loadSetConfig);
  yield takeLatest(CONNECT, loadConnect);
}
