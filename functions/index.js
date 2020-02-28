// Purpose: To fetch the date params from VoxEngine and pass them to the Scheduler
'use strict';
 
const functions = require('firebase-functions');
const axios = require('axios');

exports.triggerScheduler = functions.https.onRequest(async (request, response) => {
  var fromDate,toDate;
  console.log(' Request body: ' + JSON.stringify(request.body));
  let params = JSON.stringify(request.body).replace(/\\/g, '');
  let len = params.length;
  params = params.slice(2,len-5);
  console.log(params);
  try{
    fromDate = ''+ JSON.parse(params).from_date;
    toDate = '' + JSON.parse(params).to_date;
    console.log("fromDate: " + fromDate);
    console.log("toDate: " + toDate);
    axios.get(`https://us-central1-rhapsodyautomatedcallservice-a.cloudfunctions.net/scheduler?from_date=${fromDate}&to_date=${toDate}`);
    console.log("========== Timer started =============");
    response.status(200).send("========== Timer started =============");
  } catch(err){
    console.log("Caught error= " + err);
    response.status(500).send(JSON.stringify(err));
  }
});
