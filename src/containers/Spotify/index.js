/* eslint-disable no-undef */
/**
 *
 * Spotify
 *
 */

import React, { memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga, useInjectReducer, useInterval } from 'onyx/utils';
import { Container } from 'onyx/components';
import { Widget } from 'onyx/components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SpotifyWebApi from 'spotify-web-api-js';

import { makeSelectSpotify } from './selectors';

import { getConfig, setConfig, changeRedirect, changeClientId, changeClientSecret, connectSpotify } from './actions';

import reducer from './reducer';
import saga from './saga';

import messages from './messages';

const spotifyApi = new SpotifyWebApi();

export function Spotify({ user, spotify, setConfigFunc, getConfigFunc, changeRedirectFunc, changeClientIdFunc, changeClientSecretFunc, connectFunc }) {
  useInjectReducer({ key: 'spotify', reducer });
  useInjectSaga({ key: 'spotify', saga });

  const [state, setState] = useState({loggedIn: false, nowPlaying: { name: 'Not Checked', albumArt: ''}})

  useEffect(() => {
    getConfigFunc();
  }, [0]);

  useEffect(() => {
    if(spotify.access_token !== ''){
      spotifyApi.setAccessToken(spotify.access_token);
      setState({...state, loggedIn: true})
    } else {
      connectFunc();
      setState({...state, loggedIn: false})
    }
  }, [spotify.access_token]);

  const getCurrent = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if(response.item){
        setState({
          ...state,
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      }
    }).catch((err) => console.log('Error: ' + err))
  }

  return (
    <div>
      <Helmet>
        <title>Spotify</title>
        <meta name="description" content="Description of Spotify" />
      </Helmet>
      <Container user={user} title={<FormattedMessage {...messages.header} />}>
          {spotify && (
            <div>
              <h1>Config</h1>

              <input value={spotify.clientId} onChange={changeClientIdFunc} className="uk-input uk-form-large" type="text" placeholder="Client ID" />
              <input value={spotify.clientSecret} onChange={changeClientSecretFunc} className="uk-input uk-form-large" type="text" placeholder="Client Secret"/>
              <input value={spotify.redirect} onChange={changeRedirectFunc} className="uk-input uk-form-large" type="text" placeholder="Redirect (http://ip:port/callback)"/>
              <div className="uk-padding-small center">
                <button
                  type="button"
                  onClick={() => setConfigFunc()}
                  className="uk-button uk-button-primary uk-button-large"
                >
                  <FormattedMessage id="onyx.global.send" />
                </button>
              </div>

              <h1>Current</h1>

              <div className="center">
                Now Playing: { state.nowPlaying.name }
              </div>
              <div className="center">
                <img src={state.nowPlaying.albumArt} style={{ height: 150 }}/>
              </div>

              <div className="uk-padding-small center">
                <button
                  type="button"
                  onClick={() => getCurrent()}
                  className="uk-button uk-button-primary uk-button-large"
                >
                  Get
                </button>
              </div>
            </div>
          )}
      </Container>
    </div>
  );
}

export function SpotifyWidgetComponent({ user, spotify, connectFunc }) {
  useInjectReducer({ key: 'spotify', reducer });
  useInjectSaga({ key: 'spotify', saga });

  const [state, setState] = useState({loggedIn: false, nowPlaying: { name: 'Not Playing', albumArt: '', progress: 0, isPlaying: false}})

  useEffect(() => {
    connectFunc();
  }, [0])

  useInterval(() => {
    connectFunc();
  }, 600000);

  useInterval(() => {
    getCurrent();
  }, 1000);

  useEffect(() => {
    if(spotify.access_token !== ''){
      spotifyApi.setAccessToken(spotify.access_token);
      getCurrent()
      setState({...state, loggedIn: true})
    } else {
      connectFunc();
      setState({...state, loggedIn: false})
    }
  }, [spotify.access_token]);

  const getCurrent = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if(response.item){
        //console.log(response)
        setState({
          ...state,
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              isPlaying: response.is_playing,
              progress: (response.progress_ms/response.item.duration_ms)*100,
            }
        });
      }
    }).catch((err) => console.log(err))
  }

  const next = () => {
    spotifyApi.skipToNext().catch((err) => console.log(err))
  }

  const previous = () => {
    spotifyApi.skipToPrevious().catch((err) => console.log(err))
  }

  const play = () => {
    spotifyApi.play().catch((err) => console.log(err))
  }

  const pause = () => {
    spotifyApi.pause().then((response) => {
      console.log(response)
    }).catch((err) => console.log(err))
  }

  return (
    <div>
          {spotify && (
            <div>
              <div className="center">
                <h4>{ state.nowPlaying.name }</h4>
              </div>
              <div className="center">
                <img src={state.nowPlaying.albumArt} style={{ height: 150 }}/>
              </div>
              <div className="center">
                <progress class="uk-progress" value={state.nowPlaying.progress} max="100"></progress>
              </div>
              <div className="center">
                <button type="button" onClick={() => previous()} className={`btn ${user.color}`}><i className="fas fa-step-backward"/></button>
                {state.nowPlaying.isPlaying ? (
                  <button type="button" onClick={() => pause()} className={`btn ${user.color}`}><i className="fa fa-pause"/></button>
                ) : (
                  <button type="button" onClick={() => play()} className={`btn ${user.color}`}><i className="fa fa-play"/></button>
                )}
                <button type="button" onClick={() => next()} className={`btn ${user.color}`}><i className="fas fa-step-forward"/></button>
              </div>
            </div>
          )}
    </div>
  );
}

Spotify.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  spotify: makeSelectSpotify(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeClientIdFunc: evt => {
      if(evt && evt.target){
        dispatch(changeClientId(evt.target.value));
      }
    },
    changeClientSecretFunc: evt => {
      if(evt && evt.target){
        dispatch(changeClientSecret(evt.target.value));
      }
    },
    changeRedirectFunc: evt => {
      if(evt && evt.target){
        dispatch(changeRedirect(evt.target.value));
      }
    },
    setConfigFunc: () => {
      dispatch(setConfig());
    },
    getConfigFunc: () => {
      dispatch(getConfig());
    },
    connectFunc: () => {
      dispatch(connectSpotify());
    }
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const SpotifyWidget = compose(memo, withConnect)(SpotifyWidgetComponent);

export default compose(memo, withConnect)(Spotify);
