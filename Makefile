up:
	@docker-compose up

build:
	@docker-compose build

sh:
	@docker-compose exec comic-vine-api bash

migration\:run:
	@docker-compose exec comic-vine-api bash -c "npx ts-node node_modules/typeorm/cli migration:run -d ormconfig.ts"

migration\:revert:
	@docker-compose exec comic-vine-api bash -c "npx ts-node node_modules/typeorm/cli migration:revert -d ormconfig.ts"