import { createUser } from "../../services/user.service";
import { prisma } from "../../app";

describe("User Service", () => {
  describe("createUser", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const user = await createUser(userData);

      expect(user).toHaveProperty("id");
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);

      // Verifica se o usuário foi realmente criado no banco
      const dbUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      expect(dbUser).not.toBeNull();
    });

    it("should not return the password hash", async () => {
      const userData = {
        name: "Test User",
        email: "test2@example.com",
        password: "password123",
      };

      const user = await createUser(userData);
      expect(user).not.toHaveProperty("password");
    });
  });
});
