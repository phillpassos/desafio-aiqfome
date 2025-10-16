FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY .env ./
COPY package*.json ./

RUN npm install --omit=dev

RUN npm run prisma:generate

CMD ["node", "dist/main.js"]
