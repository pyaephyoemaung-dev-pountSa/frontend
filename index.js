const payBtn = document.querySelector('#pay-with-crypto');
const model = document.querySelector('#modal');
const content = document.querySelector('#content');
const modelContent = document.querySelector('#modalContent');

const products = [
  {
    id: 'jacket',
    name: "'BUILDER' JACKET",
    price: 200000,
    currency: 'MMK',
    image: './JACKET.png',
  },
  {
    id: 'airpods',
    name: "'DND, I'M BUILDING' AIRPODS",
    price: 500000,
    currency: 'MMK',
    image: './AIRPODS.png',
  },
  {
    id: 'mug',
    name: "'CAFFEINATED TO BUILD' MUG",
    price: 20000,
    currency: 'MMK',
    image: './MUG.png',
  },
  {
    id: 'bottle',
    name: "'HYDRATED TO BUILD' BOTTLE",
    price: 15000,
    currency: 'MMK',
    image: './BOTTLE.png',
  },
];

let addToCarts = [];
const createCard = (product) => {
  const cardContainer = document.createElement('article');
  cardContainer.classList.add(
    'product',
    'flex',
    'min-w-0',
    'flex-col',
    'font-NotoSansMono',
  );
  cardContainer.dataset.productId = product.id;
  const productName = document.createElement('h2');
  productName.classList.add('mb-3', 'text-[13px]', 'leading-5');
  productName.textContent = product.name;
  const productImageContainer = document.createElement('div');
  productImageContainer.classList.add(
    'flex',
    'h-47.5',
    'items-center',
    'justify-center',
  );
  productImageContainer.innerHTML = `<img
      class="product-image h-46.25 w-full object-contain"
      src="${product.image}"
    />`;
  const cardFooter = document.createElement('div');
  cardFooter.classList.add(
    'mt-3',
    'flex',
    'items-center',
    'justify-between',
    'gap-3',
  );
  cardFooter.innerHTML = `<span class="whitespace-nowrap text-[13px]">${product.price.toLocaleString()} ${product.currency}</span>
    <div class="flex items-center gap-3">
      <button class="quantity-btn minus" aria-label="Decrease quantity">
        −
      </button>
      <span class="quantity min-w-5 text-center text-sm" id="price-${product.id}">0</span>
      <button class="quantity-btn plus" aria-label="Increase quantity">
        +
      </button>
    </div>`;
  cardContainer.appendChild(productName);
  cardContainer.appendChild(productImageContainer);
  cardContainer.appendChild(cardFooter);
  content.appendChild(cardContainer);

  const addBtn = cardFooter.querySelector('.plus');
  const minusBtn = cardFooter.querySelector('.minus');
  addBtn.addEventListener('click', () => {
    changeQty(product, 1);
  });
  minusBtn.addEventListener('click', () => {
    changeQty(product, -1);
  });
};
const changeQty = (product, change) => {
  const cardItem = addToCarts.find((item) => item.id === product.id);
  if (cardItem) {
    cardItem.quantity += change;
    if (cardItem.quantity <= 0) {
      addToCarts = addToCarts.filter((item) => item.id !== product.id);
    }
  } else if (change > 0) {
    addToCarts.push({ ...product, quantity: 1 });
  }
  const upDatedItem = addToCarts.find((item) => item.id === product.id);
  const displayValue = upDatedItem ? upDatedItem.quantity : 0;
  document.querySelector(`#price-${product.id}`).textContent = displayValue;
  renderModel();
};
const renderModel = () => {
  modelContent.innerHTML = `<h3 class="text-base font-bold mb-2">Checkout Cart</h3>`;

  if (addToCarts.length === 0) {
    modelContent.innerHTML += `<p class="text-sm text-gray-500 py-4 text-center">Your cart is empty.</p>`;
    return;
  }

  addToCarts.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add(
      'flex',
      'justify-between',
      'gap-4',
      'mt-4',
      'border-b',
      'pb-2',
    );
    card.innerHTML = ` 
      <div>
        <p class="text-sm font-medium">${item.name}</p>
        <div class="flex items-center gap-2 mt-1">
          <img src="${item.image}" class="w-10" />
          <span class="text-xs text-gray-500">Qty: ${item.quantity}</span>
        </div>
      </div>
      <div class="flex justify-between gap-3 items-center">
        <p class="text-sm font-semibold">${(
          item.price * item.quantity
        ).toLocaleString()} ${item.currency}</p>
        <div class="flex items-center gap-3">
          <button class="btn-modal-minus size-8 border rounded-sm border-border flex items-center justify-center font-bold">
            -
          </button>
        </div>
      </div>`;

    card.querySelector('.btn-modal-minus').addEventListener('click', () => {
      changeQuantity(item, -1);
    });

    modelContent.appendChild(card);
  });
};
window.onload = () => {
  products.forEach((product) => {
    createCard(product);
  });
  renderModel();
};
payBtn.addEventListener('click', () => {
  model.classList.remove('hidden');
  model.classList.add('flex');
});
model.addEventListener('click', () => {
  onCancel();
});
modelContent.addEventListener('click', (event) => {
  event.stopPropagation();
});
const onCancel = () => {
  model.classList.remove('flex');
  model.classList.add('hidden');
};
