import { HeaderArea } from "./Header";
import { Link } from "react-router-dom";
import { isLogged } from "../../../helpers/authHandlers";

export default function Header() {
  let logged = isLogged();

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
                  <Link to="/logout">Sair</Link>
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
