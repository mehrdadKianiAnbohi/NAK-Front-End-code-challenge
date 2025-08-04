import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { loginUser } from "@/api/auth";
import { SignInCredentials } from "@/types";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ArrowIcon from "@/components/common/ArrowIcon";
import { isAxiosError } from "axios";

const FormContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05),
    0 4px 6px -4px rgb(0 0 0 / 0.05);
  width: 100%;
  max-width: 480px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #18181b;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const SignUpLinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  background-color: transparent;
  color: #18181b;
  border: 1px solid #e4e4e7;
  text-decoration: none;
  font-family: "Inter", sans-serif;

  &:hover {
    background-color: #f4f4f5;
    border-color: #a1a1aa;
  }
`;

const SubmitButton = styled(Button)`
  padding: 0;
  width: 50px;
  height: 50px;
`;

const SignInPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>({ mode: "onBlur" });
  const login = useAuthStore((state) => state.login);

  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    try {
      const response = await loginUser(data);
      await login(response.access_token);
      toast.success("Logged in successfully!");
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      if (isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
      } else {
        console.error("An unexpected error occurred during login:", error);
      }

      toast.error(errorMessage);
    }
  };

  return (
    <FormContainer>
      <Title>{t("signIn")}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder={t("username")}
          {...register("userName", { required: t("requiredField") as string })}
          error={errors.userName?.message}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          placeholder={t("password")}
          {...register("password", { required: t("requiredField") as string })}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <ButtonGroup>
          <SignUpLinkButton to="/signup">{t("signUp")}</SignUpLinkButton>
          <SubmitButton type="submit" variant="primary" disabled={isSubmitting}>
            <ArrowIcon />
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default SignInPage;
