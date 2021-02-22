
/////// KITCHEN INVENTORY ///////


// Selectors

const generalInput = document.querySelector('.general-input');
const kitchenButton = document.querySelector('.kitchen-button');
const shoppingButton = document.querySelector('.shopping-button');
const kitchenList = document.querySelector('.kitchen-list');
const shoppingList = document.querySelector('.shopping-list');




// Event Listeners

document.addEventListener('DOMContentLoaded', getKitchenList);
document.addEventListener('DOMContentLoaded', getShoppingList);

kitchenButton.addEventListener('click', addKitchen);
shoppingButton.addEventListener('click', addShopping);
kitchenList.addEventListener('click', kitchenCheck);
shoppingList.addEventListener('click', shoppingCheck);


/////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS


    // ADDING ITEMS FROM INPUT BAR

function addKitchen(event){

    if (generalInput.value == ""){
        preventDefault(); // Prevents blank submission
    }
    const kitchenDiv = document.createElement("div");
    kitchenDiv.classList.add("kitchen");

    // CREATE NEW ELEMENT
    const newKitchen = document.createElement('li');
    newKitchen.innerText = generalInput.value;
    newKitchen.classList.add('kitchen-item');
    kitchenDiv.appendChild(newKitchen);
    saveLocalKitchenList(newKitchen.innerText);

    // BUTTONS
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    kitchenDiv.appendChild(trashButton);

    // APPEND ITEM, CLEAR INPUT
    kitchenList.appendChild(kitchenDiv);
    generalInput.value = "";

}

function addShopping(event){

    if (generalInput.value == ""){
        preventDefault(); // Prevents blank submission
    }
    const shoppingDiv = document.createElement("div");
    shoppingDiv.classList.add("shopping");

    // CREATE NEW ELEMENT
    const newShopping = document.createElement('li');
    newShopping.innerText = generalInput.value;
    newShopping.classList.add('shopping-item');
    shoppingDiv.appendChild(newShopping);

    saveLocalShoppingList(newShopping.innerText);

    // BUTTONS 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    shoppingDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    shoppingDiv.appendChild(trashButton);

    // APPEND ITEM, CLEAR INPUT
    shoppingList.appendChild(shoppingDiv);
    generalInput.value = "";

}

    // CHECKING FOR CLICKS ON THE BUTTONS ON LIST ELEMENTS

function shoppingCheck(e){
    const item = e.target;
    if (item.classList[0] === 'trash-btn'){
        const shopItem = item.parentElement;
        //animation
        shopItem.classList.add('fall');
        removeLocalShopping(shopItem);
        shopItem.addEventListener('transitionend', function(){
            shopItem.remove();
        })
    }
    if (item.classList[0] === 'complete-btn'){
        const shopItem = item.parentElement;
        const kitchenDiv = document.createElement("div");
        kitchenDiv.classList.add("kitchen");
        //create li
        const newKitchen = document.createElement('li');
        newKitchen.innerText = shopItem.innerText;
        newKitchen.classList.add('kitchen-item');
        kitchenDiv.appendChild(newKitchen);

        saveLocalKitchenList(newKitchen.innerText);


        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        kitchenDiv.appendChild(trashButton);
        kitchenList.appendChild(kitchenDiv);
        
        shopItem.classList.add('toLeft');
        shopItem.addEventListener('transitionend', function(){
            shoppingList.removeChild(shopItem);
        })
        removeLocalShopping(shopItem);
        
        }
}

function kitchenCheck(e){
    const item = e.target;
    if (item.classList[0] === 'trash-btn'){
        const kitchenItem = item.parentElement;
        //animation
        kitchenItem.classList.add('fall');
        removeLocalKitchen(kitchenItem);
        kitchenItem.addEventListener('transitionend', function(){
            kitchenItem.remove();
        })
    }
}


//////////////////////////////////////////////////////////////////


// LOCAL STORAGE CODE

    // SAVING THE LOCAL STORAGE

function saveLocalKitchenList(kitchenItem){

    let kitchenItems;
    if (localStorage.getItem('kitchenItems') === null){
        kitchenItems = [];
    }
    else {
        kitchenItems = JSON.parse(localStorage.getItem("kitchenItems"));
    }
    kitchenItems.push(kitchenItem);
    localStorage.setItem("kitchenItems", JSON.stringify(kitchenItems));


}

function saveLocalShoppingList(shopItem){

    let shopItems;
    if (localStorage.getItem('shopItems') === null){
        shopItems = [];
    }
    else {
        shopItems = JSON.parse(localStorage.getItem("shopItems"));
    }
    shopItems.push(shopItem);
    localStorage.setItem("shopItems", JSON.stringify(shopItems));

}

    // GETTING SAVED LISTS

function getKitchenList(){

    let kitchenItems;
    if (localStorage.getItem('kitchenItems') === null){
        kitchenItems = [];
    }
    else {
        kitchenItems = JSON.parse(localStorage.getItem("kitchenItems"));
    }

    kitchenItems.forEach(function(kitchenItem){
        const kitchenDiv = document.createElement("div");
        kitchenDiv.classList.add("kitchen");

        const newKitchen = document.createElement('li');
        newKitchen.innerText = kitchenItem;
        newKitchen.classList.add('kitchen-item');
        kitchenDiv.appendChild(newKitchen);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        kitchenDiv.appendChild(trashButton);
    
        kitchenList.appendChild(kitchenDiv);
    }
        
    );

}

function getShoppingList(){

    let shopItems;
    if (localStorage.getItem('shopItems') === null){
        shopItems = [];
    }
    else {
        shopItems = JSON.parse(localStorage.getItem("shopItems"));
    }

    shopItems.forEach(function(shopItem){
        const shoppingDiv = document.createElement("div");
        shoppingDiv.classList.add("shopping");
  
        const newShopping = document.createElement('li');
        newShopping.innerText = shopItem;
        newShopping.classList.add('shopping-item');
        shoppingDiv.appendChild(newShopping);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        shoppingDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        shoppingDiv.appendChild(trashButton);

        shoppingList.appendChild(shoppingDiv);
    });
}

    // REMOVING FROM LOCAL STORAGE

function removeLocalKitchen(kitchenItem){

    let kitchenItems;
    if (localStorage.getItem('kitchenItems') === null){
        kitchenItems = [];
    }
    else {
        kitchenItems = JSON.parse(localStorage.getItem("kitchenItems"));
    }

    const kitchenItemIndex = kitchenItem.children[0].innerText.toLowerCase();
    kitchenItems.splice(kitchenItems.indexOf(kitchenItemIndex), 1);
    localStorage.setItem("kitchenItems", JSON.stringify(kitchenItems));
}

function removeLocalShopping(shopItem){

    let shopItems;
    if (localStorage.getItem('shopItems') === null){
        shopItems = [];
    }
    else {
        shopItems = JSON.parse(localStorage.getItem("shopItems"));
    }

    const shopItemIndex = shopItem.children[0].innerText.toLowerCase();
    shopItems.splice(shopItems.indexOf(shopItemIndex), 1);
    localStorage.setItem("shopItems", JSON.stringify(shopItems));

}
