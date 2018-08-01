# This official base image contains node.js and npm
FROM node:7
ARG VERSION=1.0.0
# Copy the application files
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY tsconfig.json /usr/src/app
COPY build /usr/src/app/build
COPY data /usr/src/app/data

LABEL license=MIT \
      version=$VERSION
# Set required environment variables
ENV NODE_ENV test
# Download the required packages for production
RUN npm update && \
    npm install
# Make the application run when running the container
CMD ["npm", "run", "docker-test"]