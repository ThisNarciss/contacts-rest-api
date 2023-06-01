const login = require("../controllers/auth/loginUser");
const usersService = require("../service/usersService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../service/usersService");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Login Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    res = {
      json: jest.fn(),
    };

    usersService.findUser.mockResolvedValue({
      _id: "user-id",
      email: "test@example.com",
      password: "$2b$10$CgPUOSCE8fdN4Rn5yJErvuZAJqyc8i6T9/KqHwULpKdGLeAH9HsGa",
      subscription: "starter",
    });

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("fakeToken");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return status code 200", async () => {
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      data: expect.any(Object),
    });
  });

  test("should return a token in the response", async () => {
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      data: {
        token: expect.any(String),
        user: expect.any(Object),
      },
    });
  });

  test("should return user object with email and subscription fields of type String", async () => {
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      data: {
        token: expect.any(String),
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      },
    });
  });
});
