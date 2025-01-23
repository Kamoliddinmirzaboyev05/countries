document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const mode = document.querySelector(".mode");
  const btnImg = document.querySelector(".btnImg");
  const block = document.querySelector(".block");
  const searchInput = document.querySelector(".searchInput");
  var word;
  var darkMode;
  const changeMode = () => {
    darkMode = localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode")
      : "false";
    if (localStorage.getItem("darkMode") == "true") {
      body.classList.add("dark");
      btnImg.setAttribute("src", "img/sun.svg");
    } else {
      body.classList.remove("dark");
      btnImg.setAttribute("src", "img/moon.svg");
    }
  };
  changeMode();
  mode.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "false");
    } else {
      localStorage.setItem("darkMode", "true");
    }
    changeMode();
  });

  // Starting api
  let data;
  const apiLink = "https://restcountries.com/v3.1/all";
  const writeData = (DB) => {
    DB.forEach((item) => {
      var mln = item.population / 1000000;
      var ming = (item.population % 1000000) / 1000;
      var yuz = item.population % 1000;
      if (Math.floor(mln) == 0) {
        mln = "";
      } else {
        mln = Math.floor(mln);
      }
      if (Math.floor(ming) == 0 && Math.floor(mln) == 0) {
        ming = "";
      } else {
        ming = Math.floor(ming);
      }
      block.innerHTML += `
        <div class="card">
              <div class="flag">
                <img src="${item.flags.png}" alt="" />
              </div>
              <div class="card-text">
                <h2 class="country-name">${item.name.common}</h2>
                <div class="row">
                  <p class="key">Population:</p>
                  <p class="value">${mln} ${ming} ${yuz}</p>
                </div>
                <div class="row">
                  <p class="key">Region:</p>
                  <p class="value">${item.region}</p>
                </div>
                <div class="row">
                  <p class="key">Capital:</p>
                  <p class="value">${item.capital}</p>
                </div>
              </div>
            </div>
        `;
    });
  };
  const searchData = (DB, word) => {
    var searched = DB.filter((item) => {
      return item.name.common.includes(word);
    });
  };

  //   Synxron funksiya start
  const getData = async (link) => {
    const req = await fetch(link);
    data = await req.json();
    writeData(data);
    console.log(data[35].population);
  };
  getData(apiLink);
  // Synxron funksiya end
});
