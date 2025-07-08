# job-queing

npm install

Fill .env

Run docker run -p 6379:6379 redis

Start MongoDB

Run components:

    npm run start:worker

    npm run start:api

    npm run start:dashboard

    npm run start:cron (once)

    node producer.js (to send example jobs)
