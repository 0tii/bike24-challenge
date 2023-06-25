# Bare Makefile to abstract docker-compose away
# Daniel Rauhut

define exec_cli
    $(call dc,exec -it web /bin/sh); 
endef

define dc
    docker compose -f docker/docker-compose.yml $1 $2 $3 $4 $5
endef

define up
	@$(call dc,up,-d,--remove-orphans,--quiet-pull)
	@printf "\033[32m%s\e[0m\n" 'Container started, visit http://localhost:3003 in your browser'
endef

.PHONY: up
up:
	$(call up)

.PHONY: build
build:
	@$(call dc,build)

.PHONY: down
down: 
	@$(call dc,down)

.PHONY: cli
cli: 
	@$(call exec_cli)

.PHONY: log
log: 
	@$(call dc,logs,web)

.PHONY: logl
logl: 
	@$(call dc,logs,web,--follow,|| true)