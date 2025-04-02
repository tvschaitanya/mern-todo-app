FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Update CORS settings to work in Docker
RUN sed -i 's|origin: '\''http://localhost:5173'\'',|origin: ['\''http://localhost:5173'\'', '\''http://frontend:5173'\''],|g' index.js

EXPOSE 3000

CMD ["node", "index.js"]