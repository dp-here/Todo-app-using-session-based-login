const express=require('express');
const router=express.Router();
const todosController=require('../controller/todoController');

router.get('/' , todosController.fetchAll);
router.delete('/:id' , todosController.deleteTodo);
router.post('/:id',todosController.updateTodo);
router.post('/',todosController.addTodo);

module.exports=router;