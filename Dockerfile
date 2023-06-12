FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8682

CMD ["node","./server"]