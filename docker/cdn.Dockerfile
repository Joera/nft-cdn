FROM node:20-alpine 

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN npm install -g nodemon
COPY ./.env .
COPY ./package.json .
RUN pnpm install
COPY ./dist/* ./dist/

EXPOSE 7654
CMD ["npm", "run", "start"]