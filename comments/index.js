const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;
  const commnets = commentsByPostId[req.params.id] || [];

  commnets.push({ id: commentId, content });
  commentsByPostId[req.params.id] = commnets;

  res.status(201).send(commnets);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});