build-image:
	@echo "============= docker build local image ============="
	docker build -t jweboy/node-monitor .

run-container:
	@echo "============= docker run local container ============="
	docker run -p 4002:4002 -d --name node-monitor jweboy/node-monitor
