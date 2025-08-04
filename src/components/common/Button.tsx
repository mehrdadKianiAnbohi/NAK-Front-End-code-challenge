import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: `
    background-color: #18181B;
    color: white;
    border: none;
    &:hover {
      background-color: #3f3f46;
    }
  `,
  secondary: `
    background-color: transparent;
    color: #18181B;
    border: 1px solid #E4E4E7;
    &:hover {
      background-color: #F4F4F5;
      border-color: #A1A1AA;
    }
  `,
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  border-radius: 9999px; /* Pill shape */
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  ${({ variant = "primary" }) => variantStyles[variant]}

  &:disabled {
    background-color: #a1a1aa;
    border-color: #a1a1aa;
    color: #e4e4e7;
    cursor: not-allowed;
  }
`;

export default Button;
