FROM nginx:1.27.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf


RUN mkdir -p /var/cache/nginx/next_static && \
    chown -R nginx:nginx /var/cache/nginx/next_static

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
