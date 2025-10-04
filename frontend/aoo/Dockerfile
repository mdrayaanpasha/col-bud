from node:20-alpine as builder


WORKDIR /app

copy package*.json .

run npm install

copy . .

run npm run build


from node:20-alpine

workdir /app

run npm install -g serve

copy  --from=builder /app/dist ./dist

expose 3003

CMD ["serve", "-s", "dist", "-l", "3003"]


