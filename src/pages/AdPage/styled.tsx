import styled from "styled-components";

interface FakeProps {
  height?: number;
}

export const Fake = styled.div<FakeProps>`
  background-color: #ddd;
  height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;

  .box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #999;
    margin-bottom: 20px;
  }

  .box--padding {
    padding: 10px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;
    padding: 10px;
    .adImage {
      padding: 10px;
    }
    .adName {
      padding: 10px;
    }
    .adInfo {
      padding: 10px;
      .adPrice {
        margin-bottom: 20px;
      }
      .adDescription {
      }
    }
  }

  .rightSide {
    width: 250px;
  }
`;
