 FROM node:8-alpine

 ENV HOMEAPP /apps

 WORKDIR $HOMEAPP

 COPY . $HOMEAPP

 WORKDIR $HOMEAPP/express

 RUN rm -rf node_modules package-lock.json
 RUN npm install

 EXPOSE 7000

 CMD [ "npm", "start" ]