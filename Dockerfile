# -------- Stage 1: build the app with Node --------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Google Programmable Search Engine id (cx) for the /vyhledavani page.
    # Vite inlines VITE_* vars at build time, so this must be a build arg -- a
    # runtime env var on the nginx container would never reach the bundle.
    ARG VITE_GOOGLE_CSE_ID
    ENV VITE_GOOGLE_CSE_ID=$VITE_GOOGLE_CSE_ID

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
    