$(document).ready(function () {
  loadTasks();

  $("#addTaskBtn").on("click", function () {
    if (validateInput()) {
      let taskText = $("#taskInput").val();
      addTask(taskText);
      saveTasks();
      clearInput();
    }
  });

  $("#cancel").on("click", function () {
    clearInput();
  });

  $(document).on("click", "li", function () {
    $(this).toggleClass("completed");
    saveTasks();
  });

  $(document).on("click", "span", function (e) {
    e.stopPropagation();
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
        saveTasks();
      });
  });

  function addTask(text) {
    $("#taskList").append("<li>" + text + "<span>&times;</span></li>");
  }

  function loadTasks() {
    let tasks = localStorage.getItem("tasks");

    if (tasks) {
      $("#taskList").html(tasks);
    }
  }

  function saveTasks() {
    let tasks = $("#taskList").html();
    localStorage.setItem("tasks", tasks);
  }

  function validateInput() {
    const taskText = $("#taskInput").val().trim();
    if (taskText === "") {
      alert("Please fill in the field to add a task!");
      return false;
    }
    return true;
  }

  function clearInput() {
    $("#taskInput").val("");
  }
});
