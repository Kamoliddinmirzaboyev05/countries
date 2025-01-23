
  const body = document.querySelector("body");
  const mode = document.querySelector(".mode");
  const btnImg = document.querySelector(".btnImg");
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
    console.log(darkMode);
    changeMode();
  });

