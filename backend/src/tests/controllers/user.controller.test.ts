import { Request, Response } from "express";
import { registerUserHandler } from "../../controllers/user.controller";
import { prisma } from "../../app";

describe("User Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return this;
      }),
    };
  });

  it("should register a new user", async () => {
    mockRequest.body = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    await registerUserHandler(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(responseObject.status).toBe("success");
    expect(responseObject.data.user).toHaveProperty(
      "email",
      "test@example.com"
    );
  });

  it("should not allow duplicate emails", async () => {
    // Primeiro cria um usuário
    await prisma.user.create({
      data: {
        name: "Existing User",
        email: "existing@example.com",
        password: "hashedpassword",
      },
    });

    mockRequest.body = {
      name: "Test User",
      email: "existing@example.com", // Email duplicado
      password: "password123",
    };

    await registerUserHandler(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(responseObject.status).toBe("fail");
  });
});
