const express = require('express');
const app = express();
const path = require('path');//Paquete para indicar salto entre carpetas
const bodyParser = require('body-parser');//Paquete para la captura de datos
var connection = require('./database');
//Inicializacion del servidor
app.listen(8080, function () {
    console.log('server inicializado en el puerto 8080')
});
// //Pagina de inicio
// app.get('/', function (req, res) {
//     res.sendFile('./views/index.html', { root: __dirname })
// });

app.set('view engine', 'ejs')
app.locals.tiltle = 'Encuesta de salud';
app.get('/', function async (req, res){
    res.render("index.ejs", )
})

var err 

// connection.query('SELECT * FROM empleados t1 wHERE NOT EXISTS (SELECT NULLFROM registro t2 WHERE t2.documento_empleado = t1.documento and date(fecha)=curdate()) ', (err, result)=>{

// })


// const consulta = require('./consultas')
const captura = require('./controllers/captura')//Llamado archivo captura de encuesta

const authenticateController=require('./controllers/login');//Llamado archivo captura login

const oximetria=require('./controllers/oximetria');//Llamado archivo captura oximetria
const { formatWithOptions } = require('util');

//Uso del bodyParser para captura de datos
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Ubicacion de las paginas estaticas
app.use(express.static(path.join(__dirname, '/views')))
//    app.locals.result = consulta.result;
// app.locals.connection = consulta.connection;
// app.locals.numero = consulta.nom;



// const prueba = [1,2,3,4]
// app.locals.documento = extraer;
//Captura datos de login
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/controllers/authenticate-controller', authenticateController.authenticate, function(req, res){

   

app.locals.documento = authenticateController.documento;
});




// console.log(consulta.results)

//Captura datos de encuesta
app.post('/api/captura',captura.captura);
app.post('/routes/captura-route', captura.captura, function(res,req){

    console.log(captura.documento)
      app.locals.documento = captura.documento;
});

//Captura datos de oximetria
app.post('/api/oximetria',oximetria.oximetria);
app.post('/routes/oximetria-route', oximetria.oximetria, function(){
    console.log(captura.documento)
      app.locals.documento = captura.documento;
});

  

//  app.get('/controllers/authenticate-controller', function async (req, res){  
//      connection.query('SELECT * FROM empleados t1 wHERE NOT EXISTS (SELECT NULLFROM registro t2 WHERE t2.documento_empleado = t1.documento and date(fecha)=curdate()) ', (err, result)=>{
//         let locals = {
//             informe: result ,
//         }
//         res.render( './views/informe.ejs', locals ); 
//         console.log(results)
        
//      })
     
//  })  

