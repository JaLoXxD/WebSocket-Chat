const { Router } = require('express');
const express = require('express');
const router = Router();

const image = require('../models/image')

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/images',async (req,res)=>{
    const images = await image.find({});
    console.log('imagenes:');
    console.log(images);
    res.render('images',{ images: images })
})

router.post('/upload', async (req,res)=>{
    //console.log(req.file);
    const img = new image();
    img.title = req.body.title;
    img.description = req.body.description;
    img.filename = req.file.filename;
    img.path = '/uploads/' + req.file.filename;
    await img.save();
    console.log('titulo: '+img.title);
    console.log('upload')
    res.render('upload');
})

module.exports = router;