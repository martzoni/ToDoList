# Makefile
.PHONY: up down build logs ps clean

# Démarrer tous les conteneurs
up:
	docker compose up -d

# Arrêter tous les conteneurs
down:
	docker compose down

# Arrêter et supprimer les volumes (efface les données)
clean:
	docker compose down -v

# Reconstruire les images
build:
	docker compose build

# Voir les logs de tous les conteneurs
logs:
	docker compose logs -f

# Voir les logs d'un service spécifique (usage: make log-backend)
log-%:
	docker compose logs -f $*

# Voir les conteneurs qui tournent
ps:
	docker compose ps

# Entrer dans un conteneur (usage: make shell-backend)
shell-%:
	docker compose exec $* sh

#testor pullrequest
