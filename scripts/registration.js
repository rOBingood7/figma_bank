const patterns = {
    name: /^[a-z ,.'-]+$/i,
    surname: /^[a-z ,.'-]+$/i,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };
  
  const inps = document.querySelectorAll("input");
  const form = document.querySelector("form");
  
  form.onsubmit = (e) => {
    e.preventDefault();
  
    let isError = false;
  
    inps.forEach((inp) => {
      if (inp.classList.contains("error") || inp.value === "") {
        isError = true;
        inp.classList.add("error");
      }
    });
  
    if (isError) {
      alert("Error");
    } else {
      submit(e.target);
    }
  
    form.reset();
  };
  
  function submit(target) {
    const fm = new FormData(target);
    const user = {};
  
    fm.forEach((val, key) => (user[key] = val));
  
    console.log(user);
  }
  
  inps.forEach((inp) => {
    inp.onkeyup = (e) => {
      const val = e.target.value;
  
      if (patterns[inp.name].test(val)) {
        inp.style.border = "3px solid blue";
      } else {
        inp.style.border = "3px solid red";
      }
      patterns[inp.name].lastIndex = 0;
    };
  });
  