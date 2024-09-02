const {MongoClient}=require('mongodb')

let connectiondb
const connectToDB=(cb)=>{
    MongoClient.connect('mongodb://localhost:27017/URLS')
    .then((client=>{
        connectiondb=client.db()
        return cb()
    }))
    .catch((err)=>{
        console.log(err);
        return cb(err)
    })
}
module.exports={
    connectToDB,
    getdb:()=> connectiondb
}
