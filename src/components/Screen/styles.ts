import styled from "styled-components";

export const ContainerScreen = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  position: relative;
`;

export const Sidebar = styled.aside<{ $openIsMenu: string }>`
  width: 240px;
  height: 100%;
  padding: 20px 0;

  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 0;
  left: ${({ $openIsMenu }) => $openIsMenu};
  z-index: 1000;

  transition: left 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    left: ${({ $openIsMenu }) => $openIsMenu};
  }
`;

export const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  & > img {
    width: 100px;
    height: auto;
  }

  & > h1 {
    margin-top: 10px;
    font-size: 1.5rem;
    font-weight: bolder;

    background: linear-gradient(90deg, #3a7bd5, #3a6073);
    background-clip: text;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Header = styled.header<{ $hasSidebar?: boolean }>`
  width: ${({ $hasSidebar }) => ($hasSidebar ? "calc(100% - 240px)" : "100%")};
  height: 72px;
  padding: 4px 15px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: ${({ $hasSidebar }) => ($hasSidebar ? "240px" : "0")};
  z-index: 999;

  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
    left: 0px;
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > h1 {
    font-size: 1.4rem;
    font-weight: bolder;
    background: linear-gradient(90deg, #3a7bd5, #3a6073);
    background-clip: text;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Main = styled.main<{ $hasSidebar?: boolean }>`
  flex: 1;
  padding: 16px;
  padding-top: 90px;
  background-color: #fff;

  margin-left: ${({ $hasSidebar }) => ($hasSidebar ? "240px" : "0")};
  width: ${({ $hasSidebar }) => ($hasSidebar ? "calc(100% - 240px)" : "100%")};

  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const ContainerPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;

  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};

  transition: opacity 0.3s ease-in-out;
`;
