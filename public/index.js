const inputTaskDOM = document.getElementById('input-task')
const tasksListDOM = document.getElementById('list-of-tasks')
const deleteBtnDOM = document.getElementById('remove-btn')
const formDOM = document.getElementById('form')
const formAlertDOM = document.getElementById('form-alert')


// fetching data
const fetchTasks = async () =>{
    try {        
        const { data : {tasks}} = await axios.get('/api/v1/tasks')

        if(tasks.length < 1){
            tasksListDOM.innerHTML = '<h5>Have a rest buddy, there are no tasks scheduled ...</h5>'

            return
        }

        const tasksList = tasks.map( task => {
            return( `<div class="single-task ${task.completed && "completed-task"}">
            <div class="single-task-left">
                <i class="${task.completed && "fa-solid fa-check"}"></i>
                <p>${task.name}</p>
            </div>
            <div class="icons">
                <a href="single-task.html?id=${task._id}">
                    <i class="fa-solid fa-pen-to-square" id="edit-btn"></i>
                </a>
                <i class="fa-solid fa-trash" id='remove-btn' data-id=${task._id}></i>
            </div>
        </div>`)
        }).join('')

        tasksListDOM.innerHTML = tasksList

    } catch (error) {
        tasksListDOM.innerHTML = '<h5>An error has occured, please try later ...</h5>'
    }

}

fetchTasks()


// deleting an item
tasksListDOM.addEventListener('click', async (e) =>{
    const el = e.target

    if(el.classList.contains('fa-trash')){
        const id = el.dataset.id

        try {
            await axios.delete(`/api/v1/tasks/${id}`)

            fetchTasks()
            
        } catch (error) {
            console.log(error);
        }

        
    }
})


// when submitting the form
formDOM.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const taskName = inputTaskDOM.value

    try {
        await axios.post('/api/v1/tasks', { name: taskName})
        
        fetchTasks()
        inputTaskDOM.value = ''
        formAlertDOM.classList.add('text-success')
        formAlertDOM.innerHTML = "task added successfully"

        setTimeout(() => {
            formAlertDOM.classList.remove('text-success')
            formAlertDOM.innerHTML = ""
          }, 3000)
        
    } catch (error) {
        console.log(error);
        formAlertDOM.classList.add('text-failed')
        formAlertDOM.innerHTML = "a problem has occured, please try later ..."

        setTimeout(() => {
            formAlertDOM.classList.remove('text-failed')
            formAlertDOM.innerHTML = ""
          }, 3000)
    }
})