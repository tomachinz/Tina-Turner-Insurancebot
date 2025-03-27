FROM node:22-alpine
WORKDIR /missionready/
COPY src /missionready
COPY public /missionready
COPY package.json /missionready
COPY .env /missionready
COPY webpack.config.js /missionready
COPY node_modules /missionready
RUN npm install 
RUN npm install -g nodemon
EXPOSE 80 443 3000
CMD ["npm", "run", "start"]
