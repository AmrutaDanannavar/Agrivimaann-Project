const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')

const assign_task = function (req, res) {
    const {  service_id,  status, due_date ,pilot_id} = req.body;

    const insert_task_query = `
        INSERT INTO tasks (service_id,  status, due_date ,pilot_id) 
        VALUES (?, ?, ?, ?);
    `;

    connection.query(insert_task_query, [service_id,  status, due_date ,pilot_id], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        } else {
            res.set({
                "Content-Type": "application/json"
            });
            res.statusCode = 201;
            res.send({ "message": "Task assigned successfully" });
        }
    });
};

const get_tasks = function (req, res) {

    const get_tasks_query = "SELECT  tasks.task_id,   drone_spraying_services.service_name,   tasks.due_date,  tasks.status,  pilots.pilot_name FROM  tasks JOIN pilots ON tasks.pilot_id =pilots.id JOIN   drone_spraying_services ON tasks.service_id = drone_spraying_services.service_id; "
    connection.query(get_tasks_query, function (error, results) {
        if (error) {
            console.error('Error while querying the database:', error);
            res.statusCode = 400;
            res.send({ "message": "There is an error while querying the database" });
        } else {
            if (results.length) {
                const response_body = results;
                res.set({ "Content-Type": "application/json" });
                res.statusCode = 200;
                res.send(response_body);
            } else {

                res.send({ "message": "No tasks" });
            }
        }
    });
}

const delete_task = function (req, res) {
    const task_id = req.params.task_id ;

    const delete_query = "DELETE FROM tasks WHERE task_id  = ?";
    connection.query(delete_query, [task_id ], function (error, results) {
        if (error) {
            return error_handler("there is an error while deleting the tasks", req, res, 400);
        } else {
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.send({ "message": "tasks  not found" });
            } else {
                res.set({ "content-type": "application/json" });
                res.statusCode = 200;
                res.send({ "message": "tasks  deleted successfully" });
            }
        }
    });
}

const update_task_status = function (req, res) {
    const { status } = req.body; 
    const task_id = req.params.task_id;
    const update_status_query = ` UPDATE tasks  SET status = ? WHERE task_id = ? `;

    
    connection.query(update_status_query, [status, task_id], (error, results) => {
        if (error) {
            console.error('Error updating task status:', error);
            return res.status(500).json({ message: 'Error updating task status' });
        }
        res.json({ message: 'Task status updated successfully' });
    });
};




module.exports = {
    assign_task,
    get_tasks,
    delete_task,
   update_task_status
 
};