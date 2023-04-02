/* fa vedere gli utenti */
async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  }

  /* tabella sopra */

  async function getAddresses(users) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    const userMap = new Map(userData.map(user => [user.username, user.address]));
    const addresses = users.map(user => userMap.get(user.username));
    return addresses.map(address => `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`);
  }

  async function populateTable(users) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    userAddresses = await getAddresses(users);
    users.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>${userAddresses[index]}</td>
      `;
      tableBody.appendChild(row);
    });
  }


  /* filtro */
  function filterUsers() {
    const selectValue = document.querySelector('#inlineFormCustomSelect').value;
    const inputValue = document.querySelector('#inputSearch').value.toLowerCase();
    getUsers().then(users => {
      const filteredUsers = users.filter(user => {
        if (selectValue === 'email') {
          return user.email.toLowerCase().includes(inputValue);
        } else if (selectValue === 'username') {
          return user.username.toLowerCase().includes(inputValue);
        } else if (selectValue === 'name') {
          return user.name.toLowerCase().includes(inputValue);
        } else {
          return false;
        }
      });
      populateTable(filteredUsers);
    });
  }

  document.querySelector('#inputSearch').addEventListener('input', filterUsers);
  document.querySelector('#inlineFormCustomSelect').addEventListener('change', filterUsers);

  (async () => {
    const users = await getUsers();
    populateTable(users);
  })();


 /* lista casuale nomi dopo clik su btn*/
 
 function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  document.querySelector('#shuffleBtn').addEventListener('click', () => {
    const userTable = document.querySelector('#userTable');
    const users = Array.from(userTable.querySelectorAll('tbody tr')).map(row => row.querySelector('td:nth-child(2)').textContent);
    const shuffledUsers = shuffleArray(users);
    const nameList = document.querySelector('#nameList tbody');
    nameList.innerHTML = '';
    shuffledUsers.forEach((name, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${name}</td>
      `;
      nameList.appendChild(row);
    });
  });

  
  
 
