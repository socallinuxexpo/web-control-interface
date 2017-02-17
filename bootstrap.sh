#!/bin/bash

apt-get install -y python-dev build-essential
apt-get install -y python3-dev
apt-get install -y python3-pip python-pip
apt-get install -y uwsgi-plugin-python3

pip install --user uwsgi flask flask-restful

mkdir /var/run/uwsgi
#chown user:user /var/run/uwsgi
chmod 755 /var/run/uwsgi
chmod 777 /var/log/uwsgi

ln -s /http/web-control-interface/system-configs/web-ctrl /etc/nginx/sites-enabled/web-ctrl
ln -s /http/web-control-interface/system-configs/web-ctrl.conf /etc/init/web-ctrl.conf
mv /etc/X11/xinit/xinitrc /etc/X11/xinit/xinitrc.bak
ln -s /http/web-control-interface/system-configs/xinitrc /etc/X11/xinit/xinitrc

systemctl start nginx
uwsgi --socket /var/run/uwsgi/uwsgi.sock --plugin /usr/lib/uwsgi/plugins/python3 -w web:app
