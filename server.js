const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

app.use(express.json({ extended: false }));

app.use('/auth', require('./routes/auth'));
app.use('/feed', require('./routes/feed'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('tweetx/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'tweetx', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
