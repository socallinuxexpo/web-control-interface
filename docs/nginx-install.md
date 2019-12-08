## NGINX and NGINX-RTMP Installation

NGINX needs to be built from source along with the NGINX-RTMP
plugin. This is brefily described below, but is more fully
elaborated at the following link: https://obsproject.com/forum/resources/how-to-set-up-your-own-private-rtmp-server-using-nginx.50/ 

First, we need to install some basic setup for building NGINX
including the developer versions of SSL etc. This can be done
by running the following command:

```
$ sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev git
```

Next we will download the latest NGINX code that is stable. This can be done with the following commands. In addition, we
will clone the code for NGINX-RTMP. These two steps should be
done in the same folder.

```
$ wget http://nginx.org/download/nginx-1.16.1.tar.gz .
$ tar -xzf ./nginx-1.16.1.tar.gz
$ git clone https://github.com/arut/nginx-rtmp-module
```

Next, we need to compile and install the code. This document
will use the standard install location of /usr/local/nginx/.
**Note:** this is different from the Ubuntu package install 
and Chef maintainers should improve this.

```
$ ./configure --with-http_ssl_module --add-module=../nginx-rtmp-module
$ make
$ sudo make install 
```

Next, punching the correct port throught the firewall is
needed. For this run:

```
ufw allow 1935
```

This is all. We can now test the setup.

## Configuration -- TODO

Insufficient data at this time. TODO when configured.

