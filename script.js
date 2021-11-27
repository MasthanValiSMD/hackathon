function createElement(element) {
  return document.createElement(element);
}

function appendElement(parent, ele) {
  return parent.appendChild(ele);
}
let body = document.getElementsByTagName("body")[0];

let div = createElement("div");
div.className = "Container";
appendElement(body, div);

let navBar = document.createElement("navBar");
navBar.className =
  "navbar navbar-expand-lg navbar-dark bg-dark text-white d-flex justify-content-center";
navBar.innerHTML = `<a href="https://github.com/" target="_blank"><i class="fab fa-github fa-lg text-white"></i></a> Github API Search Repos`;
appendElement(div, navBar);

let form = document.createElement("form");
form.id = "myForm";
form.autocomplete = "off";
appendElement(div, form);

let formGrp = document.createElement("div");
formGrp.className = "formGRP mx-auto";
appendElement(form, formGrp);

let formDiv = document.createElement("div");
formDiv.className = "form-group ";
appendElement(formGrp, formDiv);

let input = document.createElement("input");
input.id = "search";
input.placeholder = "Github User";
appendElement(formDiv, input);

let formDiv1 = document.createElement("div");
formDiv1.className = "form-group";
appendElement(formGrp, formDiv1);

let button = document.createElement("button");
button.className = "btn btn-danger";
button.id = "btn";
button.innerHTML = "Search Here";
appendElement(formDiv1, button);

let card = document.createElement("div");
card.className = "card m-auto";
card.id = "card";
appendElement(div, card);

var Form = document.getElementById("myForm");

Form.addEventListener("submit", function (e) {
  e.preventDefault();

  var Search = document.getElementById("search").value;
  var originalName = Search.split(" ").join(" ");

  document.getElementById("card").innerHtml = "";

  async function getUsers() {
    try {
      let res = await fetch("https://api.github.com/users/" + originalName);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function renderUsers() {
    let users = await getUsers();

    document.getElementById("card").innerHTML = `
        <img class="img-fluid rounded" src =${users.avatar_url}/>

        
        <p class="text-danger">Name: <span class="text-black">${users.name}</span></p>

        <p class="text-danger">userName: <span class="text-black">${users.login}</span></p>
        
        <p class="text-danger">Repos <i class="fas fa-book"></i>: <span class="text-black">${users.public_repos}</span></p>

        <p class="text-danger">Followers <i class="fas fa-users"></i>: <span class="text-black"> ${users.followers}</span></p>
        
       <p class="text-danger">URL <i class="fas fa-link"></i>: <a target ="_blank" href="${users.html_url}"><span>${users.html_url}</span></a></p>


        `;
  }

  renderUsers();
});
