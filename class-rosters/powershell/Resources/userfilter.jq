[.[] |
  (
    (.students[]? |
      .["sourcedId"] = .id |
      .["orgSourcedIds"] = "00001" |
      .["username"] = (.macId | ascii_downcase) + "@mcmaster.ca" |
      .["role"] = "student" |
      with_entries(select([.key] | inside(["sourcedId", "orgSourcedIds", "username", "role"])))
    ),
    (.instructors[]? |
      .["sourcedId"] = .id |
      .["orgSourcedIds"] = "00001" |
      .["username"] = (.macId | ascii_downcase) + "@mcmaster.ca" |
      .["role"] = "instructor" |
      with_entries(select([.key] | inside(["sourcedId", "orgSourcedIds", "username", "role"])))
    )
  )
] |
group_by(.sourcedId,.orgSourcedIds,.username) |
map({
  sourcedId:.[0].sourcedId,
  orgSourcedIds:.[0].orgSourcedIds,
  username:.[0].username,
  role:(
    map(.role) | unique | .[0]
    )
}) |
unique |
(.[0] | keys_unsorted) as $cols | 
map(. as $row | $cols | map($row[.])) as $rows | 
$cols, $rows[] | 
@csv