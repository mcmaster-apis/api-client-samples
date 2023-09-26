import { Researcher } from './researcher.js';

document.addEventListener('DOMContentLoaded', function() {
  const researchers = document.querySelectorAll('[role=researcher]');
  researchers.forEach(researcher => {
    new Researcher(researcher);
  });
});