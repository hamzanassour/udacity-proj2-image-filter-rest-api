import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import {Request, Response} from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;1
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1  (my endpoint )
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const image_url = req.query.image_url;
    if (!image_url) {
      // if we don't find an image_url query parameter in the request we sen a 400 status 
      return res.status(400).send('you shouls give  a valid url ');
    }
    else{
      // filter our image 
      const filteredPath = await filterImageFromURL(image_url);
       res.sendFile(filteredPath, {}, () => deleteLocalFiles([filteredPath]));
    }
  });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();