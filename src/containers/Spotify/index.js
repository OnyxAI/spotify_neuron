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
import widgetStyle from '../../assets/css/widget.css'
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

export function SpotifyWidgetComponent({ user, spotify, connectFunc, ...props }) {
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

  const shuffle = () => {
    spotifyApi.setShuffle().catch((err) => console.log(err))
  }

  const repeat = () => {
    spotifyApi.setRepeat().catch((err) => console.log(err))
  }

  const pause = () => {
    spotifyApi.pause().then((response) => {
      console.log(response)
    }).catch((err) => console.log(err))
  }

  return (
    <Widget className="spotify-widget" style={props.style}>
          {spotify && (
            <div>
                <div className="spotify-header">
                  <svg id="logo">
                    <use xlinkHref="#spotify-logo"></use>
                  </svg>
                </div>
                <div className="spotify-cover-wrapper">

                  <div className="spotify-cover default" >
                    <img src={state.nowPlaying.albumArt} />
                    <div className="spotify-artist">
                      <h1 className="spotify-artist--title"></h1>
                    </div>
                  </div>

                </div>
                <div className="spotify-player-wrapper">
                  <div className="spotify-player">
                    <div className="spotify-player--prev icon-small" onClick={() => previous()}>
                      <svg id="prev" className="default">
                        <use xlinkHref="#icon-prev"></use>
                      </svg>
                      <svg id="prev" className="hover">
                        <use xlinkHref="#icon-prev"></use>
                      </svg>
                    </div>
                    <div className="spotify-player--play icon-big">
                      {state.nowPlaying.isPlaying ? (
                        <div onClick={() => pause()}>
                          <svg id="pause">
                            <use style={{fill: 'inherit'}} xlinkHref="#icon-pause"></use>
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => play()}>
                          <svg id="play">
                            <use style={{fill: 'inherit'}} xlinkHref="#icon-play"></use>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="spotify-player--next icon-small" onClick={() => next()}>
                      <svg id="next" className="default">
                        <use xlinkHref="#icon-next"></use>
                      </svg>
                       <svg id="next" className="hover">
                        <use xlinkHref="#icon-next"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="spotify-artist-wrapper">
                    <div className="spotify-artist--play">
                      <div className="spotify-artist--name black-text">{ state.nowPlaying.name }</div>
                      <div className="spotify-artist--song"></div>
                      <div className="spotify-artist--song_time" style={{width: state.nowPlaying.progress * 270 / 100}}>
                        <span></span>
                      </div>
                    </div>
                </div>
                <div className="spotify-footer-wrapper">
                  <div className="spotify-footer">
                    <div className="spotify-footer--icons">
                      <div className="spotify-shuffle" onClick={() => shuffle()}>
                        <svg id="shuffle">
                          <use xlinkHref="#icon-shuffle"></use>
                        </svg>
                      </div>
                      <div className="spotify-replay" onClick={() => repeat()}>
                        <svg id="playagain">
                          <use xlinkHref="#icon-playagain"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>



              <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="colored">
                    <feComponentTransfer color-interpolation-filters="sRGB">
                          <feFuncR type="table" tableValues="0.14117647058824 0.92156862745098"></feFuncR>
                          <feFuncG type="table" tableValues="0.12549019607843 0.11764705882353"></feFuncG>
                          <feFuncB type="table" tableValues="0.4156862745098 0.19607843137255"></feFuncB>

                      </feComponentTransfer>
                  </filter>
                </defs>
                <symbol id="icon-shuffle" viewBox="0 0 100 100">
                  <g>
                    <path d="M75.466,33.469H79v10.063l21-18l-21-18v11.937h-3.534c-18.469,0-28.883,13.687-38.07,25.762
                      c-8.264,10.859-15.398,20.238-26.93,20.238H0v14h10.466c18.471,0,28.883-13.686,38.072-25.762
                      C56.8,42.847,63.937,33.469,75.466,33.469z M27.056,42.289c0.786-1.019,1.58-2.061,2.382-3.114c1.953-2.567,4.02-5.279,6.256-7.979
                      C29.09,25.025,21.12,20.468,10.466,20.468H0v14h10.466C17.102,34.469,22.279,37.584,27.056,42.289z M79,66.469h-3.534
                      c-7.036,0-12.435-3.503-17.453-8.694c-0.503,0.657-1.008,1.319-1.516,1.987c-2.205,2.898-4.577,6.008-7.194,9.085
                      c6.785,6.621,15.002,11.622,26.163,11.622H79v12l21-18l-21-18V66.469z"/>
                  </g>
                </symbol>

                <symbol id="icon-playagain" viewBox="0 0 100 100">
                  <g>
                    <path d="M70,26H20V16L0,33l20,16v-9h50V26z M100,68L80,51v10H30v14h50v9L100,68z"/>
                  </g>
                </symbol>

                <symbol id="icon-add" viewBox="0 0 58 58">
                  <g>
                    <path d="M55,24H34V3c0-2.762-2.238-3-5-3s-5,0.238-5,3v21H3c-2.762,0-3,2.238-3,5s0.238,5,3,5h21v21
                                                   c0,2.762,2.238,3,5,3s5-0.238,5-3V34h21c2.762,0,3-2.238,3-5S57.762,24,55,24z"/>
                  </g>
                </symbol>

                <symbol id="spotify-logo" viewBox="-206 -364.5 256 85">
                  <g id="layer1" transform="translate(1427.1504,-1141.058)" >
              	<g id="g3128" transform="matrix(0.37570303,0,0,0.37570303,-1141.6023,902.42898)">
              		<g id="g3013" transform="matrix(0.1991992,0,0,0.1991992,-607.5723,641.78634)">
              			<path id="path3017" className="st1" d="M-2278.7-4155.9
              				c-5.4-4.1-3.4-8.5-0.1-12.3l46.7-55.1c3.8-4.2,7.4-3.7,11.7,0.1c42,36.2,79.8,57.4,139.9,57.4c38.5,0,76.9-14.7,76.9-53.3
              				c0-12.7-4.2-23.5-11.8-31.1c-48.4-49.1-248.2-23.7-248.2-179c0-67.9,49.4-142.8,166.7-142.8c71.7,0,126.1,25,168.6,58
              				c6.4,5.1,4.8,8.6,1.7,12.5l-41.2,58.2c-4,5.1-6.6,5.2-14.1,0c-24.1-18.6-65.7-43.5-117.5-43.5c-42.8,0-70.3,19.5-70.3,50.6
              				c0,92.8,260,33.3,260,210c0,85.6-66.3,144.8-172.1,144.8C-2156.6-4081.2-2221-4106.5-2278.7-4155.9z"/>
              			<path id="path3019"  className="st1" d="M-1674.1-4458.1c-57.2,0-86.8,25.9-112.5,53.4v-38.4
              				c0-5-2-7.4-7.2-7.4h-76.3c-7.8,0-8.8,2-8.8,8.8v452.9c0,5.2,2,7.5,7.5,7.5h76c5.8,0,8.8-1.9,8.8-8.8v-141.5
              				c19.7,25.3,58.8,51.2,112.2,51.2c83.8,0,170.1-62.3,170.1-188.4C-1504.4-4403.1-1598.2-4458.1-1674.1-4458.1z M-1692.5-4376.1
              				c47.4,0,94.4,37.3,94.4,107.8c0,63.2-41.3,105.8-94.4,105.8c-57,0-96-50.6-96-106.4C-1788.5-4324.3-1752.1-4376.1-1692.5-4376.1z
              				"/>
              			<g id="flowRoot3023" transform="matrix(13.258321,0,0,13.518561,-7360.2406,-3893.01)">
              				<path id="path3032" className="st1" d="
              					M472.7-27.8v-0.1c0-1.9-0.4-3.8-1.1-5.5c-0.7-1.7-1.7-3.2-3-4.4c-1.3-1.3-2.8-2.2-4.6-3c-1.8-0.7-3.7-1.1-5.8-1.1
              					c-2.1,0-4.1,0.4-5.8,1.1c-1.8,0.7-3.3,1.7-4.6,3c-1.3,1.3-2.3,2.8-3.1,4.4c-0.7,1.7-1.1,3.5-1.1,5.5v0.1c0,1.9,0.4,3.8,1.1,5.5
              					c0.7,1.7,1.8,3.2,3,4.4c1.3,1.3,2.8,2.2,4.6,3c1.8,0.7,3.7,1.1,5.8,1.1c2.1,0,4.1-0.4,5.8-1.1c1.8-0.7,3.3-1.7,4.6-3
              					c1.3-1.3,2.3-2.8,3.1-4.4C472.3-24,472.7-25.9,472.7-27.8L472.7-27.8z M458.1-19.9c-5,0-7.7-4.3-7.7-8c0-4.5,3.3-7.9,7.5-7.9
              					c3.8,0,7.7,2.9,7.7,8C465.7-22.8,462-19.9,458.1-19.9L458.1-19.9z"/>
              			</g>
              			<path id="path3034" className="st1" d="
              				M-912.9-4165.5c20.2,0,35.4-6.7,42.9-10.1c7.2-4,12.4-2.1,12.4,5.8v62.8c0,3.9-2.1,6-5.4,7.8c-20.4,10.2-40.9,17.5-73.7,17.5
              				c-71.7,0-106.8-39-106.8-106.9v-180.9h-37.7c-4.9,0-6.3-2.6-6.3-6.3v-69.7c0-3.2,1.6-5,5-5h39v-88.6c0-4.1,1.4-7.5,7.5-7.5h76.6
              				c6.7,0,8.8,2.8,8.8,8.8v87.3h87.6c3.8,0,6.7,2,6.7,7.5v66c0,5.1-2.3,7.5-7.5,7.5h-86.7v164.6
              				C-950.6-4183-944.3-4165.5-912.9-4165.5z"/>
              			<path id="path3036" className="st1" d="M-812.4-4088.2
              				c-5,0-7.5-2.4-7.5-7.5v-347.4c0-4.8,2-7.5,7.5-7.5h77.8c5.9,0,7.7,3.3,7.7,7.6v347.3c0,5.9-2.6,7.5-7.5,7.5H-812.4z"/>

              				<path id="path3038" className="st1" d="
              				M-715.1-4552.6c0,31.9-25.9,57.8-57.8,57.8s-57.8-25.9-57.8-57.8c0-31.9,25.8-57.8,57.8-57.8S-715.1-4584.5-715.1-4552.6z"/>

              				<path id="path3040" className="st1" d="
              				M-639-4088.2c-4.3,0-6.3-2.4-6.3-6.3v-275.1H-683l-6.3-6.3v-68.3c0-4.3,1.3-6.4,6.3-6.4h37.7v-17c0-67,27.1-121.5,113.9-121.5
              				c26.8,0,54.5,6.3,64.9,8.9c4.4,1.4,5.9,3.3,5.9,7.1v66.6c0,6.8-4.9,8-13.4,5c-6.6-2.3-22.2-6.7-39.2-6.7
              				c-32.2,0-41.6,19-41.6,48.2v9.4h136.9c3.8,0,5.5,1.5,7.6,7.1l92.3,242l83.9-240.4c2.2-6.1,3.5-8.1,8.4-8.1h81.6
              				c7.9,0,7.8,5.5,4.7,13l-136.8,354.7c-20.4,46.7-40.3,102.7-121.8,102.7c-39,0-60-9.2-85.8-21.3c-6-2.7-3.3-8.7-0.1-14.8
              				l23.7-52.2c2.7-6.1,6.8-5.2,12.2-2.6c6.5,3.2,22.8,11.3,41.2,11.3c23.8,0,33.7-15.1,43-34.5l-114.7-275.8h-75.4v275.1
              				c0,4.1-2,6.3-6.3,6.3H-639z"/>
              			<g id="g3099" transform="matrix(0.55912573,0,0,0.55912573,-580.3448,-883.96648)">
              				<path id="path3103" className="st2" d="M-4822-5914.5l3.2,30.7
              					l23.7,11.1c1.4-36.5,24-58.5,53.9-63.9c94.7-20.5,211.2-40.3,347-40.3c213.4,0,397.5,53,546.5,143.8c22,13.3,29.2,30,32.3,52.1
              					l82.7-53.6l-20.9-82.4l-617.7-165.7l-577.6,73.7L-4822-5914.5z"/>
              				<path id="path3105" className="st0" d="M-4861-6144.3l28-10.6
              					c1-35.1,19.9-64.4,60.5-75.4c104.9-30.8,228.1-50.1,362.6-50.1c258.1,0,494.7,67.6,667.6,171.8c27.7,17,38.3,29.5,43.5,74
              					l127.1-69.9l-533.9-249.8l-892.6,52.1L-4861-6144.3z"/>
              				<path id="path3107" className="st3" d="M-4896.1-6440.8
              					c-2.8-52.5,24.7-90.3,65.1-101.9c132.7-38.5,275.1-57.4,443.2-57.4c279.7,0,560.7,58.6,766.3,177.3c40.4,22,52.1,51.5,54.3,96.6
              					l127.6-84.2l-382.9-323.8l-1172,125.5L-4896.1-6440.8z"/>
              				<path id="path3101"  className="st1" d="M-4251.9-7092.3c-513.8,0-930.3,416.5-930.3,930.2
              					s416.5,930.3,930.3,930.3c513.8,0,930.3-416.5,930.3-930.3S-3738.2-7092.3-4251.9-7092.3z M-4388.4-6606.8
              					c273.2,0,560.6,56.2,770.5,179.5c28.3,16,47.9,40.2,47.9,84.5c0,50.7-40.8,87.1-87.8,87.1c-18.9,0-30.2-4.6-47.9-14.3
              					c-168.4-101-429.7-156.6-682.4-156.6c-126.1,0-254.3,12.8-371.6,44.7c-13.5,3.4-30.6,10.2-47.7,10.2
              					c-49.6,0-87.7-39.3-87.7-88.9c0-50.6,31.3-78.9,65.1-88.9C-4697.4-6588.6-4549.3-6606.8-4388.4-6606.8z M-4407.4-6287.2
              					c243.5,0,479.1,60.6,664.3,171.5c31,17.8,42.5,40.4,42.5,73.5c0,40.3-32.1,72.8-72.5,72.8c-20.2,0-32.9-8.1-46.6-16.1
              					c-151.3-89.8-361.1-149.5-590.7-149.5c-117.8,0-219.5,16.5-303.6,38.9c-18.1,5-28.3,10.4-45.3,10.4c-40,0-72.7-32.6-72.7-72.9
              					c0-39.5,19.2-66.8,57.9-77.7C-4669.6-6265-4562.8-6287.2-4407.4-6287.2z M-4394.6-5983.4c203.6,0,385,46.7,541.1,140.3
              					c23.2,13.5,36.9,27.4,36.9,61.8c0,33.6-27.3,58.2-57.9,58.2c-15.1,0-25.3-5.2-39.4-13.8c-134.8-81.5-302.9-124.4-481.4-124.4
              					c-99.5,0-199.7,12.7-293.4,32.2c-15.2,3.3-34.4,9.2-45.9,9.2c-35.3,0-58.9-28.1-58.9-58.5c0-39.1,22.5-58.5,50.6-63.9
              					C-4627.9-5968.4-4513.5-5983.4-4394.6-5983.4z"/>
              			</g>
              		</g>
              	</g>
              </g>
                </symbol>

                <symbol id="icon-play" viewBox="0 0 46.001 46.001">
                  <g>
                    <polygon points="3.004,0 3,46.001 43,22.997 	"/>
                  </g>
                </symbol>

                <symbol id="icon-next" viewBox="0 0 600 600">
                  <g>
                    <path className="st0" d="M290.6,300c0,9.5-9.5,16.3-9.5,16.3L35.5,485.1C16,498.1,0,488.5,0,463.8V136.2c0-24.7,16-34.3,35.5-21.3
                      l245.6,168.8C281.1,283.7,290.6,290.5,290.6,300z M590.5,283.7L336.1,114.9c-19.5-13-35.5-3.4-35.5,21.3v327.6
                      c0,24.7,16,34.3,35.5,21.3l254.4-168.8c0,0,9.5-6.8,9.5-16.3C600,290.5,590.5,283.7,590.5,283.7z"/>
                  </g>
                </symbol>

                <symbol id="icon-prev" viewBox="0 0 600 600">
                  <g>
                    <path className="st0" d="M309.4,300c0-9.5,9.5-16.3,9.5-16.3l245.6-168.8c19.5-13,35.5-3.4,35.5,21.3v327.6c0,24.7-16,34.3-35.5,21.3
                      L318.9,316.3C318.9,316.3,309.4,309.5,309.4,300z M9.5,316.3l254.4,168.8c19.5,13,35.5,3.4,35.5-21.3V136.2
                      c0-24.7-16-34.3-35.5-21.3L9.5,283.7c0,0-9.5,6.8-9.5,16.3C0,309.5,9.5,316.3,9.5,316.3z"/>
                  </g>
                </symbol>

                <symbol id="icon-pause" viewBox="0 0 70 70">
                  <g>
                      <path d="M52.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57
                        C61.5,1.529,57.471,0,52.5,0z"/>
                      <path d="M17.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57
                        C26.5,1.529,22.471,0,17.5,0z"/>
              		    </g>
                </symbol>
              </svg>



            </div>
          )}
    </Widget>
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
