//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
// Body Parser Middleware
app.use(bodyParser.json()); 
var config = {
        user: 'sa',
        password: 'fulcrum#1',
        server: '192.168.41.186', 
        database: 'BALI_OLS_FLEXI_TERM'
    };
	//GET API

var server = app.listen(9001, function () {
    console.log('Server is running..');
});

//Function to connect to database and execute query
var  executeQuery = function(res, query){   
console.log("entered in executeQuery");          
     sql.connect(config, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
						 
                         request.query(query, function (err, recordset) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(recordset);
                                            }
                               });
							  
                       }
      });           
}

//GET API
app.get('/api/company',function(req,res){	
	var query='SELECT top 5 [PK_COMPANY_ID],[COMPANY_NAME] FROM [BALI_OLS_FLEXI_TERM].[dbo].[OLS_MST_COMPANY]';	
	executeQuery(res,query);
});

//Post API
app.post('/api/company',function(req,res){
	
	 var query = "insert into [OLS_MST_COMPANY] ([COMPANY_NAME],[CREATED_DATE],[CREATED_BY]) values ('" + req.body.CompanyName + "','" + req.body.CreatedDate + "','" + req.body.CreatedBy + "')";
      console.log(query);      
	  executeQuery(res,query);
		
	});

//Put API
app.put('/api/company', function (req, res) {    
    var query = "update  [OLS_MST_COMPANY] set [COMPANY_NAME]='" + req.body.CompanyName + "',[CREATED_DATE]='" + req.body.CreatedDate + "',[CREATED_BY]='" + req.body.CreatedBy + "' where PK_COMPANY_ID='" + req.body.id + "'";
    console.log(query);
    executeQuery(res, query);
});

app.delete('/api/company', function (req, res) {
    var query = "delete from  [OLS_MST_COMPANY] where PK_COMPANY_ID='" + req.body.id + "'";
    console.log(query);
    executeQuery(res, query);
});