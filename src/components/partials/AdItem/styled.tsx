import styled from 'styled-components';

export const Item = styled.div`
  a {
    display: block;
    border: 1px solid #ccc;
    margin: 10px;
    text-decoration: none;
    border-radius: 10px;
    color: #000;

    .itemData {
      padding: 20px;
    }

    &:hover img {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
      border: 1px solid #ccc;
      background-color: #eee;
    }

    .itemImage {
      overflow: hidden;
      margin-bottom: 10px;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
    }

    .itemPrice {
      font-weight: bold;
      margin-bottom: 15px;
    }
  }
`;
