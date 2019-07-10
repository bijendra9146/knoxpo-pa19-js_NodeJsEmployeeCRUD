var express = require('express');
var router = express.Router();

var employeeControler = require("../Controller/employeeCRUD_Operation")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getEmployeeDeatils', employeeControler.getEmployeeDeatils);

router.post('/insertEmployeeData', employeeControler.insertEmployeeData);

router.post('/updateEmployeeData', employeeControler.updateEmployeeData);

router.post('/removeEmployeeData', employeeControler.removeEmployeeData);





module.exports = router;
