FROM node:23-alpine 

WORKDIR /app

COPY package.json . 

# Install Bun
RUN npm install -g bun 

RUN bun install 

COPY . .

EXPOSE 4004

CMD ["bun", "start"]