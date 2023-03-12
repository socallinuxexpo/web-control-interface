#!/usr/bin/perl -w
#
# Read this year's conference room names from $roomsfile and generate the
# control and monitoring interfaces

use strict;
use warnings;

# INSTALL - apt install libconfig-yaml-perl

use YAML qw/LoadFile/;

my $debug = 8; # <6 = write files, >=6 -> stdout
my $apphome = '/opt/scaleav-web';
my $configfile = "$apphome/config/rooms.yaml";
my $config = YAML::LoadFile($configfile);

unless (defined($config)) {
    print STDERR "Could not open the show configuration file '$configfile'";
    exit(-1);
}
unless (ref($config) eq 'HASH' and
        exists($config->{'parameters'}) and
        exists ($config->{'rooms'})) {
    print STDERR "The file format is invalid in '$configfile'";
    exit(-2);
}
unless (ref($config->{'parameters'}) eq 'HASH') {
    print STDERR "The parameters format is invalid in '$configfile'";
    exit(-2);
}
unless (ref($config->{'rooms'}) eq 'HASH' and
        scalar keys %{$config->{'rooms'}} > 0) {
    print STDERR "The rooms format is invalid in '$configfile'";
    exit(-2);
}

print_html();
exit(0);

sub print_html {
    my $domain = $config->{'parameters'}->{'domain'};

    print <<EOF;
<html>
<head onstart="startUp()">
<script src="https://code.jquery.com/jquery-3.6.3.js"></script>
<script>
	function NewTab(url) {
		window.open(url, "_blank");
	}
    function setRoom(room) {
        /* Load the camera controls panel */
        /* TODO Use hide()/show() instead of redrawing each time */
        controls = document.getElementById("camera_controls_frame");
        controls.src = "http://" + room + ".$domain/$config->{'parameters'}->{'controls_uri'}";

        /* Show the audio mixer controls */
        /* TODO Lock changes to this window behind a transparent button */
        mixer = document.getElementById("audio_mixer_frame");
        mixer.src = "http://" + room + "-mixer.$domain/$config->{'parameters'}->{'audio_mixer_uri'}";

        /* Highlight the selected button */
        buttons = document.getElementById("tabs");
        for (child = buttons.firstChild; child !== null; child = child.nextSibling) {
            if (child.name == room) {
            } else {
            }
        /* TODO find the panel, for each child set to normal, set this one to high */

        /* Highlight the selected window */
        /* Set the border of the named window */
    }
    function startUp() {
EOF
    print "        setRoom('" . (sort keys %{$config->{'rooms'}})[0] . "');\n";
    print <<EOF;
    }
</script>
<style>
table {
	border-spacing: 10px 5px;
}
th {
	font-size: 2.0em;
}
button {
	font-size: 1.0em;
    white-space:nowrap;
}
td {
	font-size: 2.0em;
}
button.room_button {
    cursor: pointer;
    font-size: 4em;
    margin: 20px;
}
body {
    height: 100%;
    margin: 0;
}
div.content {
    display: flex;
    gap: 20px;
    width: 100%;
    height: 100vh;
    background-color: grey;
}
div.tabs {
    display: flex;
    flex-direction: column;
    flex-grow: 0;       /* do not grow */
    flex-shrink: 0;     /* do not shrink */
    flex-basis: 250px;
}
div.controls {
    display: flex;
    flex-direction: column;
    flex-grow: 0;       /* do not grow */
    flex-shrink: 0;     /* do not shrink */
    flex-basis: 25%;
    background-color: orange;
}
div.controls_camera {
    flex-grow: 0;       /* do not grow */
    flex-shrink: 0;     /* do not shrink */
    background-color: yellow;
}
div.controls_camera_and_system {
    display: flex;
    flex-direction: row;
    background-color: cyan;
}
div.controls_camera_control {
    display: flex;
    flex-grow: 1;       /* do grow */
    background-color: blue;
}
div.controls_system_status {
    flex-grow: 0;       /* do not grow */
    flex-shrink: 0;     /* do not shrink */
    background-color: green;
}
div.controls_slides {
    flex-grow: 0;       /* do not grow */
    flex-shrink: 0;     /* do not shrink */
    background-color: red;
}
div.controls_audio_mixer {
    display: flex;
    flex-grow: 1;       /* do grow */
}
div.rooms {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    background: grey;
    width: 100%;
}
div.room {
    background-color: lightblue;
    padding: 1rem;
}
iframe {
    display: flex;
    flex-grow: 1;       /* do grow */
}
</style>
</head>
<body onload="startUp()">
EOF

    # TODO clear overlay over audio mixer unless unlocked
    # TODO Button to bruing up show scheduled
    # TODO Room active API feed auto-greys out unused rooms
    #   Include override button in the upper right to toggle grey
    #   If the room is active show time remaining
    #   If the room is inactive grey it out and show time 'til next show

    # Content area
    print <<EOF;
<div class="content" style="display: flex; justify-content: space-around;">
EOF

    # Tabs column
    print <<EOF;
  <div id="tabs" class="tabs" ">
EOF
    # Scale LOGO
    print "<img src=\"/opt/scaleav-web/img/scale_logo_sm.png\"/>\n";

    foreach my $room (sort keys %{$config->{'rooms'}}) {
        print "    <button class=\"room_button\" name=\"$room\" onclick=\"setRoom('$room')\">$room</button>\n";
    }
print "  </div>\n";

    # Controls panels
    print <<EOF;
  <div class="controls" style="display: flex; flex-direction: column;">
    <div class="camera_controls" id="load_camera_controls">
      <iframe id="camera_controls_frame"></iframe> 
    </div>
    <div class="controls_camera">
    </div>
    <div class="controls_camera_and_system">
        <div class="controls_camera_control">
camera controls
        </div>
        <div class="controls_system_status">
system status
        </div>
    </div>
    <div class="controls_slides">
slides
    </div>
    <div class="controls_audio_mixer">
      <iframe id="audio_mixer_frame"></iframe> 
    </div>
  </div>
EOF
    # rooms panels
    print "  <div class=\"rooms\">\n";
    foreach my $room (sort keys %{$config->{'rooms'}}) {
        print "    <div class=\"room\">$room</div>\n";
    }
    print "  </div>\n";

    # Close out the document
    print <<EOF;
</div>
</body>
</html>

EOF
}

