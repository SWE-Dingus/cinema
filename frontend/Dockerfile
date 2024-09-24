FROM node:current-alpine

WORKDIR /frontend/

COPY src/ src/
COPY *.json *.mjs *.ts ./

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
