FROM node:18-alpine

# create work directory in app folder
WORKDIR /app

# copy over package.json files
COPY package.json /app/
COPY package-lock.json /app/

RUN npm ci && npm cache clean --force

ADD . /app

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
