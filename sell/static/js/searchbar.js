const onSearch = () => {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();
  if (!searchQuery) return
  const url = new URL(window.location);
  url.searchParams.set('q', searchQuery);
  window.location.href = url.href;
};

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', onSearch);
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') onSearch()
  });

  let urlQuery = (new URL(window.location)).searchParams.get('q');
  if (urlQuery) {
    searchInput.value = urlQuery;
    searchInput.focus();
  }
});