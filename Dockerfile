# specify the node base image with your desired version node:<version>
FROM keymetrics/pm2:14-stretch
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server/package*.json ./

RUN npm install

COPY ./server/src ./src

EXPOSE 3000

CMD ["pm2-runtime", "start", "./src/app.js", "--watch"]
