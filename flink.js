require('dotenv').config();
var axios = require('axios');
var fs = require('fs');
const { MessageEmbed, WebhookClient } = require('discord.js');


const webhookClient = new WebhookClient({ id: process.env.WEBHOOKID, token: process.env.WEBHOOKTOKEN });




axios({
  method: 'get', // http call
  url: 'https://www.goflink.com/api-proxy/products', // flink api
  headers: { // add headers
    'locale': process.env.REGION,  // region (example: de-DE)
    'hub-slug': process.env.FLINKLOCATION // nearby flink location (example: de_ber_wilm)
  }
}).then(response => {
          fs.readFile('products.json', 'utf-8', function(err, data) {
            var arrayOfObjects = JSON.parse(data)
            
          	if (err) throw err
            
            for (i in response.data) { // loop products array
            
              if (arrayOfObjects.Products[i]?.id == response.data[i].id  ){ // check if id already exists
                  console.log(response.data[i].name + "already exists");
                  }else{
                    arrayOfObjects.Products.push({
                      'id': response.data[i].id,  // add ID, name, desc and price in our JSON object
                     'name':response.data[i].name,
                     'description':response.data[i].description,
                     'price': response.data[i].price.amount+' EUR'});
                     console.log(response.data[i].name+ ' added')
    
      
                     fs.writeFile('products.json', JSON.stringify(arrayOfObjects, 'id', 2), 'utf-8', function(err) { // write to external file
                   
                    
                     if (err) throw err})
                  }
              }

              for (i in arrayOfObjects.Products){
                const embed = new MessageEmbed()
                .setTitle(response.data[i].name)
                .setURL('https://www.goflink.com/'+process.env.REGION+'/shop/product/'+response.data[i].slug+ '-'+ response.data[i].sku+'/')
                .setColor('#0099ff')
                .setDescription(response.data[i].description)
                .setFooter('Preis:' + response.data[i].price.amount+'€')
                .setImage(response.data[i].images[0]);

                webhookClient.send({
              
                embeds: [embed],
                  });
                
              }
         }
   )}
)
