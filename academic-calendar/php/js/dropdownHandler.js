document.querySelectorAll('.dropdown-item').forEach(function (item) {
  var dropdownButton = item.closest('.dropdown').querySelector('.dropdown-toggle');
  if (item.classList.contains('active')) {
    dropdownButton.innerText = item.innerText;
  }
  item.addEventListener('click', function () {
    var value = this.getAttribute('data-value');
    var text = this.innerText;
    var dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
    dropdownButton.innerText = text;
    dropdownButton.nextElementSibling.value = value;
    var hiddenInput = this.closest('.dropdown').querySelector('.hidden-filter');
    hiddenInput.setAttribute('value', value);
  })
})