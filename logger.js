require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const schema = new mongoose.Schema({
  jobId: String, name: String, data: Object,
  status: String, result: Object, error: String,
  timestamp: { type: Date, default: Date.now },
});
const JobLog = mongoose.model('JobLog', schema);

async function logJob(entry) {
  await JobLog.create(entry);
}

module.exports = { logJob };
