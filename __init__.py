import os
from onyx.brain.core import OnyxNeuron
from neurons.spotify.api import *
from onyx.utils.log import getLogger

__author__ = 'Cassim Khouani'

LOGGER = getLogger("Spotify")

class SpotifyNeuron(OnyxNeuron):
    def __init__(self):
        super(SpotifyNeuron, self).__init__(name="SpotifyNeuron", raw_name="spotify")

    def get_api(self):
        api = [
            {
                'route': '/neuron/spotify/config',
                'class': Config
            },
            {
                'route': '/neuron/spotify/connect',
                'class': Connect
            }
        ]
        return api

    def initialize(self):
        #Initialize the Neuron
        LOGGER.info("Spotify init")

    def install(self):
        LOGGER.info("Installing Spotipy")
        os.system("python -m pip install spotipy")

    def stop(self):
        pass

def create_neuron():
    return SpotifyNeuron()
