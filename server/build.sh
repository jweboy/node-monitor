#!/bin/sh

# step1
make build-image

# step2
make push-image

# step3
ssh server < deploy.sh
