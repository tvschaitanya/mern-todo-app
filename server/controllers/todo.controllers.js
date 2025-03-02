export async function getAllTodos(req, res, next){
    res.send('Get All Todos');
}

export async function getTodo(req, res, next){
    res.send('Get Single Todo');
}

export async function createTodo(req, res, next){
    res.send('Create Todo');
}

export async function updateTodo(req, res, next){
    res.send('Update Todo');
}

export async function deleteTodo(req, res, next){
    res.send('Delete Todo');
}