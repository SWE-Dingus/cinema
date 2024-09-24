FROM node:current-alpine

WORKDIR /frontend/

COPY package.json package-lock.json ./

RUN npm install

COPY src/ src/
COPY *.json *.mjs *.ts ./

RUN npm run build

CMD ["npm", "run", "start"]
