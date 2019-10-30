const express = require('express');
const postroutes = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
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



 postroutes.post('/update/:id', (req, res, _) => {
  //  console.log(req.params.id)
  if(req.body._id === undefined){
    res.json({message: "WRONG!"})
  }else{
   const theUser = req.body._id
   const postId = req.params.id
   Post.findById(postId)
   .then(thePost => {
    // console.log(req.body._id)
    //  console.log(thePost);
    //  console.log(thePost.likes.indexOf(theUser))
     //CHECK IF THE USER IS ALREADY IN THE LIKE ARRAY
     if(thePost.likes.indexOf(theUser) >= 0){
       const theIndex = thePost.likes.indexOf(theUser)
       thePost.likes.splice(theIndex, 1);
       thePost.save((err)=>{
        if(err){
          res.json({success: false, message: "Something went wrong while Liking the post"})
        }else{
          res.json(thePost)
        }
      })
// IF THE USER IS NOT IN THE ARRAY, WE PUSH THE USER TO THE ARRAY
     }else{
     thePost.likes.push(theUser);
     thePost.save((err)=>{
       if(err){
         res.json({success: false, message: "Something went wrong while Liking the post"})
       }else{
         res.json(thePost)
       }
     })
    }
    
  //    res.json(thePost)
  //  }).catch(err => {
  //    res.json(err);
  
   })
  }
 })

//  postroutes.get('/post/:id', (req, res ,next) => {
//    const theId = req.params.id
//    Post.findById(theId).populate('owner')
//    .then(thePost => {
//      res.status(200).json(thePost)
//    })
//    .catch(err => res.json(err))

//   })

module.exports = postroutes