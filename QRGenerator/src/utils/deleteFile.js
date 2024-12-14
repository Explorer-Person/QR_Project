const path = require('path');
const fs = require('node:fs');

const deleteFile = (pathName, fileName) =>{
       const targetFile = path.join(__dirname, '../', pathName, fileName)
       return new Promise((resolve, reject) => {
        fs.unlink(targetFile, (err,res)=>{
            if(err){
                reject(err)
            }
            console.log('file successfully deleted.')
            resolve(true)
           }); 
       })       
}


module.exports = {deleteFile};