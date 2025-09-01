import { Button } from "antd";
import styled from "styled-components";

export const ContainerButtonsTable = styled.div`
  display: flex;
  gap: 12px;
`;

export const ButtonsTable = styled(Button)`
  svg {
    font-size: 16px;
  }
`;

export const ContainerTable = styled.div`
  width: 100%;
  height: 100%;
  max-height: 670px;

  .ant-table-content {
    overflow: auto !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .ant-table-content::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;
