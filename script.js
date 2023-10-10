const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+<>?":~`{}';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

//set strenght colour to default grey
setIndicator('#ccc')

// set password length = passs lenght is display by this
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  // or kuch bhi krna chahiye
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function gererateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function gererateSymbol() {
  const ranNum = getRndInteger(0, symbols.length);
  return symbols.charAt(ranNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (  (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6 ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } 
  catch (e) {
    copyMsg.innerText = "failed";
    // console.log("error has been occur");
  }
  // to make copy message span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

// shuffle changes 
function shufflePassword(array){
    //algorithm will be used - fisher yates method
    for (let i= array.length-1 ; i>0 ; i--){
      //randim j find out using random fuction
        const j =Math.floor(Math.random() * (i+1))
        //swap fuction at i ann j fuction
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    let str = ''
    array.forEach((el)=>(str += el))
    return str
}
//checkbox
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  // special condtion
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
//checkbox
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});
//slider
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
//copy button
copyBtn.addEventListener('click' ,  () => {
    if (passwordDisplay.value) copyContent();
  });
//generate password
generateBtn.addEventListener("click", () => {
  //none of the chrck box are selected
  if (checkCount == 0) 
  return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //new pass word finding let start
  console.log('starting the journey')
  //remove password
  password = "";
  // let put the checkbox stuff
  // if(uppercaseCheck.checkbox){
  //     password += gererateUpperCase()
  // }

  // if(lowercaseCheck.checkbox){
  //     password += generateLowerCase()
  // }

  // if(numbersCheck.checkbox){
  //     password += generateRandomNumber()
  // }

  // if(symbolsCheck.checkbox){
  //     password += gererateSymbol()
  // }

  let fucArr = [];

  if (uppercaseCheck.checked) fucArr.push(gererateUpperCase);
  if (lowercaseCheck.checked) fucArr.push(generateLowerCase);
  if (numbersCheck.checked) fucArr.push(generateRandomNumber);
  if (symbolsCheck.checked) fucArr.push(gererateSymbol);

  //compul addintion

  for(let i=0 ; i<fucArr.length ; i++){
    password += fucArr[i]()
  }
  console.log('compulsory addition done')


  //remainig addition
  for(let i=0 ;  i<passwordLength-fucArr.length;i++){
    let randIndex = getRndInteger(0, fucArr.length)
    console.log('randIndex' + randIndex)
    password += fucArr[randIndex]()
  }

  console.log('remaining addition done ')

  //suffle the psswr

  password = shufflePassword(Array.from(password))

  console.log('suffling done ')

  //show on the display
  passwordDisplay.value = password
  console.log('ui addition done')

  //strength calculate
  calcStrength()
  



});
