
// ██ ███    ███ ██████   ██████  ██████  ████████ ███████
// ██ ████  ████ ██   ██ ██    ██ ██   ██    ██    ██
// ██ ██ ████ ██ ██████  ██    ██ ██████     ██    ███████
// ██ ██  ██  ██ ██      ██    ██ ██   ██    ██         ██
// ██ ██      ██ ██       ██████  ██   ██    ██    ███████


import Menu from './data.js'




// ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
// ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██
// ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
//  ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
//   ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████

let priceArr = []
let orderArr = []
let totalPrice;
let newOrdersObj = []
let orderId = 0;
let displayed = false


// ██████   ██████  ███    ███ ███████
// ██   ██ ██    ██ ████  ████ ██
// ██   ██ ██    ██ ██ ████ ██ ███████
// ██   ██ ██    ██ ██  ██  ██      ██
// ██████   ██████  ██      ██ ███████


const cardEl = document.querySelector('.container')
const orderEl = document.querySelector('.orderSection')
const totalPriceEl = document.querySelector('.totalPrice')
const appendHereEl = document.querySelector('.appendHere')
const checkoutBtnEl = document.querySelector('#checkout')
const formEl = document.querySelector('.form')
const paymentFormEl = document.querySelector('.paymentForm')
const thankYouContainer = document.querySelector('.thankYouContainer')




// ███████ ██    ██ ███████ ███    ██ ████████
// ██      ██    ██ ██      ████   ██    ██
// █████   ██    ██ █████   ██ ██  ██    ██
// ██       ██  ██  ██      ██  ██ ██    ██
// ███████   ████   ███████ ██   ████    ██

// ██      ██ ███████ ████████ ███████ ███    ██ ███████ ██████  ███████
// ██      ██ ██         ██    ██      ████   ██ ██      ██   ██ ██
// ██      ██ ███████    ██    █████   ██ ██  ██ █████   ██████  ███████
// ██      ██      ██    ██    ██      ██  ██ ██ ██      ██   ██      ██
// ███████ ██ ███████    ██    ███████ ██   ████ ███████ ██   ██ ███████


document.addEventListener('click', (event)=>{

    event.target.dataset.orderbutton == 0 ? addItem(event.target.dataset.orderbutton)
    : event.target.dataset.orderbutton == 1 ? addItem(event.target.dataset.orderbutton)
    : event.target.dataset.orderbutton == 2 ?
    addItem(event.target.dataset.orderbutton)
    : event.target.dataset.remove ? removeItem(event.target.dataset.remove) :
    event.target.dataset.checkout ? toggleCheckoutDisplay() : ''
})

paymentFormEl.addEventListener('submit', (event)=>{
    event.preventDefault()
    submitPayment()
    thankCustomer()
})


// ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
// ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
// █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
// ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
// ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
// __________________________________________________________________________



const addItem = (clickedItem)=> {

const targetMenuObj = Menu.filter((copyOfMenu)=>{
    return copyOfMenu.id == clickedItem
})[0]

const {name, price} = targetMenuObj

orderEl.style.display = 'block'

priceArr.push(price)
orderArr.push(name)
newOrdersObj.push({name, price, orderId})

getTotalPrice()
orderId++
renderOrder()
render()
console.log(orderId)
}


const renderOrder = ()=> {

    let theHtml = ''

    newOrdersObj.forEach((orders)=> {
        const {name, price, orderId} = orders
        theHtml += `
        <section class="flexbox" data-order="${orderId}">
        <div class="nameOfItem orderChild1">${name} <span class="removeBtn" data-remove="${orderId}">remove</span></div>
        <div class="priceOfItem orderChild2">$${price}</div>
        </section>
        `
    })
    return theHtml
}

const render = ()=> {
    let orderedThings = renderOrder()
    cardEl.innerHTML = mappedMenu
    orderEl.innerHTML =   `<h1 class="appendHere">Your Order</h1>
    ${orderedThings}
    <section class="flexbox totalContainer">
        <div class="Total orderChild1">Total Price</div>
        <div class="totalPrice orderChild2">$${totalPrice}</div>
    </section>
    <button id="checkout" data-checkout="LetsPay">Checkout</button>
    </section>`
}



const removeItem = (removedOrder)=> {

    const postRemovalOrders = newOrdersObj.filter((copyOfNewOrders)=> {
        return copyOfNewOrders.orderId != removedOrder
    })

    newOrdersObj = postRemovalOrders

    let newPriceArr = newOrdersObj.map((orders)=> {
        return orders.price
    })

    priceArr = newPriceArr
    orderId--
    getTotalPrice()
    render()
    closeWindow()
}


const getTotalPrice = ()=> {
    totalPrice = priceArr.reduce((total, current)=>{return total + current},0)
}

const mappedMenu = Menu.map((copyOfMenu)=> {
    const {name, ingredients, id, price, emoji} = copyOfMenu
    return ` <div class="menuItem">
                <h1 class="emoji child1">${emoji}</h1>
                    <div class="descriptionEl child2">
                        <h1 class="foodName">${name}</h1>
                        <p class="ingredients">${ingredients}</p>
                        <p class="price">$${price}</p>
                    </div>
                <button class="button child3 ${id}" data-orderbutton="${id}">+</button>
                </div>
            `
}).join('')

const closeWindow = ()=> {
        if(priceArr.length == 0) {
            orderEl.style.display = 'none'
        }
}

const toggleCheckoutDisplay = ()=> {
    if (!displayed) {
        formEl.style.display = "block"
        displayed = true
    } else {
        formEl.style.display = "none"
        displayed = false
    }
}

const submitPayment = ()=> {
    toggleCheckoutDisplay()
}

const thankCustomer = ()=> {
    const paymentFormData = new FormData(paymentFormEl)
    let payeeName = paymentFormData.get('PayeeName')
    orderEl.style.display = 'none'
    let p = document.createElement('p')
    p.classList.add('thankYouMessage')
    p.innerText = `Thanks, ${payeeName}! Your order is on it's way!`
    thankYouContainer.appendChild(p)
}

render()
