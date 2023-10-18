
import { getRepositories } from "./services/repositories.js";
import { getUser } from "./services/user.js";
import { screen } from "./objects/screen.js";
import { user } from "./objects/user.js";
import { getEvents } from "./services/events.js";

function validateInput(userName){
    if(userName.length === 0){
        alert('preencha o campo com o nome do usuário do Github');
        return true;
    }
}

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateInput(userName)) return;
    getUserData(userName);
})
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterButton = key === 13;
    if (isEnterButton) {
       if( validateInput(userName)) return;
        getUserData(userName);
    }
})




async function getUserData(userName) {

    const userResponse = await getUser(userName);
    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);
    console.log(eventsResponse)
    console.log(repositoriesResponse)
    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return

    }
   
    user.setInfo(userResponse)
    user.setEvents(eventsResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
    // getUser(userName).then(userData => {
    //     // console.log(userData)
    //     let userInfo = 
    //     document.querySelector('.profile-data').innerHTML = userInfo;
    //     getUserRepositories(userName);
    // })
 
}

