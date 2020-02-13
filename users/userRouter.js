const express = require('express');

const router = express.Router();
const db = require("./userDb");

router.post('/', (req, res) => {
  // do your magic!
  const newUser = req.body;

  db.insert(newUser)
    .then(userAdded => {
      res.status(201).json(userAdded);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add user" })
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const postBody = req.body;

  db.getById(id)
    .then( user => {
      if(!user) {
        res.status(404).json({ message: ' Unable to find usr by that ID '});
      }
    })
  db.insert(postBody)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to add post' });
    })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
   .then(users => {
     res.status(200).json(users);
   })
   .catch(err => {
     res.status(500).json({ message: 'Unable to retrieve users' });
   })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Unable to find user by that ID' });
    }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve user" });
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id

  db.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to retrieve user post' });
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'Unable to find user by that ID' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to delete user' });
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const userToUpdate = req.body;
  const id = req.params.id;

  db.getById(id)
    .then(post =>{
      if (!post) {
        res.status(404).json({ message: 'Unable to find user by that ID' });
      }
    })
    if (userToUpdate.name) {
      db.update(id, userToUpdate)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(error => {
        res.status(500).json({ message:'Unable to update user' });
      })
    } else {
      res.status(400).json({ errorMessage: "Please provide name for the user."})
    }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!

}

function validateUser(req, res, next) {
  // do your magic!
    const body = req.body;

  if (body) {
    if (!body.name) {
      res.status(400).json({ message: "Missing required name field" });
    }
    next();
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;

  if (body) {
    if(!body.text) {
      res.status(400).json({ message: "Missing required text field" });
    }
    next();
  } else {
    res.status(400).json({ message: "Missing post data" });
  }
}

module.exports = router;
