# docker pull jweboy/node-monitor

# if [ ! "$(docker ps -q -f name=node-monitor)" ]; then
#     if [ "$(docker ps -aq -f status=exited -f name=node-monitor)" ]; then
#         # cleanup
#         docker rm node-monitor
#     fi
#         # make run-container
# fi


# 检查容器是否存在
if [ "$(docker ps -a | grep node-monitor)" ]; then
    docker stop node-monitor
fi

docker run -p 4004:4004 -d --name node-monitor  --network network-connect-middleware --rm jweboy/node-monitor
