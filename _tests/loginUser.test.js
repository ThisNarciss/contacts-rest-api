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
      statusCode: 200,
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
    expect(res.statusCode).toBe(200);
  });

  test("should return a token in the response", async () => {
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          token: "fakeToken",
        }),
      })
    );
  });

  test("should return user object with email and subscription fields of type String", async () => {
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          user: expect.objectContaining({
            email: expect.stringContaining("test@example.com"),
            subscription: expect.stringContaining("starter"),
          }),
        }),
      })
    );
  });
});
