// const conn = require('./database')




// const doQuery = (query) => {
//     return new Promise((resolve, reject) => {
//         con.query(query, (error, results, fields) => {
//             if(error) return reject(error);
//             console.log('Consulta correcta');
//             return resolve(results);
//         });
//     });
// }

// const doStuffWithResults = (resultados) => {
//     console.log(resultados);
//     // Aquí haces cosas con los resultados
// }

// const doMoreStuffWithResults = (resultados) => {
//     console.log(resultados);
//     // Aquí haces más cosas con los resultados
// }

// // declaro mi consulta aquí
// const selectAllQuery = "SELECT concat(nombre,' ', apellido)as empleado , nom_ccostoFROM empleados t1WHERE NOT EXISTS (SELECT NULLFROM registro t2 WHERE t2.documento_empleado = t1.documento and date(fecha) = curdate()) and nom_ccosto not in ('AREA FINCA-CASA')order by nom_area;";

// // realizo mi consulta aquí y el resultado lo almaceno en una variable
// const results = await doQuery(selectAllQuery);

// // llamamos a nuestros métodos y le pasamos el resultado para realizar tareas
// doStuffWithResults(results);
// doMoreStuffWithResults(results);

// module.exports.results = results








// const controller = {};

// controller.list = (req, res) => {
//   req.getConnection((err, conn) => {
//     conn.query("SELECT concat(nombre,' ', apellido)as empleado , nom_ccostoFROM empleados t1WHERE NOT EXISTS (SELECT NULLFROM registro t2 WHERE t2.documento_empleado = t1.documento and date(fecha) = curdate()) and nom_ccosto not in ('AREA FINCA-CASA')order by nom_area;", (err, customers) => {
//      if (err) {
//       res.json(err);
//      }
//      res.render('informe', {
//         data: informe
//      });
//     });
//   });
// };









function extraer(query){
    console.log(query)
    // app.locals.documento = query;
//    module.export.query = query
}



const { query } = require('express')
const connection = require('./database')
var numero = 80
var nom
var consul = connection.query("SELECT concat(nombre,' ', apellido)as empleado , nom_ccosto FROM empleados t1 WHERE NOT EXISTS (SELECT NULL FROM registro t2 WHERE t2.documento_empleado = t1.documento and date(fecha) = curdate()) and nom_ccosto not in ('AREA FINCA-CASA')order by nom_area;", (err, result)=>{
    
    // extraer(result)
    // console.log(err)
    nom = result
    module.exports.nom = nom
//   console.log(nom)
// module.exports.result = {result,err};

})

  


module.exports.consul = consul