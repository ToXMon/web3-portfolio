FROM nginx:alpine

# Copy the static files to nginx directory
COPY public/ /usr/share/nginx/html/

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 