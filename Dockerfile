FROM node:22-alpine
WORKDIR /missionready/
# COPY /home/tom/Dropbox/MissionReady/LEVEL5/Mission4/TinaTurner-Mission4 . 
COPY src /missionready/src
COPY public /missionready/public
COPY package.json /missionready/
COPY .env /missionready
COPY webpack.config.js /missionready/
RUN npm install 
RUN npm run build 
RUN npm install -g http-server 
RUN npm install -g nodemon
EXPOSE 80 443 3000
CMD ["npm", "run", "start"]
