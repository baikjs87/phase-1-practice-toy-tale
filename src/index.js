let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(result => result.json())
.then(data => data.forEach(toy => addCard(toy)))

document.querySelector('.add-toy-form').addEventListener('submit', submitToy)

//Submit A New Toy
function submitToy(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(result => result.json())
  .then(toy => addCard(toy))
  document.querySelector('.add-toy-form').reset()
}

//Adding A Toy Card To List
function addCard(toy){
  const toyList = document.querySelector('#toy-collection')
  const card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src = "${toy.image}" class="toy-avatar">
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
  `
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes++
    card.querySelector('p').textContent = `${toy.likes} Likes`
    likeToy(toy)
  })
  
  toyList.appendChild(card)
}

function likeToy(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({toyObj})
  })
  .then(response => response.json)
  .then(toy => console.log(toy))
}