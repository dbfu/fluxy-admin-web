FROM gplane/pnpm:8.4.0 as builder
ARG SENTRY_AUTH_TOKEN

WORKDIR /data/web

COPY pnpm-lock.yaml .
COPY package.json .

RUN pnpm install

COPY . .
RUN pnpm run build

FROM nginx:alpine as nginx

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone 

WORKDIR /data/web

RUN mkdir -p /app/www

COPY  --from=builder /data/web/dist /app/www

EXPOSE 80 
EXPOSE 443

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/config.sh /root
RUN chmod +x /root/config.sh

CMD ["/root/config.sh"]
