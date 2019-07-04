commitID=$(shell git log --pretty=format:"%H" -1)
tag="latest"

build-image:
	@echo "============= docker build image ============="
	docker build -t jweboy/node-monitor:${tag} .
run-container:
	@echo "============= docker run container ============="
	docker run -p 4004:4004 -d --name node-monitor  --network network-connect-middleware --rm jweboy/node-monitor:${tag}
remove-container:
	@echo "============= docker remove container ============="
	docker stop node-monitor
push-image:
	@echo "============= docker push image ============="
	docker push jweboy/node-monitor:${tag}
# pull-image:
# 	@echo "============= docker pull image ============="
# 	docker pull jweboy/node-monitor:latest
