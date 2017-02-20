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

Vagrant Dev Environment
=========================
A Vagrant development environment has been provided for anyone who wants to run this on their local machine with less work.
You'll need Vagrant and VirtualBox
https://www.vagrantup.com/downloads.html
https://www.virtualbox.org/wiki/Downloads

Vagrant requires 2 files to run:

```
Vagrantfile
vagrant-provision.sh
```
To run, navigate to the directory where the Vagrantfile is located:
`vagrant up`

Thats it! When you're done, make sure you run:
`vagrant destroy`
otherwise the vm will keep running.

You can ssh into the box without a password by using:
`vagrant ssh`
