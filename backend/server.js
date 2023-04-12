// variables et constantes
const express = require('express');
const app = express();
const port = 4000;
const products = require('./database/database.json');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());


function eventListeners(){
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });


  app.get('/products', (req, res) => {
    res.json(products);
  });


  app.get('/addCart', (req, res) => {
    res.json(products);
  });

  app.post('/addCart', async (req, res) => {
    const data = req.body;
  
    try {
      const fileData = await fs.promises.readFile('./database/database.json', 'utf-8');
      const parsedData = JSON.parse(fileData);
  
      parsedData.cartItems.push(data);
  
      await fs.promises.writeFile('./database/database.json', JSON.stringify(parsedData), 'utf-8');
      res.status(200).send('Data saved to file');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving data to file');
    }
  });

  app.delete('/cart/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      const fileData = await fs.promises.readFile('./database/database.json', 'utf-8');
      const parsedData = JSON.parse(fileData);
  
      // Recherche et supprime le produit avec l'identifiant correspondant
      parsedData.cartItems = parsedData.cartItems.filter(item => item.id.toString() !== id.toString());
  
      await fs.promises.writeFile('./database/database.json', JSON.stringify(parsedData), 'utf-8');
      res.status(200).send('Data saved to file');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving data to file');
    }
  });
  
}
eventListeners();






