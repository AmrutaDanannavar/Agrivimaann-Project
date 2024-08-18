const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')

const assign_task = function (req, res) {
    const { pilot_id, task_name, description, status, due_date } = req.body;

    const insert_task_query = `
        INSERT INTO tasks (pilot_id, task_name, description, status, due_date) 
        VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(insert_task_query, [pilot_id, task_name, description, status, due_date], function (err, results) {
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

    const get_tasks_query = "SELECT tasks.task_id, tasks.task_name, tasks.due_date, tasks.status, pilots.pilot_name FROM tasks JOIN pilots ON tasks.pilot_id = pilots.id;  "
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

// Update pilot details


module.exports = {
    assign_task,
    get_tasks,
    delete_task
 
};