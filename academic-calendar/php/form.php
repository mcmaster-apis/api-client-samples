<?php
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Include the file containing the generateOptions() function
require_once 'functions.php';

?>

<div class="container my-5">
  <form method="GET" action="handle_form.php">
    <div class="d-flex justify-content-between">
      <div class="row">
        <div class="dropdown col-md-4 mx-3">
          <button class="btn btn-primary dropdown-toggle" type="button" id="career-filter-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Select Career
          </button>
          <ul class="dropdown-menu" aria-labelledby="career-filter-dropdown">
            <?php
            generateOptions('careers', $careerFilterValue ?? '');
            ?>
          </ul>
          <input type="hidden" name="career-filter" id="career-filter" class="hidden-filter">
        </div>
        <br>
        <div class="dropdown col-md-4 mx-3">
          <button class="btn btn-primary dropdown-toggle" type="button" id="faculty-filter-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Select Faculty
          </button>
          <ul class="dropdown-menu" aria-labelledby="faculty-filter-dropdown">
            <?php
            generateOptions('faculties', $facultyFilterValue ?? '');
            ?>
          </ul>
          <input type="hidden" name="faculty-filter" id="faculty-filter" class="hidden-filter">
        </div>
      </div>
      <br>
      <div class="d-flex align-items-center">
        <button class="btn btn-secondary" type="submit">Search</button>
      </div>
    </div>
  </form>
</div>

<script>
  document.querySelectorAll('.dropdown-item').forEach(function(item) {
    var dropdownButton = item.closest('.dropdown').querySelector('.dropdown-toggle');
    if (item.classList.contains('active')) {
      dropdownButton.innerText = item.innerText;
    }
    item.addEventListener('click', function() {
      var value = this.getAttribute('data-value');
      var text = this.innerText;
      var dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
      dropdownButton.innerText = text;
      dropdownButton.nextElementSibling.value = value;
      var hiddenInput = this.closest('.dropdown').querySelector('.hidden-filter');
      hiddenInput.setAttribute('value', value);
    })
  })
</script>