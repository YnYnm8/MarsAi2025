FROM node as build

WORKDIR /app

COPY . .
RUN npm install
# npm install
RUN npm run build
# npm run build


FROM httpd
# copy dist dans le serveur apache

COPY --from=build /app/dist/. /usr/local/apache2/htdocs/


