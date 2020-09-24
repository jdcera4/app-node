var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
 
var connection = require('../database');
module.exports.authenticate=function(req,res){
    var documento=req.body.documento;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM login WHERE documento = ?',[documento], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              res.render('../views/informe.ejs')
            }else{
                res.json({
                  status:false,
                  message:"documento and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"documento does not exits"
          });
        }
      }
    });
    module.exports.documento = documento
}
