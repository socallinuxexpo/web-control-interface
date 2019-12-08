# RTMP To File

RTMP streams need to be recorded to disk to ensure that we have a backup of the content logged.
This will be done by saving the the stream directly to disk. 

## Installation

To prepare for running this script, install gstreamer-1.0 and gstreamer-plugins-bad. This can be
done on Ubunutu by running the following commands:

```
sudo apt install gstreamer-1.0
sudo apt install gstreamer1.0-plugins-bad
```
## Usage

Running this script involves passing it an RTMP URL and a output file to save to. Ensure the RTMP
stream exists and the output file has write permission.

```
rtmp-to-file <RTMP stream> <file>
e.g.
rtmp-to-file rtmp://localhost ./localhost.mp4
```

## Implementation

This implementation uses Gstreamer to stream directly from an RTMP source (rtmpsrc object) to a
file (filesink).  This is all there is to it.
