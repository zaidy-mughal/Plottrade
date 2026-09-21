# Stage 1: Build static assets
FROM node:22-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build arguments for Vite
ARG VITE_API_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_CLOUDINARY_URL

RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]