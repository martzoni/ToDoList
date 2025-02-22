# backend/Dockerfile
FROM node:20

WORKDIR /app

# Installer nodemon globalement
RUN npm install -g nodemon

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["nodemon", "server.js"]
