const express=require('express');

const router=express.Router();
const {handleCreateURL,handleRedirection}=require('../controllers/url');

router.post('/',handleCreateURL)
router.get('/:shortid',handleRedirection)
module.exports=router;