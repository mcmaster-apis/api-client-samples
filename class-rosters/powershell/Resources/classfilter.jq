[ .[] |
  .["sourcedId"] = .section.session.term.id + "-" + .section.id |
  .["orgSourcedId"] = "00001" |
  .["title"] = .section.subject.id + " " + .section.catalogCode + " " + .section.sectionCode + " " + (.section.session.term.description[5:8] | ascii_upcase) + " " + .section.session.term.description[0:4] + " " +.section.course.title |
  with_entries(select([.key] | inside(["sourcedId", "orgSourcedIds", "title"])))
] |
(.[0] | keys_unsorted) as $cols | 
map(. as $row | $cols | map($row[.])) as $rows |
$cols, $rows[] |
@csv