let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let taskDiv = document.querySelector(".tasks")

// Empty Array To Store The Tasks
let arrayOfTasks = []

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {

    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage()

// Add Task
submit.onclick = function () {

    if (input !== "") {

        // Add Task To Array Of Tasks
        addTasktoArr(input.value)

        // Empty Input Field
        input.value = ""
    }
}

// Click On Task Element
taskDiv.addEventListener("click", (e) => {

    // Delete Button
    if (e.target.classList.contains("del")) {

        // Remove Task From Local Storage
        deleteTask(e.target.parentElement.getAttribute("data-id"))

        // Remove Task From Local Storage
        e.target.parentElement.remove()
    }

    // Task Element
    if (e.target.classList.contains("task")) {

        // Toggle Completed For The Task
        toggleStatusTask(e.target.getAttribute("data-id"))

        // Toggle Done Class
        e.target.classList.toggle("done")

    }

})

function addTasktoArr(content) {

    // Task Data
    const task = {

        id: Date.now(),
        title: content,
        completed: false,
    }

    // Push Task To Array Of Tasks
    arrayOfTasks.push(task)

    // Add Tasks To Page
    addElementsToPage(arrayOfTasks)

    // Add Tasks To Local Storage
    addDataToLocalStorage(arrayOfTasks)
}

function addElementsToPage(tasks) {

    // Empty Tasks Div
    taskDiv.innerHTML = ""

    // Looping On Array Of Tasks
    tasks.forEach((task) => {

        // Create Main Div
        let div = document.createElement("div")
        div.className = "task"

        // Check If Task is Done
        if (task.completed) {

            div.className = "task done"
        }

        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        // Create Delete Button
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        // Append Button To Main Div
        div.appendChild(span)

        // Add Task Div To Tasks Container
        taskDiv.appendChild(div)
    });

}

function addDataToLocalStorage(data) {

    window.localStorage.setItem("tasks", JSON.stringify(data))
}

function getDataFromLocalStorage() {

    let data = window.localStorage.getItem("tasks")

    if (data) {

        let tasks = JSON.parse(data)
        addElementsToPage(tasks)
    }
}

function deleteTask(taskId) {

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorage(arrayOfTasks)
}

function toggleStatusTask(taskId) {

    for (let i = 0; i < arrayOfTasks.length; i++) {

        if (arrayOfTasks[i].id == taskId) {

            arrayOfTasks[i].completed = false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = true)
        }
    }

    addDataToLocalStorage(arrayOfTasks)
}