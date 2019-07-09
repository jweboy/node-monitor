#!/bin/sh

tag="latest"
container_name="node-monitor"
image_name="jweboy/${container_name}:${tag}"
port=4004

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

# -a 显示所有容器（默认展示正在运行的容器）
# -f 根据条件过滤筛选

# cleanup container if exited but stoped
if [ "$(docker ps -a -f status=exited -f name=${container_name})" ]; then
    docker rm -f ${container_name}
fi

# cleanup running container
if [ "$(docker ps -a | grep ${container_name})" ]; then
    docker stop ${container_name}
fi

# restart
docker run -p ${port}:${port} -d --name ${container_name}  --network network-connect-middleware --rm ${image_name}
