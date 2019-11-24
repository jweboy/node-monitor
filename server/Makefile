commitID=$(shell git log --pretty=format:"%H" -1)
tag=latest
container_name=monitor-server
image_name=jweboy/${container_name}:${tag}

build-image:
	@echo "============= docker build image ============="
	docker build -t ${image_name} .
run-container:
	@echo "============= docker run container ============="
	docker run -p 4004:4004 -d --name node-monitor  --network network-connect-middleware ${image_name}
remove-container:
	@echo "============= docker remove container ============="
	docker stop ${container_name}
push-image:
	@echo "============= docker push image ============="
	docker push ${image_name}
# pull-image:
# 	@echo "============= docker pull image ============="
# 	docker pull jweboy/node-monitor:latest
