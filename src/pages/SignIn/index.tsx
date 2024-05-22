import { Link, Redirect } from "react-router-dom";
import {
  PageContainer,
  PageTitle,
} from "../../components/MainComponents/MainComponents";
import { PageArea } from "./styled";
import { useState } from "react";
import OlxApi from '../../helpers/OlxApi';
import { doLogin } from "../../helpers/authHandlers";

export default function SignIn() {
  const api = OlxApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setDisabled(true);
    
    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    }
    else {
      doLogin(json.token, rememberPassword);      
      <Redirect to="/" />
    }
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Email</div>
            <div className="area--input">
              <input type="email" disabled={disabled} />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input type="password" required disabled={disabled} />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input type="checkbox" className="check" disabled={disabled} />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit" disabled={disabled}>Entrar</button>
            </div>
          </label>
        </form>
      </PageArea>
      <Link to={`/`}>Home</Link>
    </PageContainer>
  );
}