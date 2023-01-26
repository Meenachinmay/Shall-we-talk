FROM node

WORKDIR /usr/src/app

COPY package*json .

RUN yarn install

COPY . .