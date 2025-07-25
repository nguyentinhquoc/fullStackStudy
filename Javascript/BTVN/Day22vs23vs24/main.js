const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const addBtn = $(".add-btn");
const modalClose = $(".modal-close");
const cancelBtn = $("#addTaskModal .btn-secondary");
const addTaskModal = $("#addTaskModal");
const inputsAddTaskModal = $$(".todo-app-form input");
const formAddTask = $(".todo-app-form");
const btnAddTask = $("#addTaskModal .btn-primary");
const inputSearch = $('input[class="search-input"]')
inputSearch.addEventListener('input', (e) => {
  const inputValue = e.target.value.toUpperCase()
  if (inputValue){
    renderData(true)
  }else{
    renderData(false)
  }
  $$('.task-card').forEach(element => {
    const textElement = element.querySelector('.task-title').innerText.toUpperCase()
    if (!textElement.includes(inputValue)) element.hidden = true
    else element.hidden = false
  });
})
let todoTasks = localStorage.getItem("listTasks")
  ? JSON.parse(localStorage.getItem("listTasks"))
  : [];
// click thêm task
addBtn.addEventListener("click", () => {
  //  1: Xử lý mở/đóng modal
  inputsAddTaskModal.forEach((element) => {
    element.value = null;
  });
  $("#taskDescription").value = null;
  delete addTaskModal.dataset.index;
  toggleModal();
});
//click ẩn modal
cancelBtn.onclick = () => {
  toggleModal();
};
modalClose.onclick = () => {
  toggleModal();
};
// hàm ẩn hiện
function toggleModal() {
  addTaskModal.classList.toggle("show");
  if (addTaskModal.classList.contains("show")) {
    // 2: Tự động focus input
    setTimeout(() => {
      inputsAddTaskModal[0].focus();
    }, 50);
    inputsAddTaskModal.forEach((element) => {
      element.classList.remove("input-error");
      element.style.borderColor = "#d1d5db";
    });
  }
}
// 3: Xử lý form submission
formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
});
// 4:
function addTask() {
  if (!validateData()) return;
  const newTask = {
    title: $("#taskTitle").value,
    description: $("#taskDescription").value,
    category: $("#taskCategory").value,
    priority: $("#taskPriority").value,
    startTime: $("#startTime").value,
    endTime: $("#endTime").value,
    DueDate: $("#taskDate").value,
    cardColor: $("#taskColor").value,
    completed: false,
  };
  todoTasks.unshift(newTask);
  localStorage.setItem("listTasks", JSON.stringify(todoTasks));
  toast({
    title: 'Thành công!',
    message: 'Thêm task thành công.',
    type: 'success',
    duration: 2000
  })
  renderData(false);
  toggleModal();
}
function editTask() {
  if (!validateData()) return;
  const newTask = {
    title: $("#taskTitle").value,
    description: $("#taskDescription").value,
    category: $("#taskCategory").value,
    priority: $("#taskPriority").value,
    startTime: $("#startTime").value,
    endTime: $("#endTime").value,
    DueDate: $("#taskDate").value,
    cardColor: $("#taskColor").value,
    completed: false,
  };
  const index = addTaskModal.dataset.index;
  todoTasks[index] = { ...todoTasks[index], ...newTask };
  localStorage.setItem("listTasks", JSON.stringify(todoTasks));
  toast({
    title: 'Thành công!',
    message: 'Sửa task thành công.',
    type: 'success',
    duration: 2000
  })
  renderData(false);
  toggleModal();
}
function deleteTask(index) {
  todoTasks.splice(index, 1);
  localStorage.setItem("listTasks", JSON.stringify(todoTasks));
  toast({
    title: 'Thành công!',
    message: 'Xóa task thành công.',
    type: 'success',
    duration: 2000
  })
  renderData(false);
}
renderData(false);
// Trống XXS
function blockXss(stringHtml) {
  let element = document.createElement("div");
  element.innerText = stringHtml;
  return element.innerHTML;
}
//update Data
function updateData(index, obj) {
  todoTasks[index] = { ...todoTasks[index], ...obj };
  localStorage.setItem("listTasks", JSON.stringify(todoTasks));
  renderData(false);
}

// render dữ liệu ra màn hì
// nh
const btnTad = $(".tab-list").querySelectorAll(".tab-button");
btnTad.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    $(".tab-button.active").classList.remove("active");
    e.target.classList.add("active");
    renderData(false)
    // if (e.target.classList.contains("action")) {
    //   $$('.task-card').forEach((element) => {
    //     if (element.classList.contains('completed')) {
    //       element.hidden = true
    //     }
    //     if (!element.classList.contains('completed')) {
    //       element.hidden = false
    //     }
    //   })
    // } else {
    //   $$('.task-card').forEach((element) => {
    //     if (element.classList.contains('completed')) {
    //       element.hidden = false
    //     }
    //     if (!element.classList.contains('completed')) {
    //       element.hidden = true
    //     }
    //   })
    // }
  });
});
function renderData(renderALl) {
  let stringHtmlRender = "";
  todoTasks.forEach((element, index) => {
    let isCompleted = false
    if ($('.tab-button.action').classList.contains('active')) {
      isCompleted = false
    }
    if ($('.tab-button.completed').classList.contains('active')) {
      isCompleted = true
    }
    if (isCompleted === element.completed || renderALl) {
      stringHtmlRender += `
    <div class="task-card ${blockXss(element.cardColor)} ${element.completed ? "completed" : ""
        }"  data-index="${index}" >
        <div class="task-header">
          <h3 class="task-title">${blockXss(element.title)}</h3>
          <button class="task-menu">
            <i class="fa-solid fa-ellipsis fa-icon"></i>
            <div class="dropdown-menu">
              <div class="dropdown-item edit">
                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                Edit
              </div>
              <div class="dropdown-item complete">
                <i class="fa-solid fa-check fa-icon"></i>
                Mark as Active
              </div>
              <div class="dropdown-item delete">
                <i class="fa-solid fa-trash fa-icon"></i>
                Delete
              </div>
            </div>
          </button>
        </div>
        <p class="task-description">${blockXss(element.description)}</p>
        <div class="task-time">${blockXss(element.startTime)} - ${blockXss(
          element.endTime
        )}</div>
      </div>
    `;
    }
  });
  $(".task-grid").innerHTML = stringHtmlRender;
}
// click nút complete
$(".task-grid").addEventListener("click", (e) => {
  if (e.target.closest(".complete")) {
    const index = e.target.closest(".task-card").dataset.index;
    e.stopPropagation();
    updateData(index, { completed: true });
    toast({
      title: 'Thành công!',
      message: 'Xác nhận task thành công.',
      type: 'success',
      duration: 2000
    })
  } else if (e.target.closest(".edit.dropdown-item")) {
    const index = e.target.closest(".task-card").dataset.index;
    // Mở model setData
    toggleModal();
    addTaskModal.querySelector(".modal-title").innerText = "Edit Task";
    btnAddTask.innerText = "Edit Task";
    addTaskModal.dataset.index = index;
    console.log(todoTasks, index);
    $("#taskTitle").value = todoTasks[index].title;
    $("#taskDescription").value = todoTasks[index].description;
    $("#taskCategory").value = todoTasks[index].category;
    $("#taskPriority").value = todoTasks[index].priority;
    $("#startTime").value = todoTasks[index].startTime;
    $("#endTime").value = todoTasks[index].endTime;
    $("#taskDate").value = todoTasks[index].DueDate;
    $("#taskColor").value = todoTasks[index].cardColor;
  } else if (e.target.closest(".delete.dropdown-item")) {
    const index = e.target.closest(".task-card").dataset.index;
    if (confirm("Bạn có chắc muốn xóa task này ?")) deleteTask(index);
  }
});
// Kiểm tra dữ liệu
function validateData() {
  let isCheckValidate = true;
  inputsAddTaskModal.forEach((element) => {
    if (!element.value) {
      element.style.borderColor = "red";
      element.classList.add("input-error");
      isCheckValidate = false;
    } else {
      isCheckValidate = true;
    }
    element.addEventListener("blur", function () {
      if (!this.value) {
        this.style.borderColor = "red";
        this.classList.add("input-error");
        isCheckValidate = false;
      }
    });
    element.addEventListener("input", function () {
      if (this.value) {
        this.style.borderColor = "#d1d5db";
        this.classList.remove("input-error");
      } else {
        this.style.borderColor = "red";
        this.classList.add("input-error");
        isCheckValidate = false;
      }
    });
  });
  return isCheckValidate;
}
// Cập nhập danh sách
btnAddTask.addEventListener("click", (e) => {
  if (!addTaskModal.dataset.index) {
    addTask();
  } else {
    editTask();
  }
});
