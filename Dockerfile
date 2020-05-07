ARG NODE_IMAGE=node:14
ARG WORKDIR=/usr/src/app
ARG PG_DATA=/var/lib/postgresql/data

# dev image
## Create a new image called dev
FROM ${NODE_IMAGE} as dev

## Change working directory
WORKDIR /usr/src/app

## First copy only the package information files as we need to run npm install only when those files changed
COPY package*.json ./

## Install all the dependencies
RUN npm install

## Copy the rest of the files
COPY . .

## Run the build command
RUN npm run build

##########

# prod image
## Create a new image called prod
FROM ${NODE_IMAGE} as prod

## Create the NODE_ENV variable
### Set default value for NODE_ENV
ARG NODE_ENV=production
### Create the actual variable
ENV NODE_ENV=${NODE_ENV}

## Change working directory
WORKDIR ${WORKDIR}

## First copy only the package information files as we need to run npm install only when those files changed
COPY package*.json ./

## Install only dependencies that are actually used
RUN npm install --only=production

## Copy the rest of the files
COPY . .

## Copy the build output from step1
COPY --from=dev /usr/src/app/dist ./dist

## Start the application
CMD ["npm", "run" , "start:prod"]
