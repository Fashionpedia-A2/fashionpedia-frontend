import { API_URL } from "./config.js";
import { setDropdown } from "./dropdown.js";

// Status Filter
document.addEventListener('DOMContentLoaded', function () {
  const statusButtons = document.querySelectorAll('.filter-status-button');
  let urlStatus = (new URL(window.location)).searchParams.get('status');
  if (!urlStatus) {
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



// Fetch Data
const fetchListings = async () => {
  const url = new URL(`${API_URL}/seller/listing`);
  const params = (new URL(window.location)).searchParams;

  const status = params.get('status');
  if (status && status !== 'all') {
    url.searchParams.set('status', status);
  }

  const sort = params.get('sort');
  if (sort) {
    url.searchParams.set('sort', sort.replace('-', ','));
  }

  const name = params.get('q');
  if (name) {
    url.searchParams.set('name', name);
  }

  console.log(url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data;
};

const renderListings = (data) => {
  const listingContainer = document.getElementById('listing-container');
  let listingElements = [];

  data.listings.forEach(listing => {
    listing.price = listing.price.toLocaleString('id-ID');
    const listingElement = `
      <tr class="border-y">
        <td>${listing.id}</td>
        <td class="flex">
          <a href="/buy/listing/${listing.id}" class="">
            <img
              src="${listing.image_url}"
              class="h-16 w-16">
          </a>
          <div class="flex flex-col w-full overflow-hidden">
            <a href="#" class="text-lg font-semibold text-nowrap text-ellipsis overflow-hidden"
              title="${listing.name}">${listing.name}</a>
            <span>${listing.size}</span>
          </div>
        </td>
        <td>Rp${listing.price}</td>
        <td>${listing.stock}</td>
        <td>
          <span class="chip-status-${listing.status.toLowerCase()}">${listing.status}</span>
        </td>
        <td>
          <div class="relative inline-block text-left">
            <div>
              <button type="button" class="dropdown-button" id="dropdown-manage-listing-${listing.id}" aria-expanded="false"
                aria-haspopup="true">
                Manage
                <i class="fa-solid fa-chevron-down text-gray-500"></i>
              </button>
            </div>
            <div class="dropdown-menu-container hidden" role="menu" aria-orientation="vertical"
              aria-labelledby="dropdown-manage-listing-${listing.id}" tabindex="-1">
              <div class="py-1" role="none">
                <a href="/sell/my-listing/edit/${listing.id}" class="dropdown-item" role="menuitem" tabindex="-1">
                  <i class="fa-solid fa-pen-to-square mr-4"></i>
                  <span>Edit</span>
                </a>
                <button class="dropdown-item delete-button" role="menuitem" tabindex="-1" data-id="${listing.id}">
                  <i class="fa-solid fa-trash mr-4"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
    listingElements.push(listingElement);
  });
  listingContainer.innerHTML = listingElements.join('\n');
};

document.addEventListener('DOMContentLoaded', async function () {
  const response = await fetchListings();
  if (response.status === 'success') {
    renderListings(response.data);
    setDropdown();
    setDeleteButton();
  } else {
    alert(response.message);
  }
});



// Set delete button event listener
async function setDeleteButton() {
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const id = button.getAttribute('data-id');
      deleteListing(id);
    });
  });
}


// Delete Listing
async function deleteListing(id) {
  if (!confirm('Are you sure you want to delete this listing?')) {
    return;
  }

  const url = `${API_URL}/seller/listing/${id}`;
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  response = await response.json();
  if (response.status === 'success') {
    window.location.reload();
  } else {
    alert(response.message);
  }
};