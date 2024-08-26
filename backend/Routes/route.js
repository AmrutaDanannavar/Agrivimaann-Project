const express = require('express')
const multer = require('multer');
const path = require('path');
const router = express.Router()
const {add_request,get_requests} = require('../Controllers/request_controller');
const book_now = require('../Controllers/book_now_controller');
const login = require('../Controllers/login_controller');
const { add_pilot, get_pilot, delete_pilot, update_pilot } = require('../Controllers/add_pilot');
const {  assign_task, get_tasks, delete_task,  update_task_status } = require('../Controllers/task_controller');
const { get_drone_services, add_service, delete_service, update_service } = require('../Controllers/droneservices_controller');
const { get_drone_parts, add_drone_part } = require('../Controllers/drone_parts_controller');
const { order_drone_parts, get_orders } = require('../Controllers/order_controller');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


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
router.put('/update-task-status/:task_id',update_task_status)

router.post('/add-services',add_service)
router.get('/getservices',get_drone_services)
router.delete('/deleteservice/:service_id',delete_service)
router.put('/updateservice/:service_id',update_service)


router.post('/addpart', upload.single('image'),add_drone_part)
router.get('/getparts',get_drone_parts)

router.post('/orders',order_drone_parts)
router.get('/getorders',get_orders)


module.exports = router;