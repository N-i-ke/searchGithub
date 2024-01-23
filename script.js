const searchButton = document.getElementById("search");
const clearButton = document.getElementById("clear");
const type = document.getElementById("type");
const inputUser = document.querySelector("input[name=username]");
const msg = document.getElementById("msg");

let isFetching = false;
let newElement;

searchButton.addEventListener("click", () => {

  alert(inputUser.value)
  msg.innerText = inputUser.value
  
  //inputに入力された値 
  var userValue = inputUser.value;
  console.log(userValue)


  if (isFetching) {
    console.log("Fetching True");
    return;
  }

  isFetching = true;
  let url = `https://api.github.com/users/${userValue}/repos`;
  console.log(url)

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayRepositories(data);
    })
    .finally(() => {
      isFetching = false;
    });
});

clearButton.addEventListener("click", () => {
  clearRepositories();
});

function displayRepositories(data) {
  clearRepositories();
  for (let i = 0; i < data.length; i++) {
    newElement = document.createElement("div");
    newElement.innerHTML = data[i].name;
    type.appendChild(newElement);
    console.log(data[i].name);
  }
}

function clearRepositories() {
  while (type.firstChild) {
    type.removeChild(type.firstChild);
  }
}

