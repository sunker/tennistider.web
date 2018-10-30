FROM mhart/alpine-node:9

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install && \
    yarn cache clean
    

COPY . .

CMD ["node", "app.js"]
