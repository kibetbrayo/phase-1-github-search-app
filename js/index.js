document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector("#github-form");
  const userList = document.querySelector('#user-list');
  const reposList = document.querySelector('#repos-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let search = e.target.search.value;
    handleSearch(search);
  });

  function handleSearch(search) {
    fetch('https://api.github.com/search/users?q=' + search)
      .then(res => res.json())
      .then(data => {
        userList.innerHTML = '';
        reposList.innerHTML = '';

        data.items.forEach(user => {
          let userCard = document.createElement('li');
          userCard.className = 'all-users';
          userCard.innerHTML = `
            <div class='content'>
              <h3> User: ${user.login}</h3>
              <p> URL: ${user.html_url}</p>
              <div class ='repos'>
                <button class='repo-button' style='margin-bottom: 25px'>
                  Repositories
                </button>
              </div>
              <img src=${user.avatar_url} />
            </div>`;

          userList.appendChild(userCard);

          const repoButton = userCard.querySelector('.repo-button');
          repoButton.addEventListener('click', () => {
            fetch(user.repos_url)
              .then(res => res.json())
              .then(data => {
                data.forEach(repo => {
                  let repoCard = document.createElement('li');
                  repoCard.innerHTML = `
                    <h4> ${repo.name} </h4>
                    <p> ${repo.html_url}</p>
                  `;
                  reposList.appendChild(repoCard);
                });
              });
          });
        });
      });
  }
});
