document.getElementById('calendar-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const careerFilterValue = document.getElementById('career-filter').value;
  const facultyFilterValue = document.getElementById('faculty-filter').value;

  const queryParams = `career-filter=${careerFilterValue}&faculty-filter=${facultyFilterValue}`;

  fetch(`handle_form.php?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      const data = responseJson.data;
      const resultsContainer = document.getElementById('results-container');
      if (!data.programs || data.programs.length === 0) {
        resultsContainer.innerHTML = `<div>No program found for career ${careerFilterValue} and faculty ${facultyFilterValue}.</div>`;
        return;
      }

      let resultsHTML = '<div class="accordion">';
      data.programs.forEach(program => {
        const { code, description, career, faculty } = program;
        resultsHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${code}" aria-expanded="true" aria-controls="${code}">
                        ${code}
                    </button>
                </h2>
                <div class="accordion-collapse collapse" id="${code}" aria-labelledby="${code}">
                    <div class="accordion-body">
                        <h4>${description}</h4>
                        <ul class="list-unstyled">
                            <li>Career: ${career.description}</li>
                            <li>Faculty: ${faculty.description}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
      });
      resultsHTML += '</div>';
      resultsContainer.innerHTML = resultsHTML;
    })
    .catch(error => {
      console.log(error);
      document.getElementById('results-container').innerHTML = '<div>Failed to fetch API data.</div>';
    });
});
