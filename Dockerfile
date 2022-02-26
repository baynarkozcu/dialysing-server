FROM node:latest
WORKDIR /dialysing-app
COPY . .
RUN npm install
CMD ["npm", "start"]