FROM node:latest
WORKDIR /dialysing-app
COPY . .
RUN npm install
RUN npm install -g nodemon
CMD ["npm", "start"]