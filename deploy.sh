#!/bin/sh

container_name="node-monitor"
image_name="jweboy/${container_name}:latest"

docker pull ${image_name}

# 检查容器是否存在
# if [ ! "$(docker ps -q -f name=${container_name})" ]; then
#     if [ "$(docker ps -aq -f status=running -f name=${container_name})" ]; then
#         # cleanup
#         docker stop ${container_name}
#     fi
#         # restart
#         docker run -p 4004:4004 -d --name ${container_name}  --network network-connect-middleware --rm jweboy/${container_name}:0.0.1
# fi

# https://stackoverflow.com/questions/38576337/how-to-execute-a-bash-command-only-if-a-docker-container-with-a-given-name-does

# cleanup
if [ "$(docker ps -a | grep node-monitor)" ]; then
    docker stop ${container_name}
fi

# restart
docker run -p 4004:4004 -d --name ${container_name}  --network network-connect-middleware --rm ${image_name}
