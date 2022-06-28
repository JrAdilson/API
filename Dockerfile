FROM node:14-alpine

ENV TZ = America/Sao_Paulo

RUN mkdir -p /home/node/ecommercio
WORKDIR /home/node/ecommercio

COPY ./package.json ./
COPY ./src ./src
RUN npm install

EXPOSE 3000

CMD ["node", "./src/index.js"]
# Instalando todas as dependências contidas no package.json