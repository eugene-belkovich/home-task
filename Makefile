dev:
	docker-compose build
	docker-compose up -d

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

