
'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID)

module.exports = {
     textQuery: async function(text, parameters={}) {
       let self = module.exports;
       const request = {
         session: sessionPath,
         queryInput: {
           text: {
             text: text,
             languageCode: config.dialogFlowSessionLanguageCode,
           }
         },
         queryParams:
         {
               payload:{
                 data: parameters
               }
         }
       };
       // Send request and log result
       let responses = await sessionClient
         .detectIntent(request);
       responses = await self.handleAction(responses)
       return responses;
     },
     eventQuery: async function(event, parameters={}) {
       let self = module.exports;
       const request = {
         session: sessionPath,
         queryInput: {
           event: {
             name: event,
             parameters: parameters,
             languageCode: config.dialogFlowSessionLanguageCode,
           }
         }
       };
       // Send request and log result
       let responses = await sessionClient
         .detectIntent(request);
       responses = await self.handleAction(responses)
       return responses;
     },


     handleAction: function(responses){
          return responses;
     }
}
