var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// table schema creation
var busSchema = new Schema({
    driver: String,
    busNumber: {
        type: String,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    schedule: Boolean,
    scheduleFrom: String,
    scheduleTo: String,
    scheduleStart: String,
    scheduleEnd: String,
}, {
    timestamps: true
});

// db model or table creation with schema
var BusModel = mongoose.model('Bus', busSchema);



var logsSchema = new Schema({
    event: String
}, {
    timestamps: true
});

var LogsModel = mongoose.model('Log', logsSchema);



mongoose.connect('mongodb+srv://rpgulabsingh:cluster0@cluster0.tedx0.mongodb.net/busbticketbooking');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("db connected")
});


module.exports = {
    BusModel,
    LogsModel
};