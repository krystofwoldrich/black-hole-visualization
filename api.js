class Api{
  constructor(app) {
    this.app = app;

    this.app.post('/api/load-data', (req, res) => {
      console.log("-> getting something", );
      if(req.body.address){
        return res.download(req.body.address);
      }
    });
  }

}

module.exports = Api;
