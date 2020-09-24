const pool = require('../database')




module.exports.oximetria = function (req, res) {
    
    var hoy = new Date()
    var fecha = hoy.getUTCFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
    var fechaHora = fecha + ' ' + hora
    documento = req.body.documento
    oxigenacion = req.body.oxigenacion
    pulsacion = req.body.pulsacion
  

    pool.query(`SELECT * FROM encuesta.empleados where documento='${documento}';`, function (err, results, fields) {
        // Consulto los datos del empleado para usarlos en el correo
       
        
        if (results.length > 0) {
            
            var string = JSON.stringify(results);
            var json = JSON.parse(string);

            console.log('El usuario existe');
            if (documento) {
                    //     // Consulta SQL.
                    let sql = `INSERT INTO encuesta.oximetria (documento,fecha, oxigenacion, pulsacion) VALUES 
                    ('${documento}','${fechaHora}','${oxigenacion}','${pulsacion}')`

                pool.query(sql, function (error, rows) {
                    if (error) throw error;
                    console.log(rows)
                });
               
                res.render('enviadoox.ejs');//Pantalla envio

                


            } else {
                console.log('error al consultar documento')
                return false;
            }
        } else {
          res.render('errorox.ejs');//Pantalla documento no existe

            }
        
    })
    module.exports.documento = documento
}