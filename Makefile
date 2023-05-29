up:
	@docker-compose up

build:
	@docker-compose build

sh\:app:
	@docker-compose exec comic-vine-api bash

sh\:redis:
	@docker-compose exec comic-vine-redis bash

sh\:postgres:
	@docker-compose exec comic-vine-postgres bash

migration\:run:
	@docker-compose exec comic-vine-api bash -c "npx tsx node_modules/typeorm/cli migration:run -d ormconfig.ts"

migration\:revert:
	@docker-compose exec comic-vine-api bash -c "npx tsx node_modules/typeorm/cli migration:revert -d ormconfig.ts"

migration\:create:
ifdef n
	@docker-compose exec comic-vine-api bash -c "npx typeorm migration:create ./src/database/migrations/${n}"
else
	@printf 'Você deve passar o nome da migration que você quer criar\nEx: make migration:create n=CreateTable\n'
endif