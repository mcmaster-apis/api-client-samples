[.[] |
  .section as $section |
  (
    (.students[]? |
      .["classSourcedId"] = $section.session.term.id + "-" + $section.id |
      .["userSourcedId"] = .id |
      .["role"] = "student" |
      with_entries(select([.key] | inside(["classSourcedId", "userSourcedId", "role"])))
    ),
    (.instructors[]? |
      .["classSourcedId"] = $section.session.term.id + "-" + $section.id |
      .["userSourcedId"] = .id |
      .["role"] = (if .role == "Primary Instructor" then "instructor" elif .role == "Secondary Instructor" then "instructor" else "teacherAssistant" end) |
      with_entries(select([.key] | inside(["classSourcedId", "userSourcedId", "role"])))
    )
  )
] |
(.[0] | keys_unsorted) as $cols | 
map(. as $row | $cols | map($row[.])) as $rows | 
$cols, $rows[] | 
@csv