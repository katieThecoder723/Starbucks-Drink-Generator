
const img = document.getElementById('drink_image');
const drink_name = document.getElementById('drink_name');
const drink_category = document.getElementById('drink_category')
const drink_info = document.getElementById('info')
const nutrition_table = document.createElement("table");
nutrition_table.border = "1";
const nutrition_keys = ["Calories", "Sugars (g)","Caffeine (mg)"]

const showcase_drinks = [
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190528_JavaChipFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20181217_PinkDrink.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220323_StrawberryFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20181127_MatchaGreenTeaFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190607_IcedCaffeAmericano.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190531_IcedBlackTeaLemonade.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/PeppermintWhiteChocolateCremeFrap.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_PineapplePassionfruitRefreshers.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Cappuccino.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_SignatureHotChocolate.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_RoyalEnglishBreakfastTeaLatte.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20181113_VanillaBeanFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221216_FrozenStrawberryAcaiRefresherLemonade.jpg?impolicy=1by1_wide_topcrop_630"
];

let currentIndex = 0;
let isSlideshowActive = true;

function changeImage() {
    if (!isSlideshowActive) return;
    
    img.src = showcase_drinks[currentIndex];

    currentIndex = (currentIndex + 1) % showcase_drinks.length;
}

let IntervalId = setInterval(changeImage, 2000);

function Generate_Drink(){
    let cat = document.getElementById('Category_Dropdown').value
    if (cat === null){
        cat = ""
    }
    $('#drink_image').hide()
    $('#loading').show()
    fetch("https://coderlab.work/api/v1/starbucks", {method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({drink_category: cat})})
        .then(response => {
            if(!response.ok) {
            throw new Error('HTTP error! Status:${response, status}');
            }
            return response.json();
        })
        .then(data  => {
            clearInterval(IntervalId)
            console.log(data);
            drink_name.innerText = data["drink"]["Name"]
            drink_category.innerText = data["drink"]["Category"]
            //drink_info.innerText = data["drink"][""]
            img.src = data["image"]
            if (data["image"] === null || data["image"]===""){
                Generate_Drink()
                return;
            }
            nutrition_table.innerHTML = "";
            for (let i = 0; i < 3; i++) {
                const row = document.createElement("tr");
                for (let j = 0; j < 2; j++) {
                    const cell = document.createElement("td");
                    if(j == 0){
                        cell.textContent = `${nutrition_keys[i]}`;
                    }
                    else{
                        cell.textContent = `${data["drink"][nutrition_keys[i]]}`;
                    }
                    row.appendChild(cell);
                }
                nutrition_table.appendChild(row);
            }
            drink_info.innerHTML = "";
            drink_info.appendChild(nutrition_table)
            $('#loading').hide()
            $('#drink_image').show()
        })
        .catch(error => {
            console.error('Error', error);
    });
}


















