require('dotenv').config();
var axios = require('axios');
var fs = require('fs');

const webhookClient = new WebhookClient({ id: process.env.WEBHOOKID, token:process.env.WEBHOOKTOKEN});

channel.createWebhook('Flink Webhook', {
	avatar: 'https://i.imgur.com/JiF6DNA.jpeg',
})
	.then(webhook => console.log(`Created webhook ${webhook}`))
	.catch(console.error);




axios({
  method: 'get', // http call
  url: 'https://www.goflink.com/api-proxy/home', // flink api
  headers: { // add headers
    'locale': process.env.REGION,  // region (example: de-DE)
    'hub-slug': process.env.FLINKLOCATION // nearby flink location (example: de_ber_wilm)
  }
}).then(response => {
          fs.readFile('products.json', 'utf-8', function(err, data) {
            var arrayOfObjects = JSON.parse(data)
            
          	if (err) throw err
            for (i in response.data.swim_lanes[0].products) { // loop products array
            
              if (arrayOfObjects.Products[i]?.id == response.data?.swim_lanes[0]?.products[i]?.id  ){ // check if id already exists
                  console.log(response.data.swim_lanes[0].products[i].name + "already exists");
                  }else{
                    arrayOfObjects.Products.push({
                      'id': response.data.swim_lanes[0].products[i].id,  // add ID, name, desc and price in our JSON object
                     'name':response.data.swim_lanes[0].products[i].name,
                     'description':response.data.swim_lanes[0].products[i].description,
                     'price': response.data.swim_lanes[0].products[i].price.amount+' EUR'});
                     console.log(response.data.swim_lanes[0].products[i].name+ ' added')
    
      
                     fs.writeFile('products.json', JSON.stringify(arrayOfObjects, 'id', 2), 'utf-8', function(err) { // write to external file
                     if (err) throw err})
                  }
              }
         }
   )}
)
