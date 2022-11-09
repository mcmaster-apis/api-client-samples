FROM registry.access.redhat.com/ubi9/nodejs-16
RUN npm install -g yarn -s
COPY package.json yarn.lock /opt/app-root/src/
COPY public/ /opt/app-root/src/public
COPY src/ /opt/app-root/src/src
WORKDIR /opt/app-root/src
RUN yarn install --network-timeout 100000 --frozen-lockfile && yarn build

FROM registry.access.redhat.com/ubi9/nginx-120
COPY nginx/nginx.conf "${NGINX_DEFAULT_CONF_PATH}"
COPY --from=build /opt/app-root/src/build .
CMD nginx -g "daemon off;"
