/*
 *
 * Spotify actions
 *
 */

import {
  SET_CONFIG,
  SET_CONFIG_ERROR,
  SET_CONFIG_SUCCESS,
  GET_CONFIG,
  GET_CONFIG_ERROR,
  GET_CONFIG_SUCCESS,
  CHANGE_REDIRECT,
  CHANGE_CLIENT_ID,
  CHANGE_CLIENT_SECRET,
  CONNECT,
  CONNECT_ERROR,
  CONNECT_SUCCESS,
} from './constants';

export function changeClientId(clientId){
  return {
    type: CHANGE_CLIENT_ID,
    clientId,
  };
}

export function changeClientSecret(clientSecret){
  return {
    type: CHANGE_CLIENT_SECRET,
    clientSecret,
  };
}

export function changeRedirect(redirect){
  return {
    type: CHANGE_REDIRECT,
    redirect,
  };
}

export function connectSpotify(){
  return {
    type: CONNECT,
  };
}

export function connectSuccess(token){
  return {
    type: CONNECT_SUCCESS,
    token,
  };
}

export function connectError(error){
  return {
    type: CONNECT_ERROR,
    error,
  };
}

export function setConfig(){
  return {
    type: SET_CONFIG,
  };
}

export function setConfigSuccess(){
  return {
    type: SET_CONFIG_SUCCESS,
  };
}

export function setConfigError(error){
  return {
    type: SET_CONFIG_ERROR,
    error,
  };
}

export function getConfig(){
  return {
    type: GET_CONFIG,
  };
}

export function getConfigSuccess(config){
  return {
    type: GET_CONFIG_SUCCESS,
    config,
  };
}

export function getConfigError(error){
  return {
    type: GET_CONFIG_ERROR,
    error,
  };
}
