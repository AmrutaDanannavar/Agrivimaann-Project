const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')

const order_drone_parts = function (req, res) {
    const {  part_id, quantity,price, customer_name, customer_address, contact_number,order_date,part_name,shipping_date,status} = req.body;

    const insert_Order_query = `
        INSERT INTO orders(part_id, quantity,price, customer_name, customer_address, contact_number,order_date,part_name,shipping_date,status) 
        VALUES (?, ?, ?, ?,?,?,?,?,?,?);
    `;

    connection.query(insert_Order_query, [part_id, quantity,price, customer_name, customer_address, contact_number,order_date,part_name,shipping_date,status], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        } else {
            res.set({
                "Content-Type": "application/json"
            });
            res.statusCode = 201;
            res.send({ "message": "Order Placed Successfully" });
        }
    });
};

const get_orders = function (req, res) {
    const get_orders_query = "SELECT * FROM orders ;  ";
    connection.query(get_orders_query, function (error, results) {
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

                res.send({ "message": "No orders" });
            }
        }
    });
}

const update_order_status = function (req, res) {
    const { status } = req.body; 
    const order_id = req.params.order_id;
    const update_status_query = ` UPDATE orders SET status = ? WHERE order_id = ? `;
    
    connection.query(update_status_query, [status, order_id], (error, results) => {
        if (error) {
            console.error('Error updating order status:', error);
            return res.status(500).json({ message: 'Error updating order status' });
        }
        res.json({ message: 'Order status updated successfully' });
    });
};



module.exports = {
    order_drone_parts,
    get_orders,
    update_order_status
 
};