function getEle(id) {
    return document.getElementById(id);
}

var taskService = new taskService();
var validation = new validation();

// Lấy danh sách Task từ server // Đây là hàm bất đồng bộ, vì trả về kết quả là mảng danh sách chậm vài giấy. 
function getTaskListFromServer(callback) {
    taskService.getTaskList()
        .then(function (result) {
            renderList(result.data);
            callback(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
}
//render task list từ server
getTaskListFromServer();

// Khi click vào nó mới gửi tham số là 1 hàm addtask qua hàm gettasklist, và kích hoạt cái hàm addTask bên trong .then của hàm lấy danh sách từ server--> lúc đó mới có mảng để truyền vào addTASK để check trùng task
getEle('addItem').addEventListener("click", function () {
    getTaskListFromServer(addTasktoServer);
})

//Add Task to User // Button onclick
function addTasktoServer(arrayServer) {
    var _taskName = getEle('newTask').value;
    var _taskStatus = "todo";
    var newTask = new task(_taskName, _taskStatus);

    var isValid = true;
    isValid &= validation.checkEmpty(newTask.taskName, "notiInput", 0) && validation.checkTaskExisted(newTask.taskName, "notiInput", 0, arrayServer);

    if (isValid) {
        taskService.addTasktoServer(newTask)
            .then(function (result) {
                console.log(result.data);
                alert("Task is added successully");
                getTaskListFromServer();
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

// Create task in HTML
function createTask(newTask) {
    return `
        <li>
                   <span>${newTask.taskName}</span>
                   <div class="buttons">
                    <button class="remove" onclick="deleteToDo(${newTask.id})"><i class="fa fa-trash-alt"></i></button>
                    <button class="complete" onclick="changeStatus(${newTask.id})"><i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i></button>
                   </div>
                                     
                   </li>
    `;
}

function renderList(arr) {
    var todo = "";
    var completed = "";

    for (i = 0; i < arr.length; i++) {
        if (arr[i].taskStatus === "completed") {
            completed += createTask(arr[i]);
        } else {
            todo += createTask(arr[i]);
        }
    }
    getEle('completed').innerHTML = completed;
    getEle('todo').innerHTML = todo;

}

// Delete Task 
function deleteToDo(id) {
    taskService.deleteTaskFromServer(id)
        .then(function (result) {
            renderList(result.data);
            getTaskListFromServer();
        })
        .catch(function (err) {
            console.log(err);
        })
}

// Change Status
function changeStatus(id) {
    taskService.getTaskbyId(id)
        .then(function (result) {
            if (result.data.taskStatus === "completed") {
                result.data.taskStatus = "todo";
            } else {
                result.data.taskStatus = "completed";
            }
            updateTask(id, result.data);

        })
        .catch(function (err) {
            console.log(err);
        })

}
//Update Task to Server
function updateTask(id, task) {
    taskService.updateTask(id, task)
        .then(function (result) {
            // console.log(result);
            getTaskListFromServer(); // Reload lai list sau khi update Status// Đặt ở đây để tránh bị bất đồng bộ do đợi hàm updateTask chạy ra kết quả từ hàm changeStatus(id) ở trên
        })
        .catch(function (err) {
            console.log(err);
        })

}   