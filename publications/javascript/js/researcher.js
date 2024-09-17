export function Researcher(researcherElement) {
  const userid = researcherElement.getAttribute('data-userid');

  let herobar = document.createElement('h2');
  let publist = document.createElement('ol');

  const options = {
    headers: {
      'Accept': 'application/json',
      'Ocp-Apim-Subscription-Key': '<YOUR KEY HERE>'
    }
  }
  fetch(`https://api.mcmaster.ca/publications/v1/people/${userid}`, options)
    .then((userResponse) => {
      return userResponse.json();
    })
    .then((userData) => {
      herobar.innerHTML = userData.name

      fetch(userData.publications, options)
        .then((pubsResponse) => {
          return pubsResponse.json();
        })
        .then((pubsData) => {
          let pubs = pubsData.publications

          pubs.sort(function(a, b) {
            return new Date(b.publicationDate) - new Date(a.publicationDate);
          }).map(function(pub) {
            let pubref = document.createElement('li');
            pubref.innerHTML = getPublicationText(pub);
            publist.appendChild(pubref);
          });
        })
    })
    .then(() => {
      researcherElement.appendChild(herobar);
      researcherElement.appendChild(publist);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getPublicationText(pub) {
  let pubDate = pub.publicationDate ? pub.publicationDate : pub.createdAtSourceDate;
  let authorText = pub.authors;

  if (isBook(pub)) {
    console.log(`Book: ${pub.id}`);
    if (pub.authors) {
      const authorRegex = /\s*(?:;|,)\s*/;
      const authors = pub.authors.split(authorRegex);

      if (authors.length > 2) {
        authorText = `${authors[0]}, et al`;
      } else if (authors.length == 2) {
        authorText = `${authors[0]}, and ${authors[1]}`;
      } else {
        authorText = authors[0];
      }
      return `${authorText}. ${pub.title}. ${pub.publisher}, ${pubDate}.`;
    }
    return `${pub.title}. ${pub.publisher}, ${pubDate}.`;
  }

  if (isSerial(pub)) {
    console.log(`Serial: ${pub.id}`);
    let coords = serialCoordinates(pub);
    let journalName = pub.canonicalJournalTitle ? pub.canonicalJournalTitle : pub.journal;

    return `${authorText}. ${pubDate}. ${pub.title}. ${journalName}. ${coords}.`;
  }

  console.log(`Other: ${pub.id}`);
}

function serialCoordinates(pub) {
  let serialItem = "";
  if (pub.volume && pub.issue) {
    serialItem = `${pub.volume}(${pub.issue})`;
  } else if (pub.volume) {
    serialItem = `${pub.volume}`;
  } else if (pub.issue) {

  }

  if (!pub.paginationBegin || !pub.paginationEnd) {
    return `${pub.volume}(${pub.issue})`;
  }

  if (pub.paginationBegin == pub.paginationEnd) {
    return `${pub.volume}(${pub.issue}):${pub.paginationBegin}`;
  }

  return `${pub.volume}(${pub.issue}):${pub.paginationBegin}-${pub.paginationEnd}`;
}

function isBook(pub) {
  return (pub.isbn10 || pub.isbn13) && !isSerial(pub);
}

function isSerial(pub) {
  return (pub.issn || pub.eissn);
}
