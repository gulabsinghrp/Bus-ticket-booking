const express = require('express')
var bodyParser = require('body-parser')
const { BusModel, LogsModel } = require("./models/Bus.js")
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/', function (req, res) {
  res.send('Booking server backend API is running..')
})


// for list
app.get('/bus', function(req, res){

    // get required info from req object
    // query db based on req and collect data
    // format data
    BusModel.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err)
    })

})

// to create
app.post("/bus", (req, res)=>{

    let data =  req.body;
   
    BusModel.create(data)
    .then((data)=>{
       LogsModel.create({event: "new bus created"}).then((x)=>{})
        res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
    // send response

})


// to update
app.put("/bus", async (req, res)=>{

    let busId = req.body.busId;
    let data = req.body.updateData;

    BusModel.findByIdAndUpdate({_id:busId},data)
    .then((data)=>{
    LogsModel.create({event: "bus updated"}).then((x)=>{})
    res.send(data)

    })
    .catch((err)=>{
       res.send(err)
    })
    // send response

})

// to delete
app.delete("/bus", async (req, res)=>{

    let busId = req.body.busId



    BusModel.findOneAndDelete({_id:busId})
    .then((data)=>{

        LogsModel.create({event: "a bus deleted"}).then((log)=>{})
        res.send(data)

    })
    .catch((err)=>{

        res.send(err)
    })
    // send response
})

app.listen(3000, function(){
    console.log("server is running")
})