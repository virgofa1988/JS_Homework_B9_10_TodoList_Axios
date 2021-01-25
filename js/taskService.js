function taskService() {
    // Load Task List From Server
    this.getTaskList = function () {
        return axios({
            url: "https://6006de013698a80017de2207.mockapi.io/api/todoList",
            method: "GET",
        });
    };

    //Add Task to Server
    this.addTasktoServer = function (task) {
        return axios({
            url: "https://6006de013698a80017de2207.mockapi.io/api/todoList",
            method: "POST",
            data: task,
        });
    };

    //Delete Task
    this.deleteTaskFromServer = function (id) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/todoList/` + id,
            method: "DELETE",
        });
    }
    //Update Task Or Change Status
    this.updateTask = function (id, task) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/todoList/` + id,
            method: "PUT",
            data: task,
        });
    }

    //get Task By ID

    this.getTaskbyId = function (id) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/todoList/` + id,
            method: "GET",
        });
    }
}

