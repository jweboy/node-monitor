build-image:
	@echo "============= docker build local image ============="
	docker build -t jweboy/node-monitor .

run-container:
	@echo "============= docker run local container ============="
	docker run -p 4004:4004 -d --name node-monitor  --network network-connect-middleware jweboy/node-monitor
