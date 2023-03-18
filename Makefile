run-mongo:
	@docker run -d \
		-p 27017:27017 \
		--name assessment-db \
		-e MONGODB_INITDB_ROOT_USERNAME=basebone \
		-e MONGODB_INITDB_ROOT_PASSWORD=technical-assessment \
		mongo:latest

inspect-mongo:
	docker logs assessment-db --follow

