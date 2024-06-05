import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ErrorMessage,
  PageContainer,
} from "../../components/MainComponents/MainComponents";
import { PageArea } from "./styled";
import { useState } from "react";
import OlxApi from "../../helpers/OlxApi";

export default function SignIn() {
  const api = OlxApi();
  
  const navigate = useNavigate();

  const { id } = useParams();

  alert(id)

  return (
    <PageContainer>
      <PageArea>
        
      </PageArea>
    </PageContainer>
  );
}
