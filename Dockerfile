
# Use a stable Node.js image
FROM node:18.17.0-alpine

# We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon --location=global

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# Use script specified in package.json
CMD ["npm", "start"]
