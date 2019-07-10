const fs = require('fs')



exports.getEmployeeDeatils = function(req,res){

    fs.readFile('employee.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonString)
            console.log("Customer address is:", employeeArrayObject) // => "Customer address is: Infinity Loop Drive"
            var response = {
                responseStatus : "000",
                responseMessage : "Employee Data Fetch successfuly",
                responseData : employeeArrayObject
            }            
            res.send(response);
    } catch(err) {
            console.log('Error parsing JSON string:', err)
            var errorResponse = {
                responseStatus : "006",
                responseMessage : "error while fetching data",
                responseData : err
            }            
            res.send(errorResponse);
        }
    })

}

exports.insertEmployeeData = function(req,res){

    console.log("inside insert data ",req.body);
    var reqData = req.body;

    fs.readFile('employee.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonString)
                            
            employeeArrayObject.push(reqData);
            console.log("fetchdata push is:", employeeArrayObject);
            let insertEmployeeData = JSON.stringify(employeeArrayObject);
            fs.writeFileSync('employee.json', insertEmployeeData);

            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile == reqData.mobile
            })
            console.log("fetchdata filter is:", fetchdata);
            

            var response = {
                responseStatus : "000",
                responseMessage : "Employee Data Successfuly Inserted",
                responseData : fetchdata
            }            
            res.send(response);

        } catch(err) {
            console.log('Error parsing JSON string:', err)
            var errorResponse = {
                responseStatus : "006",
                responseMessage : "Error while Inserting Employee Data",
                responseData : err
            }            
            res.send(errorResponse);
        }
    })
}

exports.updateEmployeeData = function(req,res){
    console.log("inside update data ",req.body);
    var reqData = req.body;

    fs.readFile('employee.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonString)
            console.log("Customer address is:", employeeArrayObject) // => "Customer address is: Infinity Loop Drive"
            
            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile != reqData.mobile
            })
            console.log("fetchdata is:", fetchdata);          
            fetchdata.push(reqData);
            console.log("fetchdata push is:", fetchdata);
            let updateEmployeeData = JSON.stringify(fetchdata);
            fs.writeFileSync('employee.json', updateEmployeeData); 
            
            var response = {
                responseStatus : "000",
                responseMessage : "Employee Data Successfuly Updated",
                responseData : reqData
            }            
            res.send(response);    
    
        } catch(err) {
            console.log('Error parsing JSON string:', err)
            var errorResponse = {
                responseStatus : "006",
                responseMessage : "Error while Updating Employee Data",
                responseData : err
            }            
            res.send(errorResponse);
        }
    })
}


exports.removeEmployeeData = function(req,res){

    console.log("inside insert data ",req.body);
    var reqData = req.body;

    fs.readFile('employee.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonString)
            console.log("Customer address is:", employeeArrayObject); 
            
            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile != reqData.mobile
            });
            console.log("fetchdata is:", fetchdata);     
            let removeEmployeeData = JSON.stringify(fetchdata);
            fs.writeFileSync('employee.json', removeEmployeeData); 
            
            var response = {
                responseStatus : "000",
                responseMessage : "Employee Data Successfuly Deleted",
                responseData : fetchdata
                
            }            
            res.send(response);
    
        } catch(err) {
            console.log('Error parsing JSON string:', err);
            var errorResponse = {
                responseStatus : "006",
                responseMessage : "Error while Deleting Employee Data",
                responseData : err
            }            
            res.send(errorResponse);
        }
    })

}