const {connectToDB,getdb}=require('../db')

// connect to db 
let db
connectToDB(()=>{
   db=getdb()
})


const getURLs=((req,res)=>{
    let urls=[]
    db.collection('shortenurls').find().forEach(url => {
        urls.push(url)
    })
    .then(()=>{res.render('index',{urls})})
    .catch((err=>{console.log(err);}))
}
)

const postURLs=((req,res)=>{
    const alias=req.body.aliasInput
    db.collection('shortenurls').findOne({alias:alias}) 
    .then((result)=>{
        if (result) {
            res.send('<script>alert("This alias is already taken, please insert a new one."); window.location.href = "/"</script>');
            
        }
        else{
            let Urlbody={
                urlInput:req.body.urlInput,
                alias:alias,
                shortenUrl:`http://localhost:3000/${alias}`
        }
            db.collection('shortenurls').insertOne(Urlbody)
            .then(()=>{res.redirect('/')})
            .catch((err)=>{console.log(err);})
    
        }
    })
   
    
})

const redirectURL=((req,res)=>{
    const alias=req.params.alias
    db.collection('shortenurls').findOne({alias:alias})
    .then((result=>{
        if (result) {
            res.redirect(result.urlInput)
        }
        else{
            res.status(404).send('Url not Founed')
        }
       
    }))
    .catch((err)=>{console.log(err);})
})
module.exports={getURLs,postURLs,redirectURL}