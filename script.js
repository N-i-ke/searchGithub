const button = document.getElementById("click");
const clearButton = document.getElementById("clear");
const type = document.getElementById("type");
let isFetching = false;

button.addEventListener("click", () => {
  if (isFetching) {
    console.log("Fetching True");
    return;
  }
    
  isFetching = true;

  let url = "https://api.github.com/users/N-i-ke/repos";
    
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)  
      for (let i = 0; i < data.length; i++) {
        newElement = document.createElement("div");
        newElement.innerHTML = data[i].name;
        type.appendChild(newElement);
        console.log(data[i].name);
      }
    });
});

clearButton.addEventListener("click", () => {
  // <div>内のすべての子要素を削除
  while (type.firstChild) {
    type.removeChild(type.firstChild);
  }
  //通信を切る  
  if (isFetching) {
    console.log("Fetching False");
    isFetching = false;
    return;
  }

});
