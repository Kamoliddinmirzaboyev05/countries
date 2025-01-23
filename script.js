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
  let data, population;
  const apiLink = "https://restcountries.com/v3.1/all";
  const writeData = (DB) => {
    DB.forEach((item) => {
      if (item.population < 1000) {
        population = item.population;
      }
      // milliondan kam aholi
      else if (item.population > 1000 && item.population < 1000000) {
        var yuz = item.population % 1000;
        if (yuz < 10) {
          yuz = `00${yuz}`;
        } else if (yuz < 100) {
          yuz = `0${yuz}`;
        }
        var ming = item.population / 1000;
        population = `${Math.floor(ming)} ${yuz}`;
      }
      //   milliondan ko'p aholi
      else if (item.population > 1000000 && item.population < 1000000000) {
        var yuz = item.population % 1000;
        var ming = (item.population % 1000000) / 1000;
        var mln = item.population / 1000000;
        if (yuz < 10) {
          yuz = `00${yuz}`;
        } else if (yuz < 100) {
          yuz = `0${yuz}`;
        }
        if (ming < 10) {
          ming = `00${ming}`;
        } else if (ming < 100) {
          ming = `0${Math.floor(ming)}`;
          population = `${Math.floor(mln)} ${ming} ${yuz}`;
        } else {
          population = `${Math.floor(mln)} ${Math.floor(ming)} ${yuz}`;
        }
      }
      //   milliarddan ko'p aholi
      else {
        var yuz = item.population % 1000;
        var ming = (item.population % 1000000) / 1000;
        var mln = (item.population % 1000000000) / 1000000;
        var mlrd = item.population / 1000000000;
        if (yuz < 10) {
          yuz = `00${yuz}`;
        } else if (yuz < 100) {
          yuz = `0${yuz}`;
        }
        population = `${Math.floor(mlrd)} ${Math.floor(mln)} ${Math.floor(
          ming
        )} ${yuz}`;
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
                  <p class="value">${population}</p>
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
    console.log(data[27].population);
  };
  getData(apiLink);
  // Synxron funksiya end
});
