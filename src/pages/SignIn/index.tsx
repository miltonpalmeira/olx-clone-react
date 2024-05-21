import { Link } from "react-router-dom";
import {
  PageContainer,
  PageTitle,
} from "../../components/MainComponents/MainComponents";
import { PageArea } from "./styled";

export default function SignIn() {
  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        <form>
          <label className="area">
            <div className="area--title">Email</div>
            <div className="area--input">
              <input type="email" />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input type="password" required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input type="checkbox" className="check" />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button>Entrar</button>
            </div>
          </label>
        </form>
      </PageArea>
      <Link to={`/`}>Home</Link>
    </PageContainer>
  );
}
