const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Error", error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    if (comments) {
      comments.drop(() => {
        if (blogposts) {
          blogposts.drop(() => done());
        }
      });
    } else if (blogposts) {
      blogposts.drop(() => done());
    } else {
      done();
    }
  });
});
