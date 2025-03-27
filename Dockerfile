FROM node:22-alpine
WORKDIR /missionready/
COPY . .
RUN npm install 
RUN npm install -g nodemon
EXPOSE 80 443 3000
CMD ["npm", "run", "start"]
