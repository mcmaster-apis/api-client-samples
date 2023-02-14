const localStorageMock = {
  mockCareers: {
    id: "mockId",
    careers: [
      {
        id: "mockId/UGRD",
        description: "Undergraduate",
        code: "UGRD",
        shortDescription: "Undergrad",
      },
      {
        id: "mockId/GRAD",
        code: "GRAD",
        description: "Graduate",
        shortDescription: "Graduate",
      },
    ],
  },
  mockFaculties: {
    id: "mockId",
    faculties: [
      {
        id: "mockId/02",
        code: "02",
        description: "Faculty of Science",
        shortDescription: "SCI",
      },
      {
        id: "mockId/03",
        code: "03",
        description: "Faculty of Engineering",
        shortDescription: "ENG",
      },
    ],
  },
  mockPrograms: {
    "id": "mockId",
    "programs": [{
      "id": "mockId/UENBE",
      "code": "UENBE",
      "description": "Engineering Bachelors",
      "shortDescription": "UENBE",
      "career": {
        "id": "mockId/UGRD",
        "code": "UGRD",
        "description": "Undergraduate",
        "shortDescription": "Undergrad"
      },
      "faculty": {
        "id": "mockId/02",
        "code": "02",
        "description": "Faculty of Science",
        "shortDescription": "SCI"
      }
    }, {
      "id": "mockId/TEST2",
      "code": "TEST2",
      "description": "A test program",
      "shortDescription": "TEST2",
      "career": {
        "id": "mockId/UGRD",
        "code": "UGRD",
        "description": "Undergraduate",
        "shortDescription": "Undergrad"
      },
      "faculty": {
        "id": "mockId/02",
        "code": "02",
        "description": "Faculty of Science",
        "shortDescription": "SCI"
      }
    }]
  }
};

global.mockData = localStorageMock;
