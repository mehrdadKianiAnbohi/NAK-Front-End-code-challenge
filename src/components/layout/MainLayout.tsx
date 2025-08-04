import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f5; /* پس‌زمینه طوسی روشن برای محتوا */
  padding: 1rem;
`;

const MainLayout = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default MainLayout;
