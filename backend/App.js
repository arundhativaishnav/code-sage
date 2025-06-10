const express = require('express');
const aiRoutes = require("./src/routes/ai.routes");
const cors = require('cors');

const app = express();

// ✅ Allow only frontend domain in production
const allowedOrigins = [
  'http://localhost:5173',
  'https://code-sage-six.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Hello from Code Sage backend!');
});

// Routes
app.use('/ai', aiRoutes);

// ✅ Deployment-ready port handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
