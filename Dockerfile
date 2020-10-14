FROM node:lts
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY token.json .
COPY index.js .
RUN npm i
CMD ["node","index.js"]