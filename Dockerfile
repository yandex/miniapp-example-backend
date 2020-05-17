FROM node:12

COPY package.json /app/
COPY package-lock.json /app/
COPY ormconfig.js /app/
COPY build /app/build

RUN (cd /app && npm install --production) && npm cache clean --force

ENV NODE_CONFIG_DIR='/app/build/config'

CMD node /app/build/index.js
