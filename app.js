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
  const subject = `Order enquiry: ${data.get('product')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Product: ${data.get('product')}`,
    `Quantity: ${data.get('quantity')}`,
    `Preferred date: ${data.get('date') || 'Flexible'}`,
    '',
    'Order details:',
    data.get('message') || 'None',
  ].join('\n');

  window.location.href = `mailto:hello@meeasbakery.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
