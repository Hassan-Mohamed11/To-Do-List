let btn = document.getElementById("add-btn")
let input = document.getElementById("task-input")
let taskBox = document.getElementById("created-task-box")
let date = document.getElementById("date")
let error = document.getElementById("error-msg")

let saved = localStorage.getItem("tasks")
if (saved) {
    taskBox.innerHTML = saved
}

let deleteButtons = taskBox.querySelectorAll(".delete-btn")
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove()
            localStorage.setItem("tasks", taskBox.innerHTML)
        })
    })

let checkboxes = taskBox.querySelectorAll('input[type="checkbox"]')
checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
            if (cb.checked) {
                cb.setAttribute("checked", "")
            } else {
                cb.removeAttribute("checked")
            }
            localStorage.setItem("tasks", taskBox.innerHTML)
        })

    if (cb.hasAttribute("checked")) {
        cb.checked = true
    }
})

input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        btn.click()
    }
})

btn.addEventListener("click", () => {
    location.reload()

    if (input.value.trim() === "") {
        error.innerHTML = "Please enter a task"
        return
    } else {
        error.innerHTML = ""
    }
    
    let content = input.value.trim()

    let today = new Date()

    let day = today.getDate() 
    let month = today.getMonth() + 1
    let year = today.getFullYear() 

    let taskDate = `${year}-${month}-${day}`

    let contentDiv = document.createElement("div")
    let div = document.createElement("div")
    let h1 = document.createElement("h1")
    let span = document.createElement("span")
    let checkBox = document.createElement("input")
    let deleteBtn = document.createElement("button")
    deleteBtn.className = "delete-btn"
    div.appendChild(deleteBtn)

    contentDiv.classList.add("content-div")

    span.textContent = taskDate
    div.classList.add("task")
    checkBox.type = "checkbox"
    h1.textContent = content

    contentDiv.appendChild(deleteBtn)
    contentDiv.appendChild(checkBox)
    div.appendChild(h1)
    div.appendChild(span)
    div.appendChild(contentDiv)
    taskBox.appendChild(div)

    localStorage.setItem("tasks", taskBox.innerHTML)

    input.value = ""
})

