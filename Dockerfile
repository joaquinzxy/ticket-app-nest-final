FROM node:alpine

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]