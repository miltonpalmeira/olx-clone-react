import styled from 'styled-components';

export const Item = styled.div`
  a {
    display: block;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #eee;

    &:hover img {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
      border: 1px solid #ccc;
      background-color: #eee;
    }

    .itemImage {
      overflow: hidden;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
    }

    .itemName {
      font-weight: bold;
    }
  }
`;
