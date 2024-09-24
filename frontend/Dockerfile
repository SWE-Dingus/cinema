FROM node:current-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /frontend/

COPY package.json package-lock.json ./

RUN npm ci

COPY src/ src/
COPY *.json *.mjs *.ts ./

RUN npm run build

CMD ["npm", "run", "start"]
