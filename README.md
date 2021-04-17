# mmo_rpg
Sistema de MMORPG utilizando nodejs, mongoDB e docker-compose

## Requisitos:

Instalar docker e docker-compose: https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=94798094

Modificar diretórios nos arquivos:

docker-compose.yml

Dockerfile

Executar: 
```sudo docker build```

Executar comando para exibir host do MongoDB:
```docker inspect {container}```

Alterar porta host MongoDB em:

./config/dbConnection.js
