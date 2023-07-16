FROM node:18

WORKDIR /
COPY . .
EXPOSE 8080

ENV NODE_ENV=production
RUN npm install package.json
COPY . .
CMD ["npm", "start"]
