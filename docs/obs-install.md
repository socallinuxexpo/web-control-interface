# OBS Setup

OBS is used for stream management and composition. It allows us to both bring in other media sources, and compose
our outgoing recording stream. This guide will walk the user through installing OBS and configuring OBS for use
with scale boxes. This guide was written for Scale 18x.

## Installation

This installation assumes the user is running Ubuntu, as that is the OS of choice for scale. It also assumes the
user has installed and configured NGINX.  See: [nginx-install.md](nginx-install.md).

The installation involves four steps:

1. Configuring Ubuntu to use OBS repository
2. Installing dependencies
3. Installing OBS
4. Installing OBS websockets

### OBS Installation

This section will install the raw-OBS install. It will follow
the linked instructions here: https://obsproject.com/wiki/install-instructions#linux

First, the system should be updated and the ffmpeg dependency
should be installed.

```
sudo apt update
sudo apt install ffmpeg
```

Next we will install OBS from their repository. This will add
their repository, update the package list, and install it.

```
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt-get update
sudo apt-get install obs-studio
sudo apt-get install obs-websockets
```

OBS should now be available under the Applications menu, or by running `obs`.

## Configuration

To configure OBS it is best to run OBS once to generate the initial configuration structure in
`~/.config/obs-studio.md`. To do this run the following command, and then exit once OBS has been run:

```
obs
CTRL-C / EXIT
```

Once this has been done, configuring OBS for use at Scale involves copying the following files to the following
places.  (TODO)

