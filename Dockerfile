# Build stage
FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install && npm cache clean --force

CMD [ "npm", "run" ,"build" ]


# Development
FROM builder AS development

CMD [ "npm", "run" ,"quickly" ]

EXPOSE 3001 3002


# Clean
FROM nginx:alpine AS cleaner

WORKDIR /usr/share/nginx/html/

RUN rm -rf ./*

COPY . .

RUN rm -rf Dockerfile gulpfile.js package* scss/


# Release/production
FROM nginxinc/nginx-unprivileged AS release

WORKDIR /usr/share/nginx/html/

COPY --from=cleaner /usr/share/nginx/html/ .
COPY --from=builder /app/css ./css
