require('dotenv').config();
const { jobQueue } = require('./queue');

(async () => {
  await jobQueue.add('email', { to: 'newsletter@example.com', subject: 'Weekly News', body: 'Hello!' }, {
    repeat: { cron: '0 9 * * 1' },
    jobId: 'weekly-newsletter'
  });
  console.log('Cron job scheduled.');
  process.exit(0);
})();
