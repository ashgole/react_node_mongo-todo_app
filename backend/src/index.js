import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js'
const app = express()
const port = 3000

dotenv.config({
  path:'./env'
})

connectDB()

/*
  ; (async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error", (error) => {
        console.log('ok error:',error);
        throw error
      })

      app.listen(process.env.PORT,()=>{
        console.log(`app  is listening on port${process.env.PORT}`);
      })
    } catch (error) {
      console.log('ok error:', error);
      throw error
    }
  })()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/