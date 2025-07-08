require('dotenv').config();
const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { jobQueue } = require('./queue');

const app = express();
const adapter = new ExpressAdapter();

createBullBoard({ queues: [new BullMQAdapter(jobQueue)], serverAdapter: adapter });
adapter.setBasePath('/admin/queues');
app.use('/admin/queues', adapter.getRouter());

const port = process.env.DASHBOARD_PORT || 3000;
app.listen(port, () => console.log(`Dashboard on http://localhost:${port}/admin/queues`));
