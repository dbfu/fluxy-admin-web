FROM gplane/pnpm:8.4.0 as builder

WORKDIR /data/web

COPY . .

RUN pnpm install --registry=https://registry.npm.taobao.org
RUN pnpm run build


FROM nginx:alpine as nginx

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone 

WORKDIR /data/web

COPY ./nginx /etc/nginx/conf.d

COPY  --from=builder /data/web/dist /app/www

EXPOSE 80 
EXPOSE 443
