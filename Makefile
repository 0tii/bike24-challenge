# Bare Makefile to abstract docker-compose away
# Daniel Rauhut

define exec_cli
    $(call dock_comp,run -i --rm web /bin/sh); 
endef

define dock_comp
    docker compose $1 $2 $3 $4
endef

define up
	@$(call dock_comp,up,-d,--remove-orphans,--quiet-pull)
	@printf "\033[32m%s\e[0m\n" 'Container started, visit http://localhost:3003 in your browser'
endef

.PHONY: up
up:
	$(call up)

.PHONY: build
build:
	@$(call dock_comp,build)

.PHONY: down
down: 
	@$(call dock_comp,down)

.PHONY: cli
cli: 
	@$(call exec_cli)