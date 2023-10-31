<!-- index.php -->
<!DOCTYPE html>
<html>

<head>
  <title>McMaster API Client Sample - PHP</title>
  <meta charset="utf-8" />
  <link rel="icon" href="public/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Academic Calendar API PHP Sample" />
  <link rel="manifest" href="public/manifest.json" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles/custom.css">
</head>

<body>
  <div class="container mt-5">
    <h4 class="text-center">Academic Calendar API PHP Sample</h4>
  </div>
  <?php require_once './form.php'; ?>
  <div id="results-container" class="container mb-5"></div>
  <script src="./js/formSubmitHandler.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>