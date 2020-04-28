from onyx.extensions import db

class ConfigModel(db.Model):
    __tablename__ = 'spotify_config'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String())
    client_id = db.Column(db.String())
    client_secret = db.Column(db.String())
    redirect_uri = db.Column(db.String())
    access_token = db.Column(db.String())
    refresh_token = db.Column(db.String())
