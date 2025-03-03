const users = [
  {
    email: "greg@gmail.com",
    password: "randompassword123",
  },
  {
    email: "adam@gmail.com",
    password: "Password123",
  },
];

const publicPosts = [
  {
    title: "My Post 1",
    content: "Post 1 is here",
  },
  {
    title: "My Post 2",
    content: "Post 2 is here",
  },
  {
    title: "My Post 3",
    content: "Post 3 is here",
  }
];

const privatePosts = [
  {
    title: "My Post 4",
    content: "Post 4 is private post",
  },
];

module.exports = { users, publicPosts, privatePosts };