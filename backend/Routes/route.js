const express = require('express')
const multer = require('multer');
const path = require('path');
const router = express.Router()
const {add_request,get_requests} = require('../Controllers/request_controller');
const book_now = require('../Controllers/book_now_controller');
const login = require('../Controllers/login_controller');
const { add_pilot, get_pilot, delete_pilot, update_pilot } = require('../Controllers/add_pilot');
const {  assign_task, get_tasks, delete_task, update_task } = require('../Controllers/task_controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current date as the file name to ensure unique names
    },
  });
  
  const upload = multer({ dest: 'uploads/' });


router.post('/addrequest',add_request)
router.get('/getrequests',get_requests)

router.post('/booknow',book_now)
router.post('/adminlogin',login)

router.post('/add_pilot',upload.single('photo'),add_pilot)
router.get('/getpilots',get_pilot)
router.delete('/deletepilot/:id',delete_pilot)
router.put('/updatepilot/:id', upload.single('photo'),update_pilot)

router.post('/assign-task',assign_task)
router.get('/gettasks',get_tasks)
router.delete('/deletetask/:task_id',delete_task)




module.exports = router;