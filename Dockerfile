FROM node:alpine

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "run:dev"]