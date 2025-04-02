FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create or update vite.config.js to point to the server service
RUN if [ -f vite.config.js ]; then \
    sed -i 's|target: .*|target: "http://server:3000",|g' vite.config.js; \
    else \
    echo 'import { defineConfig } from "vite"; \
    import react from "@vitejs/plugin-react"; \
    \
    export default defineConfig({ \
    plugins: [react()], \
    server: { \
    host: "0.0.0.0", \
    port: 5173, \
    proxy: { \
    "/api": { \
    target: "http://server:3000", \
    changeOrigin: true, \
    secure: false \
    } \
    } \
    } \
    });' > vite.config.js; \
    fi

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]