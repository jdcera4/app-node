module.exports = (app) =>{

    app.get('/', (req, res) => {
        res.render('index', {
          title: 'Encuesta de Salud'
        });
      });
}