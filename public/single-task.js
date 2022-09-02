const formDOM = document.getElementById('form')
const updatedNameDOM = document.getElementById('update-name')
const updateCompletedDOM = document.getElementById('completed')
const formAlertDOM = document.getElementById('form-alert')
const queryParams = window.location.search //this will return ?id={123... for ex}
const id = new URLSearchParams(queryParams).get('id') //this will return the id value


const setTheParamsOnLoad = async () =>{
    try {
        const res = await axios.get(`/api/v1/tasks/${id}`)
        const {selectedTask} = res.data
        console.log(selectedTask);

        if(selectedTask.completed){
            updateCompletedDOM.checked = true
        }
        
        updatedNameDOM.value = selectedTask.name

    } catch (error) {
        formAlertDOM.classList.add('text-failed')
        formAlertDOM.innerHTML = "a problem has occured, please try later ..."

        setTimeout(() => {
            formAlertDOM.classList.remove('text-failed')
            formAlertDOM.innerHTML = ""
          }, 3000)
    }
}

setTheParamsOnLoad()

formDOM.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const updatedName = updatedNameDOM.value
    const updatedState = updateCompletedDOM.checked

    try {
        await axios.patch(`/api/v1/tasks/${id}`, {name: updatedName, completed: updatedState})

        updatedNameDOM.value = ''
        updateCompletedDOM.checked = false

        formAlertDOM.classList.add('text-success')
        formAlertDOM.innerHTML = "task updated successfully"

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




