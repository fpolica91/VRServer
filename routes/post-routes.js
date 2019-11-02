const express = require('express');
const postroutes = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const User = require('../models/User')
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
  })
  .catch(err => console.log(err))
})



postroutes.get('/createNewPost', (req, res, next) => {
  try{ 
    Post.find().populate('owner', '_id imageUrl username')
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

 postroutes.post('/delete/:id', (req, res, next) => {
   const postId = req.params.id
   console.log(postId)
   Post.findByIdAndDelete(postId)
   .then(postToDelete => console.log(postToDelete))
   .catch(err => console.log(err))
 })


module.exports = postroutes