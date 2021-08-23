import axios from 'axios'
import './sass/main.scss';

const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container'),
    more: document.querySelector('#more'),
    repositories: document.querySelector('#repositories'),
    moreRepo: document.querySelector('#more-repo')
}

let currentPage = 1;

// const handlerSubmit = (e) => {
//     e.preventDefault()
//     refs.container.innerHTML = ''; // Очищает разметку после нового поиска

//     const value = refs.input.value;

//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
//         .then(result => renderCollection(result.data.drinks))
//         .catch(err => console.log(err))
    
//     refs.input.value = ''; // Очищаем инпут после нажатия на sabmit

//     // fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
//     //     .then(response => response.json())
//     //     // .then(data => console.log(data))
//     //     .then(data => renderCollection(data.drinks))
//     //     .catch(err => console.log(err))
// }

// function createItem({ strDrinkThumb, strDrink}) {
//     const article = `<article>
//       <img src="${strDrinkThumb}" alt="${strDrink}">
//       <p>${strDrink}</p>
//     </article>
// `
//     refs.container.insertAdjacentHTML('beforeend', article)
// }

// function renderCollection(arr) {
//     arr.map(el => createItem(el))
// }

// refs.form.addEventListener('submit', hendlerSubmit)


const gitHandlerSubmit = (e) => {
    e.preventDefault()
    const value = refs.input.value;

    axios.get(`https://api.github.com/search/users?q=${value}&client_id=92f090ebd3e94e524b74&client_secret=7009ecd438e8e00c052cd01477274807fcd3d2ac&page=${currentPage}`)
        .then(result => renderGitCollection(result.data.items))
        .then(() => currentPage++)
        .catch(err => console.log(err))
}

const gitHandlerSubmitRepositories = (e) => {
     e.preventDefault()
    const value = refs.input.value;

    axios.get(`https://api.github.com/search/repositories?q=${value}&client_id=92f090ebd3e94e524b74&client_secret=7009ecd438e8e00c052cd01477274807fcd3d2ac&page=${currentPage}`)
        .then(result => renderGitCollection(result.data.items))
        .then(() => currentPage++)
        .catch(err => console.log(err))
}

function createItem({ avatar_url, login, svn_url }) {
    const article = `<article>
      <img src="${avatar_url}" alt="${login}">
      <p>${login}</p>
      <h2>${svn_url}</h2>
    </article>
`
    refs.container.insertAdjacentHTML('beforeend', article)
}

function renderGitCollection(arr) {
    arr.map(el => createItem(el))
}

refs.form.addEventListener('submit', gitHandlerSubmit);
refs.more.addEventListener('click', gitHandlerSubmit,);
refs.repositories.addEventListener('click', gitHandlerSubmitRepositories);
refs.moreRepo.addEventListener('click', gitHandlerSubmitRepositories,);
