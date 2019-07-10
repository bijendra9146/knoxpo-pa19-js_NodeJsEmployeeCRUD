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
            var response = {
                responseStatus : "006",
                responseMessage : "error while fetching data",
                responseData : err
            }            
            res.send(response);
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
            console.log("Customer address is:", employeeArrayObject) // => "Customer address is: Infinity Loop Drive"
                            
            employeeArrayObject.push(reqData);
            console.log("fetchdata push is:", employeeArrayObject);
            let insertEmployeeData = JSON.stringify(employeeArrayObject);
            fs.writeFileSync('employee.json', insertEmployeeData);     
    
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}

exports.updateEmployeeData = function(req,res){
    console.log("inside insert data ",req.body);
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
    
        } catch(err) {
            console.log('Error parsing JSON string:', err)
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
            console.log("Customer address is:", employeeArrayObject) // => "Customer address is: Infinity Loop Drive"
            
            var fetchdata = employeeArrayObject.filter(function(everyData){
                return everyData.mobile != reqData.mobile
            });
            console.log("fetchdata is:", fetchdata);     
            let removeEmployeeData = JSON.stringify(fetchdata);
            fs.writeFileSync('employee.json', removeEmployeeData);     
    
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })

}