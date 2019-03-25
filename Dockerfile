FROM node:11

# create dir
WORKDIR /srv/users-service

# get dependencies
COPY package*.json ./

RUN npm ci
RUN npm i -g gulp

# Bundle app source
COPY . .

EXPOSE 30100
CMD [ "gulp", "run:dev" ]