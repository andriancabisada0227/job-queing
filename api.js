require('dotenv').config();
const express = require('express');
const { jobQueue } = require('./queue');

const app = express();
app.use(express.json());

app.post('/add-job', async (req, res) => {
  const { name, data, delay=0, jobId, priority=5 } = req.body;
  try {
    const job = await jobQueue.add(name, data, {
      delay, jobId, priority, attempts: 3,
      removeOnComplete: true, removeOnFail: false,
    });
    res.status(201).json({ message: 'Job added', jobId: job.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
