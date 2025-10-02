(function(){
  const form = document.getElementById("feedbackForm");
  const submitBtn = document.getElementById("submitBtn");

  const validators = {
    firstName: val => /^[A-Za-z]{2,20}$/.test(val) || "First name must be 2–20 letters.",
    lastName: val => /^[A-Za-z]{2,20}$/.test(val) || "Last name must be 2–20 letters.",
    emailId: val => /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(val) || "Email must be @northeastern.edu",
    phoneNumber: val => /^\(\d{3}\) \d{3}-\d{4}$/.test(val) || "Phone must be (XXX) XXX-XXXX",
    zipcode: val => /^\d{5}$/.test(val) || "Zip must be exactly 5 digits.",
    addr1: val => val.trim().length > 0 || "Address 1 required",
    comments: val => val.trim().length > 5 || "Comments must be at least 5 characters."
  };

  function validateField(id){
    const input = document.getElementById(id);
    const error = document.getElementById(id+"Error");
    const val = input.value.trim();
    const result = validators[id] ? validators[id](val) : true;
    if(result===true){
      console.log(error.style);
      console.log("Document(id):",document.getElementById(id));
      console.log("ErrorId:",document.getElementById(id+"Error"));
      error.style.display="none";
      return true;
    } else {
      error.textContent = result;
      error.style.display="block";
      return false;
    }
  }

  ["firstName","lastName","emailId","phoneNumber","zipcode","addr1","comments"].forEach(id=>{
    document.getElementById(id).addEventListener("input",()=>{
      validateField(id);
      checkFormValidity();
    });
  });

  document.getElementById("phoneNumber").addEventListener("input",e=>{
    let x = e.target.value.replace(/\D/g,"").substring(0,10);
    let formatted = "";
    if(x.length>6) formatted = `(${x.substring(0,3)}) ${x.substring(3,6)}-${x.substring(6,10)}`;
    else if(x.length>3) formatted = `(${x.substring(0,3)}) ${x.substring(3,6)}`;
    else if(x.length>0) formatted = `(${x}`;
    e.target.value = formatted;
  });

  document.getElementById("addr2").addEventListener("input",e=>{
    document.getElementById("charCounter").textContent = `${e.target.value.length}/20 characters used`;
  });

  document.getElementById("myList").addEventListener("change",()=>{
    const dynamicArea=document.getElementById("dynamicArea");
    dynamicArea.innerHTML="";
    const value=document.getElementById("myList").value;
    if(value){
      const checkbox=document.createElement("input");
      checkbox.type="checkbox";
      checkbox.id="dynamicCheck";
      const label=document.createElement("label");
      label.textContent=` Enable ${value}`;
      label.prepend(checkbox);
      checkbox.addEventListener("change",()=>{
        if(checkbox.checked){
          const text=document.createElement("input");
          text.type="text";
          text.id="dynamicText";
          text.placeholder=`${value} input`;
          text.required=true;
          dynamicArea.appendChild(text);
        } else {
          const text=document.getElementById("dynamicText");
          if(text) dynamicArea.removeChild(text);
        }
      });
      dynamicArea.appendChild(label);
    }
  });

  function checkFormValidity(){
    // let valid = ["firstName","lastName","emailId","phoneNumber","zipcode","addr1","comments"].every(id=>validateField(id));
    // const titleError=document.getElementById("titleError");
    // const titleChecked=document.querySelector("input[name='title']:checked");
    // if(!titleChecked){
    //   titleError.textContent="Please select a title.";
    //   titleError.style.display="block";
    //   valid=false;
    // } else {
    //   titleError.style.display="none";
    // }
    // submitBtn.disabled=!valid;

    // document.querySelectorAll("input[name='title']").forEach(radio => {
    //   radio.addEventListener("change", checkFormValidity);
    // });
    let valid = true;
  ["firstName","lastName","emailId","phoneNumber","zipcode","addr1","comments"].forEach(id => {
    const ok = validateField(id);
    if (!ok) {
      console.log("Invalid field:", id, document.getElementById(id).value);
    }
    valid = valid && ok;
  });

  const titleChecked = document.querySelector("input[name='title']:checked");
  if (!titleChecked) {
    console.log("Invalid field: title");
    valid = false;
    document.getElementById("titleError").style.display = "block";
  }

  submitBtn.disabled = !valid;
  }

  form.addEventListener("submit",e=>{
    e.preventDefault();
    checkFormValidity();
    if(submitBtn.disabled) return;
    const results=document.getElementById("results");
    const data={
      Title: document.querySelector("input[name='title']:checked")?.value || "",
      FirstName: document.getElementById("firstName").value,
      LastName: document.getElementById("lastName").value,
      Email: document.getElementById("emailId").value,
      Phone: document.getElementById("phoneNumber").value,
      Zip: document.getElementById("zipcode").value,
      Address1: document.getElementById("addr1").value,
      Address2: document.getElementById("addr2").value || "",
      Comments: document.getElementById("comments").value,
      Option: document.getElementById("myList").value,
      Extra: document.getElementById("dynamicText")?document.getElementById("dynamicText").value:""
    };
    if(!results.querySelector("table")){
      results.innerHTML="<h3>Submitted Data</h3><table><thead><tr>"+Object.keys(data).map(k=>`<th>${k}</th>`).join("")+"</tr></thead><tbody></tbody></table>";
    }
    const tbody=results.querySelector("tbody");
    const row="<tr>"+Object.values(data).map(v=>`<td>${v}</td>`).join("")+"</tr>";
    tbody.insertAdjacentHTML("beforeend",row);
    form.reset();
    document.getElementById("charCounter").textContent="0/20 characters used";
    document.getElementById("dynamicArea").innerHTML="";
    submitBtn.disabled=true;
  });

  const faq={
    email:"You must use your Northeastern email (example: student@northeastern.edu).",
    phone:"The phone number must be in the format (XXX) XXX-XXXX.",
    zip:"The zip code must be exactly 5 digits.",
    required:"All fields are required except Street Address 2.",
    address:"Street Address 2 is optional. If left blank, it will remain empty in the results table."
  };

  const chatWindow=document.getElementById("chatWindow");
  document.getElementById("chatToggle").addEventListener("click",()=>{
    chatWindow.hidden=!chatWindow.hidden;
  });
  document.getElementById("chatSend").addEventListener("click",sendChat);
  document.getElementById("chatInput").addEventListener("keydown",e=>{
    if(e.key==="Enter"){e.preventDefault();sendChat();}
  });

  function sendChat(){
    const input=document.getElementById("chatInput");
    const msgArea=document.getElementById("chatMessages");
    const text=input.value.trim();
    if(!text) return;
    msgArea.insertAdjacentHTML("beforeend",`<div><b>You:</b> ${text}</div>`);
    input.value="";
    let found="Sorry, I don’t know that yet. Please check the instructions.";
    for(let key in faq){ if(text.toLowerCase().includes(key)){found=faq[key]; break;} }
    msgArea.insertAdjacentHTML("beforeend",`<div><b>Bot:</b> ${found}</div>`);
    msgArea.scrollTop=msgArea.scrollHeight;
  }
})();