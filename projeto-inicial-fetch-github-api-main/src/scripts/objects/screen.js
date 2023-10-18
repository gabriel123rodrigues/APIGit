const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                 <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                 <div class="data">
                                 <h1>${user.name ?? `Não possui nome cadastrado`}</h1>
                                 <p>${user.bio ?? `Não possui bio cadastrada`}</p><br>
                                 <h5>Followers<h5>
                                 <p>${user.followers ?? `Não possui seguidores  `}</p><br>
                                 <h5>Following<h5>
                                 <p>${user.following ?? `O usuário não segue ninguém`}</p>
                                 </div>
                                 </div>`






        //repositótios 

        let repositoriesItens = "";
        console.log(repositoriesItens)
        user.repositories.forEach(repo =>
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} 
                                    <br>
                                    <br>
                                   <span class="icon"> <i class="fa-solid fa-code-fork"></i>${repo.forks}</span>
                                   <span class="icon"> <i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                                   <span class="icon"> <i class="fa-solid fa-eye"></i> ${repo.watchers}</span>
                                   <span class="icon"> <i class="fa-solid fa-laptop-code"></i> ${repo.language}</span>
                                    </a>
                                  </li>`
        )
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                             <h2>Repositorios</h2>
                                             <ul>${repositoriesItens}</ul>
                                           </div>`
        }
        //eventos

        let eventsItens = ""
        if (user.events.length > 0) {

            user.events.forEach(listEvent => {



                if (listEvent.payload) {
                    if (listEvent.payload.commits) {
                        const commits = listEvent.payload.commits
                        const messageList = commits.map(commit => commit.message)
                        eventsItens += `<div class="events-name"><strong>${listEvent.repo.name}</strong>: ${messageList}</div>`

                    }

                }
            })


            this.userProfile.innerHTML += `<div class="events-div section">
                                                                    <h2>Eventos</h2>
                                                                    <ul class="events"> ${eventsItens}</ul>
                                                                  </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado<h3>"
    }
}
export { screen }