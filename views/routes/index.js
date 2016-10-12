 var express = require('express');
var router = express.Router();
var request = require('request');
var geoip = require('geoip-lite')

// au (AU), de (DE), gb(GB), ca(CA)
//ES (ES), FR, (FR), IT (IT), BE (BE)

/* GET home page. */
router.get('/getCountry', function(req, res, next) {
	console.log('This one!!!!')
	console.log('here' + getClientIp(req))
	var realIp = getClientIp(req)
	// var auip = '110.33.122.75'
	// var geip = '2.175.255.255'
	// var ukip = '2.31.255.255'
	// var caip = '192.206.151.131'
	// var spip = '88.26.241.248'
	// var frip = '151.80.197.192'
	// var itip = '31.3.190.254'
	// var beip = '84.195.186.225'
	// var ip = getClientIp(req)
	var geo = geoip.lookup(realIp);
	res.send(geo)
	// res.send(getClientIp(req))
	// request('http://ip-api.com/json', function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	//   	res.send(body)
	//     console.log('***********this right', body) 
	//   }
	// })
	// request('http://ip-api.com/#57.238.152.78', function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	//   	res.send(body)
	//     console.log('***********this right', body) 
	//   }
	// })


});

function getClientIp(req) {
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

module.exports = router;
