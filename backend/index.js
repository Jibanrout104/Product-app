import express from "express";

import cors from 'cors';
import axios from 'axios';


const app = express();
app.use(cors());


app.get("/",(req,res)=>{
    res.send('Backend')
})

app.get('/api/products', async (req, res) => {
    try {
      // Fetch data from the external API
      const response = await axios.get('https://cdn.drcode.ai/interview-materials/products.json');
      
      // Send the fetched data as the response
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

const port = process.env.PORT || 3001

app.listen(port,()=>{
console.log(`Server is started at http://localhost:${port}`)
})