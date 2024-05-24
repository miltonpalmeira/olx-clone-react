import { HeaderArea } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, isLogged } from "../../../helpers/authHandlers";

export default function Header() {
  let logged = isLogged();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate('/');
  }

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            {/* SEP - SUA ENCOMENDA PREFERIDA */}
            <span className="logo-1">S</span>
            <span className="logo-2">E</span>
            <span className="logo-3">P</span>
          </Link>
        </div>
        <nav>
          <ul>
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to="/post-an-ad" className="button">
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
            {!logged && (
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
}
