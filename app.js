const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
const orderForm = document.querySelector('#orderForm');
const desktopMenuButton = document.querySelector('#desktopMenuButton');
const desktopMenu = desktopMenuButton?.closest('.menu-dropdown');
const menuTreeBranches = desktopMenu?.querySelectorAll('.menu-tree__branch') ?? [];

const activateMenuBranch = (branch) => {
  menuTreeBranches.forEach((item) => item.classList.toggle('is-active', item === branch));
};

menuTreeBranches.forEach((branch) => {
  branch.addEventListener('mouseenter', () => activateMenuBranch(branch));
  branch.addEventListener('focusin', () => activateMenuBranch(branch));
});

desktopMenuButton?.addEventListener('click', () => {
  const isOpen = desktopMenu.classList.toggle('is-open');
  desktopMenuButton.setAttribute('aria-expanded', String(isOpen));
});

desktopMenu?.addEventListener('mouseenter', () => {
  desktopMenuButton.setAttribute('aria-expanded', 'true');
});

desktopMenu?.addEventListener('mouseleave', () => {
  desktopMenu.classList.remove('is-open');
  desktopMenuButton.setAttribute('aria-expanded', 'false');
  if (menuTreeBranches[0]) activateMenuBranch(menuTreeBranches[0]);
});

desktopMenu?.addEventListener('focusout', (event) => {
  if (!desktopMenu.contains(event.relatedTarget)) {
    desktopMenu.classList.remove('is-open');
    desktopMenuButton.setAttribute('aria-expanded', 'false');
  }
});

desktopMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    desktopMenu.classList.remove('is-open');
    desktopMenuButton.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (desktopMenu && !desktopMenu.contains(event.target)) {
    desktopMenu.classList.remove('is-open');
    desktopMenuButton.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && desktopMenu) {
    desktopMenu.classList.remove('is-open');
    desktopMenuButton.setAttribute('aria-expanded', 'false');
    desktopMenuButton.focus();
  }
});

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
