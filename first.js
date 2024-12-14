const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

dropdown = document.querySelectorAll("select")
let fromCurr = document.querySelector("#fromS");
let toCurr = document.querySelector("#toS");
// select=document.querySelectorAll("#fromS")
for (select of dropdown) {
    for (country in countryList) {
        let option = document.createElement("option");
        option.value = country;
        option.innerText = country;
        select.append(option);
    }
    select.addEventListener("change", (element) => {
        code = element.target.value;
        country = countryList[code];
        adrs = `https://flagsapi.com/${country}/flat/64.png`
        let img = element.target.parentElement.querySelector("img");
        img.src = adrs;

    })
}


inp = document.querySelector("input")
const act = async () => {
    let val = inp.value;
    if (val === "" || val < 1) {
        val = 1; // Default value if input is invalid
    }

    console.log(`Fetching rates for: ${fromCurr.value.toLowerCase()}`);

    // Construct the correct API URL
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);

        // Check if response is okay
        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
        }

        let data = await response.json();
        console.log("API Response:", data);

        // Extract the target currency rate
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        
        if (!rate) {
            throw new Error(`Exchange rate for ${toCurr.value} not found.`);
        }

        let finalAmount = val * rate;
        msg.innerText = `${val} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Unable to fetch exchange rate. Please try again.";
    }
};


let btn=document.querySelector("#btn")
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    act();
})

window.addEventListener("load", () => {
    act();
  });