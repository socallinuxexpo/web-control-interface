# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

	hostname = "scaleav"
	locale = "en_US.UTF.8"

# Box
	config.vm.box = "ubuntu/xenial64"

# Shared folders
	config.vm.synced_folder ".", "/http"

# Port forwarding
	config.vm.network :forwarded_port, guest: 80, host: 8080

# Setup
	config.vm.provision "shell", path: "bootstrap.sh"

end
