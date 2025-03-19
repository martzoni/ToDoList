FROM node:20

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Installation de toutes les dépendances, y compris les devDependencies
RUN npm install

# Copier le reste des fichiers source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
