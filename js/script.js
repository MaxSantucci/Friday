window.addEventListener('DOMContentLoaded', () => {

  function req() {
    let body = {
      name: "Samoone",
      surname: "Else",
      age: 26,
      id: Math.random()
    };
    let json = JSON.stringify(body);

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/people");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(json);
    request.addEventListener("readystatechange", function () {
      if (request.status == 200) {
        let data = JSON.parse(request.response);
        console.log(data);
        createCards(data);

      } else {
        console.error("Something went wrong")
      }
    });

    //   getResourse("http://localhost:3000/people")
    //     .then(data => createCards(data))
    //     .catch(err => console.log(err));

    //   this.remove
    // }

    document.querySelector("button").addEventListener("click", req, { 'once': true });

    // async function getResourse(url) {
    //   const res = await fetch(`${url}`);

    //   if (!res.ok) {
    //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //   }

    //   return res;
    // }

    async function getResourse(url) {
      const res = await fetch(`${url}`);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    }

    function createCards(response) {
      response.forEach(item => {
        let card = document.createElement('div');

        card.classList.add('card');

        let icon;
        if (item.sex === "male") {
          icon = "icons/mars.png";
        } else {
          icon = "icons/female.png";
        }

        card.innerHTML = `
      <img src="${item.photo}" alt="photo">
      <div class="name">${item.name} ${item.surname}</div>
      <div class="sex">
        <img src=${icon} alt="male">
      </div>
      <div class="age">${item.age}</div>
      `;
        document.querySelector('.app').appendChild(card);
      });
    }
  });