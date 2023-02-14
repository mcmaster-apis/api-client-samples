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
};

global.mockData = localStorageMock;
