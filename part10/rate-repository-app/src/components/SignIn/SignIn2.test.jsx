import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { LoginFormC } from "./LoginFormC";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const mockLogin = jest.fn();

      const vals = {
        username: "",
        password: "",
      };

      const validated = false; // Assuming validated is false initially

      const { getByPlaceholderText, getByText } = render(
        <LoginFormC
          onUsernameChange={(text) => {
            vals.username = text;
          }}
          onPasswordChange={(text) => {
            vals.password = text;
          }}
          onSubmit={mockLogin}
        />
      );

      const usernameInput = getByPlaceholderText("Username");
      const passwordInput = getByPlaceholderText("Password");
      const submitButton = getByText("Login");

      fireEvent.changeText(usernameInput, "testUser");
      fireEvent.changeText(passwordInput, "password123");

      expect(screen.findByText("testUser"));
      expect(screen.findByText("password123"));

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testUser',
            password: 'password123',
          });
      });
    });
  });
});
