NOME_IMAGEM=aiqfome-favoritos-backend
TAG=latest
NOME_CONTAINER=$(NOME_IMAGEM)
PORTA=3000

.PHONY: local remote logs

local:
	docker build -t $(NOME_IMAGEM):$(TAG) . --progress=plain
	docker rm -f $(NOME_CONTAINER) 2>/dev/null || true
	docker run -d --name $(NOME_CONTAINER) -p $(PORTA):3000 $(NOME_IMAGEM):$(TAG)