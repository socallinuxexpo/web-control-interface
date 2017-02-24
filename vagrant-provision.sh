#!/bin/bash

#install
pip install uwsgi flask flask-restful

sudo mkdir /var/run/uwsgi
sudo chmod 755 /var/run/uwsgi
sudo chmod 777 /var/log/uwsgi
rm -f /etc/nginx/sites-enabled/default

# create some symbolic links for nginx
sudo ln -s /http/web-control-interface/system-configs/web-ctrl /etc/nginx/sites-enabled/web-ctrl
sudo ln -s /http/web-control-interface/system-configs/web-ctrl.conf /etc/init/web-ctrl.conf

# start nginx service
service nginx start

# start uwsgi
sudo uwsgi --socket /var/run/uwsgi/uwsgi.sock --plugin /usr/lib/uwsgi/plugins/python3 -w web:app --chmod-socket=666 &
