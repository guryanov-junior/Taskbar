function showTaskBar() {
  let date = new Date();

  function timer() {
    let date = new Date();
    let clock = document.querySelector('.taskbar__info-time');
    let time =
      getZero(date.getHours()) +
      ':' +
      getZero(date.getMinutes()) +
      ':' +
      getZero(date.getSeconds());
    clock.innerHTML = time;
  }

  function getInfo() {
    let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
    let day = date.getDay();
    let today = document.querySelector('.taskbar__info-day');
    let months = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ];
    let month = months[date.getMonth()];
    today.innerHTML =
      days[day] + ', ' + date.getDate() + ' ' + monthRename(month);
  }
  getInfo();

  function go() {
    window.setInterval(timer, 500);
  }

  function monthRename(month) {
    if (/т$/.test(month)) {
      month = month.replace(/т$/g, 'та');
    } else {
      month = month.replace(/ь$/g, 'я');
    }
    return month;
  }

  function getZero(num) {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setYear() {
    let year = document.querySelector('.taskbar__info-year');
    year.innerHTML = date.getFullYear() + ' года';
  }
  setYear();

  let taskArea = document.querySelector('.taskbar__tasks');
  let btn = document.querySelector('.addtask');
  let lastId = 0;
  let tasks = [];

  function showTask(task) {
    let p = document.createElement('p');
    p.innerHTML = task.title;
    taskArea.appendChild(p);
    p.addEventListener('click', function (e) {
      const i = tasks.findIndex((_task) => _task.id === task.id);
      if (i === -1) return;
      taskArea.removeChild(p);
      tasks.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  btn.addEventListener('click', function (e) {
    let enter = document.querySelector('.enter-task');
    enter.classList.remove('none');
    enter.focus();
    enter.addEventListener('change', function (e) {
      let title = enter.value;
      enter.value = '';
      enter.classList.add('none');
      if (!title) return;
      lastId++;
      const task = { id: lastId, title };
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      showTask(task);
    });
  });

  window.onload = () => {
    go();
    lastId = localStorage.getItem('lastId') || 0;
    let _tasks = localStorage.getItem('tasks');
    if (!_tasks) return;
    tasks = JSON.parse(_tasks);
    tasks.forEach(showTask);
  };

  let list = document.getElementsByTagName('p');

  function deleteTasks() {
    let erase = document.querySelector('.deletetask');
    erase.addEventListener('click', function (e) {
      localStorage.clear();
      for (const i of list) {
        i.classList.add('none');
      }
    });
  }
  deleteTasks();
}
showTaskBar();
