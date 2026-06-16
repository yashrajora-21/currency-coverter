const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const dateInput = document.querySelector("#date");

window.addEventListener("load",()=>{
    updateExchangeRate();
});
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue<1 || amtvalue===""){
        amtvalue=1;
        amount.value="1";
    }
    const URL=`${base_URL}${fromcurr.value.toLowerCase()}.json`;
    try{
        let response = await fetch(URL);
        let json = await response.json();
        // Convert currency keys to lowercase
    let fromCurrency = fromcurr.value.toLowerCase();
    let toCurrency = tocurr.value.toLowerCase();

    if (!json[fromCurrency] || !json[fromCurrency][toCurrency]) {
        throw new Error("Invalid currency conversion");
    }
    const rate = json[fromCurrency][toCurrency];
    const convertedValue = amtvalue * rate;

    msg.innerText = `Exchanged Value: ${convertedValue.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};