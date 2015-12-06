#!/bin/sh
ssh -f -p 2324 giggle.enhancedreality.net -L 8081:127.0.0.1:8081 -N
ssh -f -p 2324 giggle.enhancedreality.net -L 9102:172.16.10.33:80 -N
