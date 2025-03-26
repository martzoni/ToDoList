FROM node:20

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Copier les fichiers d'environnement
COPY .env* ./

# Installation des dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

ARG FRONTEND_PORT=5173
ENV VITE_FRONTEND_PORT=$FRONTEND_PORT

EXPOSE ${VITE_FRONTEND_PORT}

CMD ["npm", "run", "dev"]
