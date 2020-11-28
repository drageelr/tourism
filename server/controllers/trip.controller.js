'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.createTrip = async (req, res, next) => {
    try {
        let params = req.body;

        const keys =['id','adminID','name','description','itienrary','price','capacity','startDate','endDate'];
        let locationQuery ="SELECT count(*) distinct FROM trip_location WHERE id IN (";
        for (let i =0; i<params.locationIDs.length ;i++){
            if (i < params.locationIDs.length -1){
                locationQuery += params.locationIDs[i] +",";
            }else{
                locationQuery += params.locationIDs[i] +")";

            }
        }
        if (locationQuery != "SELECT count(*) distinct FROM trip_location WHERE id IN ("){
            let result1 = await db.query(locationQuery)
            if (result1["count(*)"] !=params.locationIDs.length){
                throw new customError.DuplicateResourceError("Contains invalid or duplicate location id")
            }
        }

        let result = await db.query('INSERT INTO trip (adminID,name,description,itienary,price,capacity,startDate,endDate) VALUES (' +params.user.id+',"' + params.name + '", "' + params.description +'", "' + params.itienary + ','+params.price+','+params.capacity+', STR_TO_DATE("'+params.startDate.getDate()+'-'+params.startDate.getMonth()+'-'+params.startDate.getYear()+'","%d-%m-%Y"),STR_TO_DATE("'+params.endDate.getDate()+'-'+params.endDate.getMonth()+'-'+params.endDate.getYear()+'","%d-%m-%Y"))');
        if (params.locationIDs.length !=0) {
            let locationStrings = [];
            let locationValues = "";
            for (let i =0; i<params.locationIDs.length ;i++){
                locationStrings.push("("+result.insertId+","+params.locationIDs[i]+")")
            }
            for (let i =0 ; i<locationStrings.length-1;i++){
                locationValues+=locationStrings[i]+","
            }
            locationValues+=locationStrings[locationStrings.length-1]
            await db.query('INSERT INTO trip_location (tripID,locationID) VALUES '+locationValues)
        }
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip created Successfully",
            id: result.insertId
        })
    } catch(err) {
        next(err);
    }
}
exports.fetchTrip = async (req, res, next) => {
    try {
        let params = req.body;
        
       
    } catch(err) {
        next(err);
    }
}

exports.editTrip = async (req, res, next) => {
    try {
        let params = req.body;
        const keys =['id','adminID','name','description','itienrary','price','capacity','startDate','endDate'];
        let updateQuery = 'UPDATE trip';
        let setQuery ="SET";
        for (let i = 2; i < keys.length; i++){
            if (params[keys[i]]!=undefined){
                setQuery+=' ' + keys[i] +'='+ params.keys[i]+"," 
            }
        }
        setQuery=setQuery.slice(0,-1);
        let whereQuery = "WHERE id ="+params.id;
        let result = await db.query(updateQuery+setQuery+whereQuery);
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip Edited Successfully!",
        });
 
    } catch(err) {
        next(err);
    }
}