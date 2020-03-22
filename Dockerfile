FROM node:11

# create dir
WORKDIR /srv/users-service

# get dependencies
COPY package*.json ./

# get source code
COPY src ./src

# get build files
COPY gulpfile.js ./
COPY ts*.json ./

# install npm dependencies
RUN yarn install
RUN npm i -g gulp

# build app from source
RUN gulp build

# start the service
CMD [ "node", "dist/service.js" ]