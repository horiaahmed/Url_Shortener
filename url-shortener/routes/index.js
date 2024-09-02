const router = require('express').Router();
const {getURLs,postURLs,redirectURL}=require('../controller/control')


/* GET home page. */
router.get('/',getURLs)

// post URLs

router.post('/',postURLs)

// redierct from short url to the original url
router.get('/:alias',redirectURL)

module.exports = router;
