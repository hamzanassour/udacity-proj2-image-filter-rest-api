import fs from "fs";
import Jimp = require("jimp");
import axios from "axios";


// our function read of Jimp don't work properly so i use Axios to get the image 

export async function filterImageFromURL(inputURL: string): Promise<string>{
  return new Promise( async resolve => {
    const photo = await axios({
      method: "get",
      url: inputURL,
      responseType: "arraybuffer",
    }).then(function ({ data: imageBuffer }) {
      return Jimp.read(imageBuffer);
    });
      const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
      await photo
      .resize(256, 256) 
      .quality(60) 
      .greyscale() 
      .write(__dirname+outpath, (img)=>{
          resolve(__dirname+outpath);
      });
  });
}

export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
