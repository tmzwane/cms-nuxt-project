DANGLING_IMAGES=$(shell docker images -f "dangling=true" -q)
DANGLING_VOLUMES=$(shell docker volume ls -qf dangling=true)

run-mongo:
	@docker run -d \
		-p 27017:27017 \
		--name assessment-db \
		-e MONGODB_INITDB_ROOT_USERNAME=basebone \
		-e MONGODB_INITDB_ROOT_PASSWORD=technical-assessment \
		mongo:latest

inspect-mongo:
	docker logs assessment-db --follow

compose-local:
	docker-compose -f ./docker-compose.yml up --build

docker-clean-up:
	@if [ -n "${DANGLING_IMAGES}" ]; then \
		echo "Danling images = ${DANGLING_IMAGES}"; \
		docker rmi ${DANGLING_IMAGES} -f; \
	else \
		echo "No Danling images"; \
	fi;

	@if [ -n "${DANGLING_VOLUMES}" ]; then \
		echo "Danling volumes = ${DANGLING_VOLUMES}"; \
		docker volume rm ${DANGLING_VOLUMES} -f; \
	else \
		echo "No Danling volumes"; \
	fi;