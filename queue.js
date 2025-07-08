require('dotenv').config();
const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
const { sendEmail } = require('./mailer');
const { sendSMS } = require('./sms');
const { logJob } = require('./logger');

const connection = new IORedis(process.env.REDIS_URL);
const jobQueue = new Queue('jobQueue', { connection });

const handler = async job => {
  switch (job.name) {
    case 'email':
      console.log(`📧 Sending email to ${job.data.to}`);
      return sendEmail(job.data.to, job.data.subject, job.data.body);
    case 'sms':
      console.log(`📱 Sending SMS to ${job.data.to}`);
      return sendSMS(job.data.to, job.data.body);
    default:
      console.log(`⚙️ Handling job: ${job.name}`);
      return { data: job.data };
  }
};

const worker = new Worker('jobQueue', async job => {
  try {
    const result = await handler(job);
    await logJob({ jobId: job.id, name: job.name, data: job.data, status: 'success', result });
    return result;
  } catch (error) {
    await logJob({ jobId: job.id, name: job.name, data: job.data, status: 'failed', error: error.message });
    throw error;
  }
}, {
  connection,
  concurrency: 3,
  limiter: { max: 5, duration: 10000 },
});

module.exports = { jobQueue };
