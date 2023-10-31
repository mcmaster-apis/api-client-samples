<?php
// Include the file containing the generateOptions() function
require_once 'fetch.php';

?>

<div class="container my-5">
  <form method="GET" id="calendar-form">
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

<script src="./js/dropdownHandler.js"></script>