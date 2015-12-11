web-control-interface
=====================

Volunteer web-control interfaces for ScaleAV 13x.

Installation Instructions
=========================

Install the following packages:
   
     uwsgi
     uwsgi-python-plugin
     python3
     pip3 flask 
     pip3 flask-restful
     nginx

Make the following directory, usable by ubuntu:

    sudo mkdir /http
    sudo chown ubuntu /http
    chmod 755 /http

Checkout the git repository into that directory:

    cd /http
    git clone git@github.com:scale-av/web-control-interface.git

Setup the website and upstart configuration:

    sudo ln -s /http/web-control-interface/system-configs/web-ctrl /etc/nginx/sites-available/web-ctrl
    sudo ln -s /http/web-control-interface/system-configs/web-ctrl.conf /etc/init/web-ctrl.conf
    sudo mv /etc/X11/xinit/xinitrc /etc/X11/xinit/xinitrc.bak
    sudo ln -s /http/web-control-interface/system-configs/xinitrc /etc/X11/xinit/xinitrc


