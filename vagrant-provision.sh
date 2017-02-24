#!/bin/bash

#install
pip install uwsgi flask flask-restful pyserial

sudo mkdir /var/run/uwsgi
sudo chmod 755 /var/run/uwsgi
sudo chmod 777 /var/log/uwsgi
rm -f /etc/nginx/sites-enabled/default

# create some symbolic link for nginx
sudo ln -s /http/web-control-interface/system-configs/web-ctrl-vagrant /etc/nginx/sites-enabled/web-ctrl-vagrant

# start nginx service
service nginx start

# start uwsgi
uwsgi --ini /http/web-control-interface/system-configs/uwsgi.ini &
