import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { registerUser } from "@/api/auth";
import { SignUpCredentials } from "@/types";
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

const SignInLinkButton = styled(Link)`
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

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<SignUpCredentials> = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful! Please sign in.");
      navigate("/signin");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }

      toast.error(errorMessage);
    }
  };

  return (
    <FormContainer>
      <Title>{t("signUp")}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder={t("firstName")}
          {...register("firstName", { required: t("requiredField") as string })}
          error={errors.firstName?.message}
          disabled={isSubmitting}
        />
        <Input
          type="text"
          placeholder={t("lastName")}
          {...register("lastName", { required: t("requiredField") as string })}
          error={errors.lastName?.message}
          disabled={isSubmitting}
        />
        <Input
          type="text"
          placeholder={t("username")}
          {...register("userName", {
            required: t("requiredField") as string,
            minLength: { value: 3, message: t("usernameMinLength") },
          })}
          error={errors.userName?.message}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          placeholder={t("password")}
          {...register("password", {
            required: t("requiredField") as string,
            minLength: { value: 8, message: t("passwordMinLength") },
          })}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <ButtonGroup>
          <SignInLinkButton to="/signin">{t("signIn")}</SignInLinkButton>
          <SubmitButton type="submit" variant="primary" disabled={isSubmitting}>
            <ArrowIcon />
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default SignUpPage;
