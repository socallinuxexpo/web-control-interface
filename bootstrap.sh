#!/bin/bash

#install
pip install uwsgi flask flask-restful

# create some symbolic links for some stuff
# This should probably be moved to the vagrant file as a copy operation,
# or even set up a sync situation.
sudo ln -s /http/web-control-interface/system-configs/web-ctrl /etc/nginx/sites-enabled/web-ctrl
sudo ln -s /http/web-control-interface/system-configs/web-ctrl.conf /etc/init/web-ctrl.conf

# TODO: What does this do?
sudo uwsgi --socket /var/run/uwsgi/uwsgi.sock --plugin /usr/lib/uwsgi/plugins/python3 web:app

# start nginx service
service nginx start
