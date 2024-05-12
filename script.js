// Список пицц с модификаторами
const pizzas = [
    {
      id: 1,
      name: "Margherita",
      description: "Classic pizza with tomato sauce, mozzarella, and basil.",
      price: 10,
      modifiers: ["Extra Cheese", "Pepperoni", "Mushrooms"]
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12,
      modifiers: ["Extra Cheese", "Mushrooms", "Olives"]
    },
    {
      id: 3,
      name: "Vegetarian",
      description: "Pizza with tomato sauce, mozzarella, bell peppers, onions, and olives.",
      price: 11,
      modifiers: ["Extra Cheese", "Mushrooms", "Artichokes"]
    },
    {
      id: 4,
      name: "BBQ Chicken",
      description: "Pizza with BBQ sauce, mozzarella, grilled chicken, and onions.",
      price: 13,
      modifiers: ["Extra Cheese", "Bacon", "Pineapple"]
    }
  ];
  
  // Генерация HTML для меню пицц
  const menuSection = document.getElementById("menu");
  
  pizzas.forEach(pizza => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza-item");
    pizzaDiv.innerHTML = `
      <h3>${pizza.name}</h3>
      <p>${pizza.description}</p>
      <p>Price: $${pizza.price}</p>
      <div>
        ${pizza.modifiers.map(modifier => `<label><input type="checkbox">${modifier}</label>`).join('')}
      </div>
      <button class="add-to-cart" data-id="${pizza.id}">Add to Cart</button>
    `;
    menuSection.appendChild(pizzaDiv);
  });
  
// Обработчик кнопок "Add to Cart"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const pizzaId = parseInt(event.target.dataset.id);
  const pizza = pizzas.find(pizza => pizza.id === pizzaId);

  const selectedModifiers = Array.from(event.target.parentNode.querySelectorAll("input[type=checkbox]:checked"))
                                    .map(checkbox => checkbox.nextElementSibling.textContent);

  const cartItem = {
    id: pizza.id,
    name: pizza.name,
    price: pizza.price,
    modifiers: selectedModifiers
  };

  cart.push(cartItem);
  renderCart();
}

// Функция для отображения корзины
function renderCart() {
  const cartSection = document.getElementById("cart");
  cartSection.innerHTML = "<h2>Cart</h2>";

  if (cart.length === 0) {
    cartSection.innerHTML += "<p>Your cart is empty.</p>";
  } else {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartSection.innerHTML += `
      <ul>
        ${cart.map(item => `
          <li>
            <strong>${item.name}</strong> - $${item.price}
            ${item.modifiers.length > 0 ? `(${item.modifiers.join(', ')})` : ''}
          </li>
        `).join('')}
      </ul>
      <p>Total: $${totalPrice}</p>
      <button id="checkout-button">Checkout</button>
    `;
  }
}

// Обработчик кнопки "Checkout"
document.getElementById("cart").addEventListener("click", function(event) {
  if (event.target.id === "checkout-button") {
    event.preventDefault();
    showPaymentForm();
  }
});

// Функция для отображения формы оплаты
function showPaymentForm() {
  const paymentSection = document.getElementById("payment");
  paymentSection.innerHTML = `
    <h2>Payment</h2>
    <form id="payment-form">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" required>
      <label for="expiry">Expiry Date:</label>
      <input type="text" id="expiry" required>
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" required>
      <button type="submit">Pay Now</button>
    </form>
  `;
}

// Генерация карты для отслеживания заказа
function showOrderTracking() {
    const orderTrackingSection = document.getElementById("order-tracking");
    orderTrackingSection.innerHTML = `
      <h2>Order Tracking</h2>
      <div id="map" style="height: 300px; border: 1px solid #ccc;"></div>
      <p>Estimated Delivery Time: 30 minutes</p>
    `;
  
    // Инициализация карты (здесь может быть ваш API ключ для карт)
    // const map = new Map("map");
  }
  
  // Функция для отображения формы оценки заказа
  function showFeedbackForm() {
    const feedbackSection = document.getElementById("feedback");
    feedbackSection.innerHTML = `
      <h2>Feedback</h2>
      <form id="feedback-form">
        <label for="rating">Rate Your Experience:</label>
        <select id="rating" required>
          <option value="">Select</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <div id="feedback-details">
          <label for="comments">Comments:</label>
          <textarea id="comments"></textarea>
          <label for="email">Email:</label>
          <input type="email" id="email">
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
    
    // Отображение дополнительных полей в зависимости от выбранной оценки
    document.getElementById("rating").addEventListener("change", function() {
      const feedbackDetails = document.getElementById("feedback-details");
      if (this.value === "negative") {
        feedbackDetails.style.display = "block";
      } else {
        feedbackDetails.style.display = "none";
      }
    });
  }
  
  // Обработчик кнопки "Checkout"
  document.getElementById("cart").addEventListener("click", function(event) {
    if (event.target.id === "checkout-button") {
      event.preventDefault();
      showPaymentForm();
    }
  });
  
  // Обработчик кнопки "Pay Now"
  document.getElementById("payment").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Payment successful! Your order has been placed.");
    showOrderTracking();
  });
  
  // Обработчик кнопки "Submit" для формы оценки заказа
  document.getElementById("feedback").addEventListener("submit", function(event) {
    event.preventDefault();
    const rating = document.getElementById("rating").value;
    if (rating === "negative") {
      const email = document.getElementById("email").value;
      // Отправить обратную связь на указанный email
      alert("Thank you for your feedback. We'll reach out to you soon.");
    } else {
      const feedback = document.getElementById("comments").value;
      // Отправить позитивный отзыв
      alert("Thank you for your positive feedback!");
    }
  });  