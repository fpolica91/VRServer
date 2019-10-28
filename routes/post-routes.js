const express = require('express');
const postroutes = express.Router();
const Post = require('../models/Post');

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');

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
    res.status(200).json(newPost)
  //  if(newPost){
  //   res.status(200).json({message: "New post made successfully!"});
  //  }
  })
  .catch(err => console.log(err))
})



postroutes.get('/createNewPost', (req, res, next) => {
  try{ 
    Post.find().populate('owner')
   .then(theData => {res.status(200).json(theData)})
   .catch(err => next(err))
 }catch(err){
   console.log(err);
 }
 })

 postroutes.get('/post/:id', (req, res ,next) => {
   const theId = req.params.id
   Post.findById(theId).populate('owner')
   .then(thePost => {
     res.status(200).json(thePost)
   })
   .catch(err => res.json(err))

  })

module.exports = postroutes