const searchButton = document.getElementById("search");
const orgSearchButton = document.getElementById("org-search");
const clearButton = document.getElementById("clear");
const clearOrgButton = document.getElementById("org-clear");
const type = document.getElementById("type");
const typeOrg = document.getElementById("type-org");
const inputUser = document.querySelector("input[name=username]");
const inputOrg = document.querySelector("input[name=org]");
const msg = document.getElementById("msg");

let isFetching = false;
let newElement;

//usernameでGithub検索をかける
searchButton.addEventListener("click", () => {
  
  msg.innerText = inputUser.value;

  //inputに入力された値
  var userValue = inputUser.value;
  console.log(userValue);

  // 入力が空の場合はアラートを表示して処理を終了
  if (!userValue) {
    alert("usernameを入力してください");
    return;
  }

  if (isFetching) {
    console.log("Fetching True");
    return;
  }

  isFetching = true;
  let url = `https://api.github.com/users/${userValue}/repos`;
  console.log(url);

  fetch(url)
    .then((response) => {
      // レスポンスが成功したか確認
      if (!response.ok) {
        throw new Error(`GitHub APIエラー: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayRepositories(data);
    })
    .catch((error) => {
      //usernameが存在しない時
      alert(`ユーザーネームが存在しません`);
      clearRepositories();
    })
    .finally(() => {
      isFetching = false;
    });
});

//組織でGithub検索をかける
orgSearchButton.addEventListener("click", () => {

  console.log(inputOrg.value)
  msg.innerText = inputOrg.value;

  //inputに入力された値
  var orgValue = inputOrg.value;
  console.log(orgValue);
  
  // 入力が空の場合はアラートを表示して処理を終了
  if (!orgValue) {
    alert("組織名を入力してください");
    return;
  }

  if (isFetching) {
    console.log("Fetching True");
    return;
  }

  isFetching = true;
  let url = `https://api.github.com/orgs/${orgValue}`;
  console.log(url);

  fetch(url)
    .then((response) => {
      // レスポンスが成功したか確認
      if (!response.ok) {
        throw new Error(`GitHub APIエラー: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayOrganization(data);
    })
    .catch((error) => {
      //usernameが存在しない時
      alert(`組織が存在しません`);
      clearOrganization();
    })
    .finally(() => {
      isFetching = false;
    });
});

clearButton.addEventListener("click", () => {
  clearRepositories();
});
clearOrgButton.addEventListener("click", () => {
  clearOrganization();
});

function displayRepositories(data) {
  clearRepositories();
  for (let i = 0; i < data.length; i++) {
    newElement = document.createElement("div");
    linkElement = document.createElement("a");
    linkElement.href = data[i].html_url; // リンクのURLを設定
    linkElement.target = "_blank"; // 新しいタブで開くために

    // <a>要素の中にテキスト（リポジトリ名）を追加
    linkElement.innerText = data[i].name;
    // <a>要素を新しい<div>要素に追加
    newElement.appendChild(linkElement);
    // 新しい<div>要素を#typeに追加
    type.appendChild(newElement);
    console.log(data[i].name);
  }
}

function displayOrganization(data) {
  clearRepositories();
  console.log("displayOrg")
      orgElement = document.createElement("div");
      orgLinkElement = document.createElement("a");
      orgLinkElement.href = data.html_url; // リンクのURLを設定
      orgLinkElement.target = "_blank"; // 新しいタブで開くために

      // <a>要素の中にテキスト（組織名）を追加
      orgLinkElement.innerText = data.login;
      // <a>要素を新しい<div>要素に追加
      orgElement.appendChild(orgLinkElement);
      // 新しい<div>要素を#typeに追加
      typeOrg.appendChild(orgElement);
      console.log(data.login);
}

function clearRepositories() {
  while (type.firstChild) {
    type.removeChild(type.firstChild);
  }
}
function clearOrganization() {
  while (typeOrg.firstChild) {
    typeOrg.removeChild(typeOrg.firstChild);
  }
}

