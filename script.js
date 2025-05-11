document.addEventListener('DOMContentLoaded',()=>{
    const addTaskBtn = document.querySelector('.add-task-btn');
    const inputTask = document.querySelector('#input-task');
    const todoList = document.querySelector('ul');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        renderTask(task)
    });

    addTaskBtn.addEventListener('click', (e)=>{

        const task = inputTask.value;
        if(task === ''){
            return;
        }

        const newTask = {
            id: Date.now(),
            text: task,
            isCompleted: false
        }

        tasks.push(newTask);
        saveTask()
        renderTask(newTask)
        inputTask.value = ""
        console.log(tasks)
    })

    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        if(task.isCompleted) li.classList.add('completed')
        li.innerHTML = `<p>${task.text}</p>
                        <button class = "delete-btn">Delete</button>`;

        li.addEventListener('click',(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle('completed');
            saveTask();
        })

        li.querySelector('.delete-btn').addEventListener('click',(e)=>{
            e.stopPropagation();
            tasks = tasks.filter((t)=>{
                return t.id !== task.id
            })
            li.remove()
            saveTask()
        })

        todoList.appendChild(li);
    }
})