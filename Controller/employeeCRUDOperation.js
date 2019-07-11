const fs = require('fs')



exports.getEmployeeDeatils = function(req,res){
// read file 'employee.json' by fs (file sysytem)
    fs.readFile('employee.json', 'utf8', (err, jsonEmployee) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonEmployee)
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

    var reqData = req.body;
// read file 'employee.json' by fs (file sysytem)
    fs.readFile('employee.json', 'utf8', (err, jsonEmployee) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonEmployee)
                            
            employeeArrayObject.push(reqData);
            let insertEmployeeData = JSON.stringify(employeeArrayObject);
            fs.writeFileSync('employee.json', insertEmployeeData);

            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile == reqData.mobile
            })

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
    var reqData = req.body;
// read file 'employee.json' by fs (file sysytem)
    fs.readFile('employee.json', 'utf8', (err, jsonEmployee) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonEmployee)
            
            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile != reqData.mobile
            })
            fetchdata.push(reqData);
            let updateEmployeeData = JSON.stringify(fetchdata);


            fs.writeFileSync('employee.json', updateEmployeeData); // here after exicution new data is updating in employee.json using writeFileSync
            
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

    var reqData = req.body;

    fs.readFile('employee.json', 'utf8', (err, jsonEmployee) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const employeeArrayObject = JSON.parse(jsonEmployee)
            
            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile != reqData.mobile
            });
            let removeEmployeeData = JSON.stringify(fetchdata);
            fs.writeFileSync('employee.json', removeEmployeeData); // here after removing data, new data is updating in employee.json using writeFileSync
            
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