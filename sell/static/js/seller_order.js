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