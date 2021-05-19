FROM node:alpine

WORKDIR /app

COPY ["app/package.json", "app/package-lock.json", "./app"]

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
