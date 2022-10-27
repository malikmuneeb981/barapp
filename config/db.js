







const mongoose=require('mongoose')


const connectDB=async ()=>{

const conn = await mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);


}

module.exports=connectDB













































// const mongoose=require('mongoose')

// const coonectDB=async ()=>{
//     const conn = await mongoose.connect(process.env.MONGO_URL)
//     console.log('Connected');
// }

// module.exports=coonectDB