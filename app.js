const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
const orderForm = document.querySelector('#orderForm');

menuButton.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(orderForm);
  const message = [
    "Hello Meea's Bakery, I'd like to place an order:",
    '',
    `Name: ${data.get('name')}`,
    `Customer phone: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Product: ${data.get('product')}`,
    `Quantity: ${data.get('quantity')}`,
    `Preferred date: ${data.get('date') || 'Flexible'}`,
    '',
    'Order details:',
    data.get('message') || 'None',
  ].join('\n');

  window.open(`https://wa.me/2348117410004?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelectorAll('[data-order-product]').forEach((button) => {
  button.addEventListener('click', () => {
    orderForm.elements.product.value = button.dataset.orderProduct;
    document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
  });
});
