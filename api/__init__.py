import requests, json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
import spotipy
import spotipy.util as util

from onyx.extensions import db
from neurons.spotify.models.ConfigModel import ConfigModel
from onyx.models import to_dict

class Connect(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)

    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            query = ConfigModel.query.filter_by(user=user['id']).first()

            if query is not None:

                sp_oauth = spotipy.SpotifyOAuth(
                                                query.client_id,
                                                query.client_secret,
                                                query.redirect_uri,
                                                username=str(user['id']),
                                                scope="user-modify-playback-state user-read-playback-state"
                                            )

                token_info = sp_oauth.get_cached_token()

                if not token_info:
                    code = sp_oauth.get_auth_response()
                    token = sp_oauth.get_access_token(code, as_dict=False)
                else:
                    token = token_info["access_token"]

                # Auth'ed API request
                if token:
                    return jsonify(status="success", access_token=token)
                else:
                    return jsonify(status="error")

            else:
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500

class Config(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('clientId')
    parser.add_argument('clientSecret')
    parser.add_argument('redirect')

    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            config = {}

            query = ConfigModel.query.filter_by(user=user['id']).first()

            if query is None:
                config['clientId'] = ''
                config['clientSecret'] = ''
                config['redirect'] = ''
            else:
                config['clientId'] = query.client_id
                config['clientSecret'] = query.client_secret
                config['redirect'] = query.redirect_uri

            return jsonify(status="success", config=config)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()
            user = get_jwt_identity()

            clientId = args['clientId']
            clientSecret = args['clientSecret']
            redirect = args['redirect']

            query = ConfigModel.query.filter_by(user=user['id']).first()

            if query is None:
                new = ConfigModel(user=user['id'], client_id=clientId, client_secret=clientSecret, redirect_uri=redirect)

                db.session.add(new)
            else:
                query.client_id = clientId
                query.client_secret = clientSecret
                query.redirect_uri = redirect

                db.session.add(query)

            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
