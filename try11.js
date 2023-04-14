
//UNCOMMENT AFTER TESTING API
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    // Toggle Nav
    navLinks.classList.toggle("show__navLinks");

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// end of html srcipt 

//TO CONNECT TO MY MONGODB CODE:            
var input;
//Import the MongoClient class from the mongodb package:
const { MongoClient } = require('mongodb');
//import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://rishithodupunuri:rishithodupunuri@cluster0.kfkuxue.mongodb.net/AutomobileDictionary?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });


main(processData);
async function main(callback) {
   
    //Use a try-catch block to connect to the MongoDB Atlas cluster:
    try {
       
        // const uri = 'mongodb+srv://rishithodupunuri:rishithodupunuri@cluster0.kfkuxue.mongodb.net/AutomobileDictionary?retryWrites=true&w=majority';
        // const client = new MongoClient(uri, { useUnifiedTopology: true });
        // Connect to MongoDB Atlas cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas cluster');

        const carCollection = client.db('AutomobileDictionary').collection('CarDetails');

        const collectionData = {

            CarDetails: await carCollection.find().toArray()
        };
        //const cars = await carCollection.find().toArray();
        console.log(collectionData);


        input = collectionData;
        console.log('input data rishi:');
        console.log(input);
        // Call the callback function with the data as a parameter
        callback(input);
    } catch (err) {
        console.error(err);
    } finally {
        // Close the MongoDB Atlas cluster connection
        await client.close();
        console.log('Disconnected from MongoDB Atlas cluster');
    }

}




//my experiment code

//import https from 'https';
function processData(data) {

    const https = require("https");
    const fs = require("fs");
    const path = require("path");
    
    const PORT = process.env.PORT || 3000;
    const staticPath = path.join(__dirname, "public");
    
    const server = https.createServer((req, res) => {
      // Serve portfolio website from public folder
      if (req.url === "/") {
        const filePath = path.join(staticPath, "index.html");
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            console.error(err);
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
        return;
      }
    
      // Serve JSON data from /api endpoint
      if (req.url === "/api") {
        const filePath = path.join(staticPath, "data.json");
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            console.error(err);
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        });
        return;
      }
    
      // Handle 404 Not Found
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    });
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    

}

