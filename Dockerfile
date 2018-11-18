
FROM node:alpine
WORKDIR /tmp
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn build 

FROM nginx:alpine
WORKDIR /app
COPY nginx.conf /etc/nginx/

COPY --from=0 /tmp/build/. /app/html/
CMD ["nginx", "-g", "daemon off;"]

# FROM node:alpine
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install && yarn cache clean
# COPY . .
# RUN yarn build 
