const usersListContainer = document.querySelector('.users-container');
const userInfoContainer = document.querySelector('.user-info-container');
const btnAddUser = document.querySelector('.btn-add-user');
const usersCounter = document.querySelector('.counter')
 
const xhr = new XMLHttpRequest;
xhr.open('get', 'https://jsonplaceholder.typicode.com/users')
xhr.send();
 
let users = [];
 
xhr.addEventListener('load', () => {
    users = getUsers(xhr.responseText);
    renderUsers(users);
});
 
usersListContainer.addEventListener('click', e => {

    if(e.target.tagName === 'BUTTON'){
      const user = users.filter((user) => {
          return user.name == e.target.textContent;
    })

      activeItem(e.target);

      renderUserInfoBlock(user[0]);
    }    
})

usersListContainer.addEventListener('DOMNodeInserted', e => {
  const count = e.target.children.length;
  usersCounter.textContent = count;
})

btnAddUser.addEventListener('click', ()=>{
  renderUserAddBlock();
})
 
//Functions
function getUsers(request) {
    const users = JSON.parse(request)
    return users;
}
 
function renderUsers(users) {
    const fragment = document.createDocumentFragment();
    const list = document.createElement('div');
    list.classList.add('list-group','list-group-flush')
    users.forEach(user => {
        const listItem = document.createElement('button');
        listItem.classList.add('list-group-item', 'list-group-item-action')
        listItem.textContent = user.name;
        list.appendChild(listItem);
    });
    fragment.appendChild(list);
    usersListContainer.appendChild(fragment);
}
 
function renderUserInfoBlock(user) {
    clearUserInfoContainer();


    const card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML('afterbegin', `
      <div class="card-header h5">
        ${user.name}
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Nickname: </b>${user.nickname}</li>
          <li class="list-group-item"><b>Email: </b>${user.email}</li>
          <li class="list-group-item"><b>Website: </b>${user.website}</li>
          <li class="list-group-item"><b>City: </b>${user.city}</li>
        </ul>
      </div>

      <div class="card-footer">
        Phone: ${user.phone}
      </div>
    `);
    userInfoContainer.appendChild(card);
}

function renderUserAddBlock() {
  clearUserInfoContainer();
  const card = document.createElement('div');
  card.classList.add('card')
  card.insertAdjacentHTML('afterbegin', `

  <form class="">

    <div class="card-header h5">
      New User
    </div>

    <div class="card-body">
      
      <div class="col-12">
        <label for="validationDefault01" class="form-label">Name</label>
        <input type="text" class="form-control" id="validationDefault01" value="Mark" required>
      </div>

      <div class="col-12">
        <label for="validationDefault02" class="form-label">Nickname</label>
        <input type="text" class="form-control" id="validationDefault02" value="Otto" required>
      </div>

      <div class="col-12">
        <label for="validationDefault03" class="form-label">Email</label>
        <input type="email" class="form-control" id="validationDefault03" value="example@email.com" required>
      </div>

      <div class="col-12">
        <label for="validationDefault04" class="form-label">Website</label>
        <input type="text" class="form-control" id="validationDefault04" value="email.com" required>
      </div>
      
      <div class="col-12">
        <label for="validationDefault05" class="form-label">City</label>
        <input type="text" class="form-control" id="validationDefault05" value="Moscow" required>
      </div>

      <div class="col-12">
        <label for="validationDefault06" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="validationDefault06" value="+7(924)222-11-22" required>
      </div>
        
    </div>

    <div class="card-footer text-end">
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Add user</button>
      </div>
    </div>

  </form>

  `);
  userInfoContainer.appendChild(card);
}

function activeItem(target) {
  const list = target.parentElement.children

  for (const item of list) {
    const isActive = item.classList.contains('active');
    isActive ? item.classList.remove('active') : null;
  }
  target.classList.add('active')
}

function clearUserInfoContainer() {
  if(userInfoContainer.firstElementChild) {
    userInfoContainer.firstElementChild.remove();
}
}

function changeCounter(count) {

}