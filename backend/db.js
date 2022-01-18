
const mongoose = require('mongoose');


const uri = 'mongodb://localhost:27017/iNotes';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB =async () => {
    mongoose.connect(uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection")
    })

//     const productSchema = new mongoose.Schema({
//   name: String
// });

//  const  ProductModel = mongoose.model('products',productSchema);
// let data=new ProductModel({name:"harry"});
// //  let result= await data.save();
//  console.log(result)



}
module.exports=connectWithDB;

















// var mysql      = require('mysql');
// var con= mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'inote'
// });
// con.connect((err)=>{
//     if(err){
//         console.warn("error")
//     }
//     else{
//         console.warn("connected")
//     }
// });
// // con.query('SELECT * FROM `samiullah`',(err,result)=>{
// //     console.warn("result:",result)
// // })


