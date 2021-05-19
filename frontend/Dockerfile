FROM node:alpine

RUN pwd
RUN ls -al

COPY . .
# COPY ["./package.json", "/package-lock.json", "./"]

RUN pwd
RUN ls -al

RUN pwd
RUN npm install

RUN pwd
RUN ls -al

EXPOSE 8080


CMD ["npm", "start"]
