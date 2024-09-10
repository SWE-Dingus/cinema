FROM node:current-alpine

WORKDIR /frontend/

COPY src/ src/
COPY public/ public/
COPY index.html vite.config.js package.json .

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "dist"]
