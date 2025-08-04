import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/common/Button";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
`;

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  return (
    <DashboardContainer>
      <WelcomeMessage>
        {t("welcome")}, {user?.firstName || "User"}!
      </WelcomeMessage>
      <p>{t("dashboard")}</p>
      <Button onClick={logout} style={{ backgroundColor: "#dc3545" }}>
        {t("logout")}
      </Button>
    </DashboardContainer>
  );
};

export default DashboardPage;
