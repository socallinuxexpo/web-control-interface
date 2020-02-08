web-control-interface
=====================

Volunteer web-control interfaces for ScaleAV 18x. This code allows volunteers to control the HDMI matrix switch,
camera, and OBS server, which compose the software stack capturing ScaleAV 18x speakers. The HDMI matrix switch
controls the input to the system allowing for both a speaker laptop and an internal projection. The camera controls
the room camera allowing the operator to point the in-room PTZ camera for better image recording. The OBS server
controls the recording scene composition allowing for more than just one static scene.

Installation Instructions
=========================

Install the following packages:

     uwsgi
     uwsgi-python-plugin
     python3
     pip3 flask
     pip3 flask-restful
     nginx
     obs-studio (ppa:obsproject/obs-studio)
     obs-websocket

Make the following directory, usable by ubuntu:

    sudo mkdir /http
    sudo chown ubuntu /http
    chmod 755 /http

Checkout the git repository into that directory:

    cd /http
    git clone git@github.com:scale-av/web-control-interface.git

Setup the website and upstart configuration. **Note:** these are sample configurations, and not fully flushed out.

    sudo ln -s /http/web-control-interface/system-configs/web-ctrl /etc/nginx/sites-available/web-ctrl
    sudo ln -s /http/web-control-interface/system-configs/web-ctrl.conf /etc/init/web-ctrl.conf
    sudo mv /etc/X11/xinit/xinitrc /etc/X11/xinit/xinitrc.bak
    sudo ln -s /http/web-control-interface/system-configs/xinitrc /etc/X11/xinit/xinitrc

