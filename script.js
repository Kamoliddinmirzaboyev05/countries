const loader = document.querySelector(".loader-back");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
  const body = document.querySelector("body");
  const mode = document.querySelector(".mode");
  const modalMode = document.querySelector(".modalMode");
  const btnImg = document.querySelector(".btnImg");
  const modalBtnImg = document.querySelector(".modalBtnImg");
  const block = document.querySelector(".block");
  const backBtn = document.querySelector(".backBtn");
  const modal = document.querySelector(".modal");
  const searchInput = document.querySelector(".searchInput");
  const select = document.querySelector("select");
  const modeTitle = document.querySelector(".modeTitle");
  const modalModeTitle = document.querySelector(".modalModeTitle");
  const modalData = document.querySelector(".modal-data");
  const addBtn = document.querySelector(".addBtn");
  const addBack = document.querySelector(".addBack");
  const figmaTitle = document.querySelector(".figmaTitle");
  const urlImg = document.querySelector(".urlImg");
  const urlFigma = document.querySelector(".urlFigma");
  const figmaLang = document.querySelector(".figmaLang");
  const figmaType = document.querySelector(".figmaType");
  const figmaInfo = document.querySelector(".figmaInfo");
  const addFigmaBtn = document.querySelector(".addFigmaBtn");

  const changeMode = () => {
    darkMode = localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode")
      : "false";
    if (localStorage.getItem("darkMode") == "true") {
      body.classList.add("dark");
      btnImg.setAttribute("src", "img/sun.svg");
      modalBtnImg.setAttribute("src", "img/sun.svg");
    } else {
      body.classList.remove("dark");
      btnImg.setAttribute("src", "img/moon.svg");
      modalBtnImg.setAttribute("src", "img/moon.svg");
    }
  };
  changeMode();
  mode.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "false");
      modeTitle.textContent = "Dark Mode";
    } else {
      localStorage.setItem("darkMode", "true");
      modeTitle.textContent = "Light Mode";
    }
    changeMode();
  });
  modalMode.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "false");
      modalModeTitle.textContent = "Dark Mode";
    } else {
      localStorage.setItem("darkMode", "true");
      modalModeTitle.textContent = "Light Mode";
    }
    changeMode();
  });

  // Add figma function

  addBtn.addEventListener("click", () => {
    addBack.classList.add("addActive");
  });

  // Starting api
  let data, population;
  const apiLink = "https://679e2ea0946b0e23c062c4e8.mockapi.io/users/figmaland";
  const writeData = (DB) => {
    // DB.forEach((item) => {
    //   block.innerHTML += `
    //     <div class="card">
    //           <div class="flag">
    //             <img class="flagImg" src="${item.flags.png}" alt="" />
    //           </div>
    //           <div class="card-text">
    //             <h2 class="country-name">${item.name.common}</h2>
    //             <div class="row">
    //               <p class="key">Population:</p>
    //               <p class="value">${population}</p>
    //             </div>
    //             <div class="row">
    //               <p class="key ">Region:</p>
    //               <p class="value region">${item.region}</p>
    //             </div>
    //             <div class="row">
    //               <p class="key">Capital:</p>
    //               <p class="value">${item.capital}</p>
    //             </div>
    //           </div>
    //         </div>
    //     `;
    // });
  };

  //   Synxron funksiya start
  const getData = async (link) => {
    const req = await fetch(link);
    data = await req.json();
    console.log(data);
  };
  getData(apiLink);
  // Synxron funksiya end

  // Post function start
  const postData = async (url, postedData) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  };

  // Misol uchun foydalanish:

  const postedData = {
    img: urlImg.value,
    info: "figmaInfo.value",
    lang: "figmaLang.value",
    title: "figmaTitle.value",
    type: "figmaType.value",
    url: "urlFigma.value",
  };

  addFigmaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Malumotlar qoshildi");
    postData(apiLink, postedData)
      .then((responseData) => {
        console.log("Malumotlar muvaffaqiyatli yuborildi:", responseData);
      })
      .catch((error) => {
        console.error("Xato yuz berdi:", error);
      });
  });

  // Post function end
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
      if (clicked && !modal.classList.contains("show-modal")) {
        modal.classList.add("show-modal");
      }
    }
  });

  backBtn.addEventListener("click", () => {
    modal.classList.remove("show-modal");
  });

  searchInput.addEventListener("input", () => {
    console.log(searchInput.value);
  });
});
