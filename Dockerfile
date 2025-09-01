# -------- Stage 1: build the app with Node --------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Copy only dependency files first to leverage Docker layer cache
    COPY package*.json ./
    RUN npm ci          # uses package-lock.json for reproducible installs
    
    # Now copy the source and build
    COPY . .
    RUN npm run build   # produces /app/dist by default (Vite)
    
    # -------- Stage 2: serve static files with Nginx --------
    FROM nginx:alpine
    
    # Use our Nginx config (adds SPA fallback + API proxy)
    # (Place nginx.conf next to this Dockerfile)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy the built assets from the build stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    # Optional basic healthcheck
    HEALTHCHECK CMD wget -q -O - http://localhost/ || exit 1
    