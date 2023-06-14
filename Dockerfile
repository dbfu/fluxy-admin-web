FROM gplane/pnpm:8.4.0 as builder

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

COPY ./dist /app/www/

COPY  --from=builder /data/web/dist /app/www

EXPOSE 80 
EXPOSE 443

