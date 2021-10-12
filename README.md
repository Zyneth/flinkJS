# flinkJS


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a fix to FLINKs "Newly added products" function. It can be bind to any communication platform such as discord or microsoft teams (as webhook or bot) for real-time notifications.
	
## Technologies
Project is created with:
* NodeJS: v16.11.0
* discord.js: 13.2.0
* Axios: 0.22.0
	
## Setup
To run this project, install it locally using npm:

```
$ npm i 
$ node flink
```
Also your JSON object should look like this:
```json
{
  "Products": []
}
```
## .env Variables
You will need the following variables in your .env file to run this script:

*REGION (Example: de-DE)
*FLINKLOCATION (Example: de_ber_wilm for a location in berlin)
*WEBHOOKID (The first parameter of your Webhook URL -> https://discord.com/api/webhooks/{YOURID}/{YOURTOKEN})
*WEBHOOKTOKEN (The second parameter of your Webhook URL -> https://discord.com/api/webhooks/{YOURID}/{YOURTOKEN})

