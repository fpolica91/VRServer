const express = require('express');
const postroutes = express.Router();
const Post = require('../models/Post');

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');


postroutes.get('/createNewPost', (req, res, next) => {
  Post.find()
  .then(theData => {
    res.status(200).json(theData)
  })
  .catch(err => next(err))
  })

  
postroutes.post('/createNewPost', uploader.single("imageUrl"), (req, res, next) => {
 // console.log(req.body)
  const {caption, imagePost} = req.body
  Post.create({
    caption,
    image: imagePost,
    owner: req.user,
    likes: []
  }).then(newPost => {
    console.log("NEW POST!", newPost)
  //  if(newPost){
  //   res.status(200).json({message: "New post made successfully!"});
  //  }
  })
  .catch(err => console.log(err))
})

module.exports = postroutes