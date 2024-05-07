const db = require("../util/database");

exports.fetchAll = async (req, res) => {
    try {
      const userEmail = req.user_id;
      
      const [rows] = await db.execute(`SELECT * FROM todo_list WHERE email = '${userEmail}' AND completed_at IS NULL`);
      res.status(200).json({ todos: rows });
    } catch (error) {
      console.error("Error fetching todo list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
 
exports.addTodo = async (req, res) => {
    try {
        const userEmail = req.user_id;
        const { title, description, priority, deadline } = req.body;
        const [result] = await db.execute(
            "INSERT INTO todo_list (title, description, priority, deadline, email) VALUES (?, ?, ?, ?, ?)",
            [title, description, priority, deadline, userEmail]
        );

        res.status(201).json({ message: "Todo added successfully!" });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateTodo = async (req,res) => {
    try {
        const { title, description, priority, deadline } = req.body;
        let id = req.params.id;
        let query = "UPDATE todo_list SET ";
        let values = [];

        if (title !== undefined) {
            query += "title = ?, ";
            values.push(title);
        }
        if (description !== undefined) {
            query += "description = ?, ";
            values.push(description);
        }
        if (priority !== undefined) {
            query += "priority = ?, ";
            values.push(priority);
        }
        if (deadline !== undefined) {
            query += "deadline = ?, ";
            values.push(deadline);
        }
        query = query.slice(0, -2);

        query += " WHERE id = ?";
        values.push(id);
        const [result] = await db.execute(query, values);
        console.log(result);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Todo updated successfully!" });
        } else {
            res.status(404).json({ message: "Todo not found or no changes made." });
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
      const userEmail = req.user_id;
      const id = req.params.id;
      const query = `UPDATE todo_list SET completed_at = NOW() WHERE id = ? AND email = ?`;
  
      const [result] = await db.execute(query, [id, userEmail]);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Todo deleted successfully!" });
      } else {
        res.status(404).json({ message: "Todo not found." });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

