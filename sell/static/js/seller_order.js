import { API_URL } from "./config.js";
import { setDropdown } from "./dropdown.js";

// Status Filter
const ORDER_STATUS = [
  "MENUNGGU_PEMBAYARAN",
  "MENUNGGU_PROSES",
  "DIPROSES",
  "DIKIRIM",
  "SELESAI",
  "DIBATALKAN"
]

document.addEventListener('DOMContentLoaded', function () {
  const statusButtons = document.querySelectorAll('.filter-status-button');
  let urlStatus = (new URL(window.location)).searchParams.get('status');
  if (!urlStatus || !ORDER_STATUS.includes(urlStatus.toUpperCase())) {
    urlStatus = 'all';
  }
  statusButtons.forEach(button => {
    const status = button.getAttribute('data-status');
    if (status === urlStatus) {
      button.classList.add('selected');
    }
    button.addEventListener('click', function (e) {
      const url = new URL(window.location);
      url.searchParams.set('status', status);
      window.location.href = url.href;
    });
  });
});

// Sort By
document.addEventListener('DOMContentLoaded', function () {
  const sortButtons = document.querySelectorAll('.sort-by-button');
  let urlSort = (new URL(window.location)).searchParams.get('sort');
  const sortValueText = document.getElementById('sort-value');

  sortButtons.forEach(button => {
    const sort = button.getAttribute('data-sort');
    if (sort === urlSort) {
      button.classList.add('selected');
      sortValueText.textContent = ' : ' + button.textContent;
    }
    button.addEventListener('click', function (e) {
      const sort = button.getAttribute('data-sort');
      const url = new URL(window.location);
      url.searchParams.set('sort', sort);
      window.location.href = url.href;
    });
  });
});


// Fetch Order
async function fetchOrder() {
  const url = buildUrl();
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data;
}

function buildUrl() {
  let url = new URL(window.location);
  const status = url.searchParams.get('status');
  const sort = url.searchParams.get('sort');
  const orderId = url.searchParams.get('q');

  url = new URL(`${API_URL}/seller/order`);
  if (status && ORDER_STATUS.includes(status.toUpperCase())) {
    url.searchParams.set('status', status);
  }
  if (sort) {
    url.searchParams.set('sort', sort.replace('-', ','));
  }
  if (orderId) {
    url.searchParams.set('id', orderId);
  }
  return url;
}

function dateFormatter(date) {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  // Format the date
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const parts = formatter.formatToParts(date);

  // Convert parts to desired format
  const formattedDate = `${parts.find(p => p.type === 'day').value} ${parts.find(p => p.type === 'month').value} ${parts.find(p => p.type === 'year').value}; ${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
  return formattedDate;
}

function renderOrder(data) {
  const orderElements = [];
  data.orders.forEach(order => {
    const orderElement = `
      <div class="flex flex-col border rounded-2xl">
        <div class="flex justify-between border-b p-4">
          <div class="flex divide-x">
            <div class="px-4 font-semibold">ID: ${order.id}</div>
            <div class="px-4" title="Created At">
              <i class="fa-regular fa-calendar-plus"></i>
              <span>${dateFormatter(new Date(order.createdAt))}</span>
            </div>
            <div class="px-4" title="Updated At">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>${dateFormatter(new Date(order.updatedAt))}</span>
            </div>
          </div>
          <span class="status-chip status-chip-${order.status.toLowerCase()}">${order.status.toUpperCase()}</span>
        </div>
        <div class="flex border-b divide-x">
          <div class="w-[35%] flex flex-col p-4 flex-none">
            <span class="font-semibold text-lg mb-4">Buyer Detail</span>
            <div class="flex flex-col">
              <span class="font-semibold">${order.buyer.name}</span>
              <span>${order.buyer.phoneNumber}</span>
              <span class="font-semibold mt-4">Address</span>
              <p>${order.buyer.address}</p>
            </div>
          </div>
          <div class="w-[65%%] flex flex-col p-4 gap-y-4 overflow-hidden">
            <span class="font-semibold text-lg">Listing Detail</span>

            ${order.listings.map(l => `
            <div class="listing-card flex justify-start gap-x-4 w-full">
              <div class="flex w-full gap-x-4">
                <img
                  src="${l.listing.image_url}"
                  class="h-16 w-16">
                <div class="flex flex-col w-full overflow-hidden">
                  <a href="#" class="text-lg font-semibold text-nowrap text-ellipsis overflow-hidden"
                    title="${l.listing.name}">${l.listing.name}</a>
                  <div class="flex gap-x-2">
                    <span>${l.quantity}</span>
                    <span>x</span>
                    <span>Rp${l.listing.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span>Subtotal : </span>
                    <span class="font-semibold">Rp${l.subTotalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
            `).join('\n')}
          </div>
        </div>
        <div class="p-4 text-lg flex justify-between">
          <div>
            <span class="font-semibold">Total Price: </span>
            <span class="font-bold">Rp${order.totalPrice.toLocaleString('id-ID')}</span>
          </div>
          <button class="btn-primary px-6 py-1">Proses</button>
        </div>
      </div>
    `
    orderElements.push(orderElement);
  });
  const orderContainer = document.getElementById('order-container');
  orderContainer.innerHTML = orderElements.join('\n');
}

document.addEventListener('DOMContentLoaded', async function () {
  const response = await fetchOrder();
  console.log(response);
  if (response.status === 'success') {
    renderOrder(response.data);
    setDropdown();
  } else {
    alert(response.message);
  }
});