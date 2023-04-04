dev:
	docker-compose build
	docker-compose up -d
	npm run seed

e2e:
	docker-compose build
	docker-compose -f docker-compose.e2e.yml --env-file .env.test -p discovery_service_e2e_test up -d
	npm run seed

start:
	docker-compose up -d

stop:
	docker-compose stop

remove:
	docker-compose rm -f -s -v

remove_all_containers:
	docker rm -f $(docker ps -a -q)

remove_all_images:
	docker rmi -f $(docker images -aq)

remove_all_volumes:
	docker volume rm $(docker volume ls -q)

