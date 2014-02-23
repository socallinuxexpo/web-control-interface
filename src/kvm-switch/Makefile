all: build
build: switch.c
	gcc -o switch switch.c
	sudo chown root ./switch
	sudo chmod +s ./switch
install:
	cp switch ../../bin
	sudo chown root ../../bin/switch
	sudo chmod +s ../../bin/switch
