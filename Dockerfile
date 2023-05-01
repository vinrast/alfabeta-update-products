FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist ./dist
EXPOSE 2023
CMD ["npm", "start"]
