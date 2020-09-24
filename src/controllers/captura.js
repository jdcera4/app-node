const pool = require('../database')
const nodemailer = require('nodemailer');//Paquete para el envio de correos
const path = require('path');//Paquete para indicar salto entre carpetas
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, '../views')))


//captura de datos
 module.exports.captura = function (req, res) {

    var hoy = new Date()
var fecha = hoy.getUTCFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
var fechaHora = fecha + ' ' + hora
    var cont = 0
    var sint = [];
    documento = req.body.documento
    nombre = req.body.nombre
    sint_1 = req.body.sintoma1
    sint_2 = req.body.sintoma2
    sint_3 = req.body.sintoma3
    sint_4 = req.body.sintoma4
    sint_5 = req.body.sintoma5
    sint_6 = req.body.sintoma6
    sint_7 = req.body.sintoma7
    sint_8 = req.body.sintoma8
    conf = req.body.confirmacion
 

    if (sint_1 == "on") {
        sint_1 = 1
        cont += 1
        sint.push(' Malestar general')
    }
    else {
        sint_1 = 0
    }

    if (sint_2 == "on") {
        sint_2 = 1
        cont += 1

        sint.push(' Sensación de fatiga o cansancio muscular')
    }
    else {
        sint_2 = 0
    }

    if (sint_3 == "on") {
        sint_3 = 1
        cont += 1
        sint.push(' Tos seca y persistente')
    }
    else {
        sint_3 = 0
    }

    if (sint_4 == "on") {
        sint_4 = 1
        cont += 1
        sint.push(' Fiebre (+ 38º C)')
    }
    else {
        sint_4 = 0
    }

    if (sint_5 == "on") {
        sint_5 = 1
        cont += 1
        sint.push(' Pérdida del olfato y/o el gusto')
    }
    else {
        sint_5 = 0
    }

    if (sint_6 == "on") {
        sint_6 = 1
        cont += 1
        sint.push(' Sensación de falta de aire / Dificultad para respirar')
    }
    else {
        sint_6 = 0
    }

    if (sint_7 == "on") {
        sint_7 = 1
        cont += 1
        sint.push(' Secreciones nasales o congestión nasal')
    }
    else {
        sint_7 = 0
    }

    if (sint_8 == "on") {
        sint_8 = 1
        cont += 1
        sint.push(' Contacto en los últimos 14 días con alguien sospecho o confirmado de tener COVID-19<br>')
    }
    else {
        sint_8 = 0
    }
    if (conf == "on") {
        conf = '1'
    }
    else {
    }
    conf = '0'
    
    pool.query(`SELECT * FROM encuesta.empleados where documento='${documento} ';`, function (err, results, fields) {
        // Consulto los datos del empleado para usarlos en el correo
       console.log('results'+results)
       console.log('err'+err)
       console.log('fields'+fields)
        if (results.length > 0) {
            console.log(results.length)
            var string = JSON.stringify(results);
            var json = JSON.parse(string);

            console.log('El usuario existe');
            if (documento) {

                if (cont >= 2) {
                    async function main() {
                        //Contenido del correo si presenta sintomas
                        ContentHTML = `
                        <h1>Reporte Encuesta de Salud</h1>
                        <p><strong>Nombre empleado:</strong> ${json[0].nombre} ${json[0].apellido}</p>
                        <p><strong>Documento:</strong> ${documento}</p> 
                        <p><strong>Centro de costos:</strong> ${json[0].nom_ccosto}</p>
                        <p><strong>Ubicación:</strong> ${json[0].nom_area}</p> 
                        
                        <p><strong>Sintomas reportados: </strong> ${sint} </p>
                               
                        <h4>Informacion de contacto </h4>
                        <p>
                        <strong>Celular:</strong> ${json[0].celular} <br>
                        <strong>Telefono:</strong> ${json[0].telefono} <br>
                        <strong>Correo:</strong> ${json[0].email}
                        </p>
                        
                        `
                        req.list = json;
                        // test de la informacion de nodemailer
                        let testAccount = await nodemailer.createTestAccount();

                        //transportador
                        let transporter = nodemailer.createTransport({
                            //si se va a utilizar gmail se debe habilar la opcion de ingreso de aplicaciones poco seguras
                            host: 'smtp.gmail.com',//buscar el smtp del servidor de correo que va a utilizar para enviar los correos
                            puerto: 587,
                            secure: false,
                            auth: {
                                user: "tecuida.bigjohn@gmail.com",//correo que va a enviar los email
                                pass: "bigjohn12345"//contraseña del correo
                            }
                        });

                        //informacion del email que se va a enviar y a quien se va a enviar
                        let info = await transporter.sendMail({
                            from: '"Big John te Cuida" <tecuida.bigjohn@gmail.com>',
                            to: `ceradavid11@gmail.com,${json[0].email}`, //correo receptor
                            subject: `Encuesta de salud - ${json[0].nombre} ${json[0].apellido}`,
                            html: ContentHTML
                        });

                        console.log("Message sent: %s", info.messageId);

                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


                    }

                    main().catch(console.error);
                } else {
                    console.log('No marcó sintomas')
                    async function main() {
                    contenido = `
                    <h1>Reporte Encuesta de Salud</h1>
                    <p><strong>Nombre empleado:</strong> ${json[0].nombre} ${json[0].apellido}</p>
                    <p><strong>Documento:</strong> ${documento}</p> 
                    <p><strong>Centro de costos:</strong> ${json[0].nom_ccosto}</p>
                    <p><strong>Ubicación:</strong> ${json[0].nom_area}</p> 
          
                    <p>Los datos de la encuesta resueltos el en la fecha ${fecha} se han enviado correctamente, gracias por su colaboracion</p>
                           
                    
                    
                    `
                    req.list = json;
                    // test de la informacion de nodemailer
                    let testAccount = await nodemailer.createTestAccount();

                    //transportador
                    let transporter = nodemailer.createTransport({
                        //si se va a utilizar gmail se debe habilar la opcion de ingreso de aplicaciones poco seguras
                        host: 'smtp.gmail.com',//buscar el smtp del servidor de correo que va a utilizar para enviar los correos
                        puerto: 587,
                        secure: false,
                        auth: {
                            user: "tecuida.bigjohn@gmail.com",//correo que va a enviar los email
                            pass: "bigjohn12345"//contraseña del correo
                        }
                    });

                    //informacion del email que se va a enviar y a quien se va a enviar
                    let info = await transporter.sendMail({
                        from: '"Big John te Cuida" <tecuida.bigjohn@gmail.com>',
                        to: `${json[0].email}`, //correo receptor
                        subject: `Encuesta de salud - ${json[0].nombre} ${json[0].apellido}`,
                        html: contenido
                    });

                    console.log("Message sent: %s", info.messageId);

                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


                }
        main().catch(console.error);
            }
                

                //     // Consulta SQL.
                let sql = `INSERT INTO encuesta.registro (documento_empleado,fecha,sint_1,sint_2,sint_3,sint_4,sint_5,sint_6,sint_7,sint_8,confirmacion) VALUES 
                    ('${documento}','${fechaHora}','${sint_1}','${sint_2}','${sint_3}','${sint_4}','${sint_5}','${sint_6}','${sint_7}','${sint_8}','${conf}')`

                pool.query(sql, function (error, rows) {
                    if (error) throw error;
                    console.log(rows)
            //    con.end();
                });
               
                res.render('enviado.ejs');
                
                
    console.log('Llegué')

            } else {
                console.log('error al consultar documento')
                return false;
            }
        } else {
            res.render('error.ejs');
            
        }
    

    });
module.exports.documento = documento
};
