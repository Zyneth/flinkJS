require('dotenv').config();
var axios = require('axios');
var fs = require('fs');




var data = '{"Products":[]}' // json structure
var obj = JSON.parse(data); // json init

axios({
  method: 'get', // http call
  url: 'https://www.goflink.com/api-proxy/home', // flink api
  headers: { // add headers
    'locale': process.env.REGION,  // region (example: de-DE)
    'hub-slug': process.env.FLINKLOCATION // nearby flink location (example: de_ber_wilm)
  }
}).then(response => {
   for (i in response.data.swim_lanes[0].products) { // looping new products
      if (response.data.swim_lanes[0].products[i].id){ // --WIP-- filtering by id -> if id doesnt exist in our object add it with a notification

        obj["Products"].push({'id': response.data.swim_lanes[0].products[i].id,  // add ID, name, desc and price in our JSON object
                              'name':response.data.swim_lanes[0].products[i].name,
                             'description':response.data.swim_lanes[0].products[i].description,
                             'price': response.data.swim_lanes[0].products[i].price.amount+' EUR'});

        console.log(response.data.swim_lanes[0].products[i].name + ' added! ')
        
        fs.writeFile ("products.json", JSON.stringify(obj,'id',2), function(err) { // put JSON object in an external file
          if (err)
            console.log(err)
          } 
        )
    }
  }
})
