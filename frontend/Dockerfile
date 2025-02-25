# frontend/Dockerfile
FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D typescript @types/react @types/react-dom @vitejs/plugin-react

COPY . .

EXPOSE 5173

# Utiliser node avec le flag --experimental-modules
CMD ["node", "--experimental-modules", "node_modules/vite/bin/vite.js", "--host"]
