let lable = document.getElementById("lable")
let shoppingCart = document.getElementById("shopping-cart")
let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Shoe",
    price: 45,
    description: "original comfort.",
    img: "images/img-1.jpg",
  },
  {
    id: "ioytrhndcv",
    name: "Cap",
    price: 30,
    description: "stylish cap.",
    img: "images/img-2.png",
  },
  {
    id: "wuefbncxbsn",
    name: "Habesha Cap",
    price: 25,
    description: "Style plus comfort.",
    img: "images/img-3.png",
  },
  {
    id: "thyfhcbcv",
    name: "Habesha Dress",
    price: 300,
    description: "Stylish dress.",
    img: "images/img-4.png",
  },
  {
    id: "thiecbawdjksadjk",
    name: "Habesha Dress",
    price: 25,
    description: "stylish Dress.",
    img: "images/img-5.png",
  },
  {
    id: "iuertrywebncdjksadjk",
    name: "Jawleries",
    price: 200,
    description: "Beautiful Jawleries.",
    img: "images/img-6.png",
  },
  {
    id: "thierytbvcbvzdhadjk",
    name: "Jawleries",
    price: 450,
    description: "Beautiful Jawleries.",
    img: "images/img-7.png",
  },
  {
    id: "trfoiwfcnbcawdjksadjk",
    name: "shirt",
    price: 45,
    description: "Nice mens shirt.",
    img: "images/img-8.png",
  },
  {
    id: "cbvxbcvsceldk",
    name: "Shirt",
    price: 85,
    description: "Mens Shirt.",
    img: "images/img-9.png",
  },
  {
    id: "oiopijmjkhuihb",
    name: "Shirt",
    price: 120,
    description: "Mens Black Shirt.",
    img: "images/img-10.png",
  },
  {
    id: "oiopijewyiohbjhib",
    name: "Cultural Shoe",
    price: 35,
    description: "Beautiful Shoe.",
    img: "images/img-11.png",
  },
  {
    id: "rtytytuyuytyytbvncv",
    name: "Watch",
    price: 350,
    description: "Nice Watch.",
    img: "images/img-12.png",
  },
]

basket = JSON.parse(localStorage.getItem("data")) || []

calculation = () => {
  const cartAmount = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  document.getElementById("cart-amount").innerHTML = cartAmount
}

calculation()

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemsData.find((x) => x.id === id) || []
        let { img, price, name } = search
        return `
        <div class = 'cart-item'> 
            <img width = '100' height = '90' src = ${img} alt =""/> 
            <div class = 'details'>
                <div class = 'title-price-x'>
                    <h4 class = 'title-price'>
                     <p>${name}</p>
                     <p class = 'cart-item-price'>$ ${price}</P>
                    </h4>
                    <i onclick = "removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
                <div class="btn">
                    <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}
                    </div>
                    <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
                    </div>
                <h3>$ ${item * price}</h3>
            </div>
        </div>`
      })
      .join(""))
  } else {
    shoppingCart.innerHTML = ``
    lable.innerHTML = `
    <h2> Cart Is Empty </h2>
    <a href = 'index.html'><button class = 'back-btn'>Back To Home</button></a>
    `
  }
}

generateCartItem()

//increment
increment = (id) => {
  let selectedItem = id

  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }

  generateCartItem()
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket))
}

//decrement
decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)
  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }
  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)
  generateCartItem()
  localStorage.setItem("data", JSON.stringify(basket))
}

//update
update = (id) => {
  let search = basket.find((x) => x.id === id)
  console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
  totalAmount()
}

let removeItem = (id) => {
  let selectedItem = id
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCartItem()
  totalAmount()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
  basket = []
  generateCartItem()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemsData.find((x) => x.id === id) || []
        return item * search.price
      })
      .reduce((x, y) => x + y)
    lable.innerHTML = `<h2>Total: $${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="clear">Clear</button>
    `
  } else return
}

totalAmount()
