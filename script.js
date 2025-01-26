const loader = document.querySelector(".loader");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
  const body = document.querySelector("body");
  const mode = document.querySelectorAll(".mode");
  const btnImg = document.querySelector(".btnImg");
  const block = document.querySelector(".block");
  const backBtn = document.querySelector(".backBtn");
  const modal = document.querySelector(".modal");
  const searchInput = document.querySelector(".searchInput");
  const select = document.querySelector("select");
  const modalData = document.querySelector(".modal-data");

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
  backBtn.addEventListener("click", () => {
    modal.style.bottom = "-1000px";
  });
  changeMode();
  mode.forEach((modeBtn) => {
    modeBtn.addEventListener("click", () => {
      if (body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "false");
      } else {
        localStorage.setItem("darkMode", "true");
      }
      changeMode();
    });
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
                <img class="flagImg" src="${item.flags.png}" alt="" />
              </div>
              <div class="card-text">
                <h2 class="country-name">${item.name.common}</h2>
                <div class="row">
                  <p class="key">Population:</p>
                  <p class="value">${population}</p>
                </div>
                <div class="row">
                  <p class="key ">Region:</p>
                  <p class="value region">${item.region}</p>
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

  //   Synxron funksiya start
  const getData = async (link) => {
    const req = await fetch(link);
    data = await req.json();
    writeData(data);
    writeModal(data);
    console.log(data);
  };
  getData(apiLink);
  // Synxron funksiya end

  //search uchun yozilgan funksiya

  searchInput.addEventListener("input", () => {
    const cards = block.querySelectorAll(".card");

    cards.forEach((card) => {
      var title = card.querySelector("h2").textContent.toLowerCase();

      if (!title.includes(searchInput.value.toLowerCase())) {
        card.classList.add("hidden");
      } else {
        card.classList.remove("hidden");
      }
    });
  });

  // filter cuhun yozilgan funksiya

  select.addEventListener("change", () => {
    const cards = block.querySelectorAll(".card");
    cards.forEach((card) => {
      var region = card.querySelector(".region").textContent.toLowerCase();
      if (!region.includes(select.value.toLowerCase())) {
        card.classList.add("hidden");
      } else {
        card.classList.remove("hidden");
      }

      if (select.value == "all") {
        card.classList.remove("hidden");
      }
    });
  });

  //modal uchun yzoilgan funksiya
  let country, clicked;
  window.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.classList.contains("card")) {
      country =
        e.target.parentElement.parentElement.querySelector("h2").textContent;
      clicked = e.target.parentElement.parentElement.classList.contains("card");
    }
  });
  const writeModal = (DB) => {
    DB.forEach((item) => {
      window.addEventListener("click", () => {
        if (item.name.common == country) {
          if (clicked) {
            modal.style.top = "0px";
          }
          const currencyKeys = Object.values(item.currencies);
          const languagesKeys = Object.values(item.languages);
          languagesKeys.forEach((lang) => {});

          modalData.innerHTML = `
          <div class="modal-img">
                <img src="${item.flags.png}" alt="" />
              </div>
              <div class="country-data">
                <h1>${item.name.common}</h1>
                <div class="cols">
                  <div class="col">
                    <div class="row">
                      <p class="key">Native Name:</p>
                      <p class="value">${item.name.common}</p>
                    </div>
                    <div class="row">
                      <p class="key">Population:</p>
                      <p class="value">${item.population}</p>
                    </div>
                    <div class="row">
                      <p class="key">Region:</p>
                      <p class="value">${item.region}</p>
                    </div>
                    <div class="row">
                      <p class="key">Time Zone:</p>
                      <p class="value">${item.timezones[0]}</p>
                    </div>
                    <div class="row">
                      <p class="key">Capital:</p>
                      <p class="value">${item.capital}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <p class="key">Top Level Domain:</p>
                      <p class="value">${item.tld[0]}</p>
                    </div>
                    <div class="row">
                      <p class="key">Currencies:</p>
                      <p class="value">${currencyKeys[0].name}, ${currencyKeys[0].symbol}</p>
                    </div>
                    <div class="row">
                      <p class="key">Languages:</p>
                      <p class="value">${languagesKeys[0]}</p>
                    </div>
                  </div>
                </div>
                <div class="border-country">
                  <h2>Border Countries</h2>
                  <div class="countries">
                    <button class="borders">France</button>
                    <button class="borders">France</button>
                    <button class="borders">France</button>
                  </div>
                </div>
              </div>
          `;
        }
      });
    });
  };
});
