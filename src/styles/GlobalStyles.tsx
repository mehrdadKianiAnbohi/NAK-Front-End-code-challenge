import { Global, css } from "@emotion/react";

const styles = css`
  /* Add Inter font from Google Fonts */
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    background-color: #18181b;
    color: #18181b;
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
