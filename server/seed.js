const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const samples = [
  {
    title: 'Welcome to MERN Blog',
    category: 'Technology',
    body: `This blog is built with the MERN stack: MongoDB for the database, Express and Node.js for the server, and React for the interface.\n\nYou can read posts, search by keyword, filter by category, and leave comments. Create a free account to write your own posts, edit them any time, and join the conversation.`,
  },
  {
    title: 'Five habits for learning to code faster',
    category: 'Education',
    body: `Consistency beats intensity. Thirty minutes every day teaches more than one long session a week, because your brain needs time between practice rounds to store what it learned.\n\nBuild small projects instead of only watching tutorials. Read other people's code. Write down what confused you, and explain it in your own words. Teaching a concept is the fastest way to find out whether you really understand it.`,
  },
  {
    title: 'A weekend in the hills: what to pack',
    category: 'Travel',
    body: `Pack light, but never skip water, a power bank and a small first aid kit. Layers matter more than heavy jackets because mountain weather changes quickly.\n\nStart early to enjoy the quiet trails, carry your rubbish back with you, and leave a little time for sitting still. The best views are often found when you stop rushing.`,
  },
  {
    title: 'Simple morning routine that actually sticks',
    category: 'Lifestyle',
    body: `Do not try to change everything at once. Pick one small habit, such as drinking a glass of water or stretching for five minutes, and attach it to something you already do every morning.\n\nOnce it feels automatic, add the next one. Small steps repeated every day build routines that last, while big promises usually fade by the second week.`,
  },
  {
    title: 'Why every developer should learn the basics of databases',
    category: 'Technology',
    body: `Almost every application stores data. Understanding collections, documents, indexes and queries helps you design faster and cleaner apps.\n\nWith MongoDB you can open Compass, look at the documents your app saved, and see exactly how your code changes the data. That feedback loop is one of the best ways to learn.`,
  },
  {
    title: 'How to write a blog post people finish reading',
    category: 'Other',
    body: `Start with the main point in the first two sentences. Use short paragraphs, plain words and one idea per paragraph.\n\nRead your draft out loud. If you stumble over a sentence, rewrite it. End with something the reader can do or think about next.`,
  },
];

async function seedIfEmpty() {
  if ((await Post.countDocuments()) > 0) return;

  let demo = await User.findOne({ email: 'demo@blog.com' });
  if (!demo) {
    demo = await User.create({
      name: 'Demo Author',
      email: 'demo@blog.com',
      password: await bcrypt.hash('demo123', 10),
    });
  }

  const created = [];
  for (const s of samples.slice().reverse()) {
    created.push(await Post.create({ ...s, author: demo._id, authorName: demo.name }));
  }

  const first = created[created.length - 1];
  await Comment.create({
    post: first._id,
    author: demo._id,
    authorName: demo.name,
    text: 'Thanks for visiting! Sign up and leave a comment below.',
  });

  console.log('Sample posts added (demo login: demo@blog.com / demo123)');
}

module.exports = { seedIfEmpty };
