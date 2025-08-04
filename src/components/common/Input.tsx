import { forwardRef, InputHTMLAttributes } from "react";
import styled from "@emotion/styled";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  color: #18181b;
  background-color: #f4f4f5;
  border: 1px solid transparent;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  &::placeholder {
    color: #a1a1aa;
  }

  &:focus {
    outline: none;
    border-color: #a1a1aa;
    background-color: #ffffff;
  }

  &:disabled {
    background-color: #e4e4e7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  padding-left: 1.5rem;
  margin-top: 0.25rem;
  display: block;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <InputWrapper>
        <StyledInput ref={ref} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";

export default Input;
