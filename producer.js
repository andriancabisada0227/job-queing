require('dotenv').config();
const { jobQueue } = require('./queue');

(async () => {
  await jobQueue.add('email', { to: 'user@example.com', subject: 'Hi!', body: 'Hello!' }, { attempts: 3 });
  await jobQueue.add('sms', { to: '+11234567890', body: 'Test SMS' }, { attempts: 3, delay: 5000 });
  console.log('Jobs queued.');
  process.exit(0);
})();
