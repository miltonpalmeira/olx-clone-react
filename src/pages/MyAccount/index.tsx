import * as C from "./styled";
import { useEffect, useState, useRef } from "react";
import { StateList, UserInfo } from "../../types";
import OlxApi from "../../helpers/OlxApi";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../helpers/authHandlers";
import { PageContainer } from "../../components/MainComponents/MainComponents";
import { PageArea, Warning } from "./styled";

const initialUser = {
  name: "",
  state: "",
  email: "",
  image: "",
};

export default function Profile() {
  const api = OlxApi();
  const navigate = useNavigate();
  const fileField = useRef<HTMLInputElement>(null);
  const [states, setStates] = useState([]);

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUser);

  const [InitialEmail, setInitialEmail] = useState("");
  const [Initialname, setInitialName] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [stateUser, setStateUser] = useState("");
  const [image, setImage] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageColor, setMessageColor] = useState("#000");
  const [displayModal, setDisplayModal] = useState(["none", "0"]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const getUserInfo = async () => {
      const json = await api.getUserInfo(navigate);
      setUserInfo(json);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      const json = await api.getStates(navigate);
      setStates(json);
    };
    getStates();
  }, []);

  useEffect(() => {
    setEmail(userInfo.email);
    setName(userInfo.name);
    setInitialEmail(userInfo.email);
    setInitialName(userInfo.name);
    // if (userInfo.image) {
    //   dispatch({ type: "SET_IMAGE", payload: userInfo.image });
    // }
  }, [userInfo]);

  const editUser = async () => {
    setDisplayModal(["none", "0"]);
    setDisable(true);
    setMessage("");

    if (name == "") {
      setMessage("Preencha o nome");
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }
    if (email == "") {
      setMessage("Preencha o email");
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }
    if (stateUser == "") {
      setMessage("Selecione um Estado");
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }

    const formData = new FormData();
    formData.append("state", stateUser);

    if (name !== Initialname) {
      formData.append("name", name);
    }
    if (email !== InitialEmail) {
      formData.append("email", email);
    }

    const json = await api.editUser(formData);

    if (!json.error) {
      setMessage("Alterações salvas com sucesso");
      setMessageColor("#408140");
      setTimeout(() => {
        doLogout();
        window.location.href = "/";
      }, 2000);
    } else {
      setMessage(json.error);
      setMessageColor("#c9242e");
    }
    setDisable(false);
  };

  const editPassword = async () => {
    setDisplayModal(["none", "0"]);
    setDisable(true);
    setMessagePassword("");

    if (password == "") {
      setMessagePassword("Preencha a senha atual");
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }

    if (newPassword == "" || newPassword.length < 8) {
      setMessagePassword("Preencha a nova senha corretamente");
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("newPassword", newPassword);

    const json = await api.editUser(formData);

    if (json.error.newPassword) {
      setMessagePassword(json.error.newPassword.msg);
      setMessageColor("#c9242e");
      setDisable(false);
      return;
    }

    if (!json.error) {
      setMessagePassword("Senha alterada com sucesso");
      setMessageColor("#408140");
      setTimeout(() => {
        doLogout();
        window.location.href = "/";
      }, 2000);
    } else {
      setMessagePassword(json.error);
      setMessageColor("#c9242e");
    }
    setDisable(false);
  };

  const prevImage = () => {
    const formData = new FormData();
    let fields = fileField.current as HTMLInputElement;
    let files = fields.files as FileList;
    if (files.length > 0) {
      formData.append("images", files[0]);
    } else {
      return;
    }

    let imageUrl = URL.createObjectURL(files[0]);
    setImage(imageUrl);
  };

  const addImage = async () => {
    setMessagePassword("");
    setMessageColor("");
    setDisable(true);

    const formData = new FormData();
    let fields = fileField.current as HTMLInputElement;
    let files = fields.files as FileList;
    if (files.length > 0) {
      formData.append("image", files[0]);
    } else {
      return;
    }

    const json = await api.editUser(formData);
    if (!json.error && json.image) {
    //   dispatch({ type: "SET_IMAGE", payload: json.image });
      setMessagePassword("Imagem atualizada");
      setMessageColor("#408140");
    } else {
      setMessagePassword(json.error);
      setMessageColor("#c9242e");
    }
    setDisable(false);
  };

  const deleteImage = async () => {
    // dispatch({ type: "SET_IMAGE", payload: "/images/default-profile.jpg" }); // Reset reducer
    setMessagePassword("");
    setMessageColor("");
    setDisable(true);

    let fields = fileField.current as HTMLInputElement;
    fields.value = "";

    if (image || userInfo.image) {
      const formData = new FormData();
      formData.append("delProfileImage", "delete");

      const json = await api.editUser(formData);

      if (!json.error) {
        setMessagePassword("Imagem Removida");
        setMessageColor("#faad14");
        setImage("");
      } else {
        setMessagePassword(json.error);
        setMessageColor("#c9242e");
      }
      setDisable(false);
    }
  };

  return (
    <PageContainer>
      <Warning display={displayModal[0]}>
        <div className="box--warn">
          <div className="warning">
            <img src="/icons/alert.png" alt="" />
            <div className="warn">Aviso</div>
          </div>
          <div className="message-box">
            <span>
              Para sua segurança, você será desconectado após as alterações.
            </span>
            <span>Certifique-se de possuir as informações de acesso.</span>
            <span>Tem certeza que deseja salvar as alterações? </span>
          </div>
          <div className="box--buttons">
            <button
              className="confirm"
              onClick={(e) =>
                displayModal[1] == "1" ? editUser() : editPassword()
              }
            >
              Salvar alterações
            </button>
            <button
              className="cancel"
              onClick={(e) => setDisplayModal(["none", "0"])}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Warning>

      <PageArea color={messageColor}>
        <div className="title--area">
          <h2>Meu Cadastro</h2>
          <div className="options">
            <div
              className={currentSection == 0 ? "active" : "desactive"}
              onClick={() => setCurrentSection(0)}
            >
              Informações de Cadastro
            </div>
            <div
              className={currentSection == 1 ? "active" : "desactive"}
              onClick={() => setCurrentSection(1)}
            >
              Foto de perfil
            </div>
            <div
              className={currentSection == 2 ? "active" : "desactive"}
              onClick={() => setCurrentSection(2)}
            >
              Alteraçao de senha
            </div>
          </div>
        </div>
        <hr />
        {currentSection === 0 && (
          <div className="box--info">
            <span className="title-box">Dados da conta</span>
            {message && <div className="message">{message}</div>}
            <form action="" method="PUT">
              <label>
                <span>Nome Completo</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={disable}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disable}
                />
              </label>
              <label>
                <span>Estado</span>
                <select
                  onChange={(e) => setStateUser(e.target.value)}
                  disabled={disable}
                >
                  <option value=""></option>
                  {states.map((i: StateList, k) => (
                    <option value={i.id} key={k}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </label>
            </form>
            <button
              className="send"
              disabled={disable}
              onClick={() => setDisplayModal(["flex", "1"])}
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </PageArea>

      {currentSection === 1 && (
        <PageArea color={messageColor}>
          <div className="box--info">
            <span className="title-box">Alterar Foto de Perfil</span>
            {messagePassword && (
              <div className="message">{messagePassword}</div>
            )}
            <form action="" method="PUT">
              <div className="currentImage">
                {/* <img
                  src={image ? image : state.userImage}
                  alt="default-image"
                /> */}
              </div>
              <div className="input--area">
                <label htmlFor="file">
                  <img src="/icons/plus.png" alt="adicionar" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    ref={fileField}
                    onChange={prevImage}
                  />
                </label>
              </div>
              <div className="input--area">
                <label className="delete-label">
                  <div className="del" onClick={deleteImage}>
                    <img src="/icons/trash.png" alt="delete" />
                    <span>Excluir Imagem</span>
                  </div>
                </label>
              </div>
            </form>
            <button
              className="send"
              disabled={disable}
              onClick={() => addImage()}
            >
              Salvar Alterações
            </button>
          </div>
        </PageArea>
      )}

      {currentSection === 2 && (
        <PageArea color={messageColor}>
          <div className="box--info">
            <span className="title-box">Aterar Senha</span>
            {messagePassword && (
              <div className="message">{messagePassword}</div>
            )}
            <form action="" method="PUT">
              <label>
                <span>Senha Atual</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disable}
                />
              </label>
              <label>
                <span>
                  Nova Senha <small>Mínimo 8 caracteres</small>
                </span>
                <div className="vs-password">
                  {!visiblePassword && (
                    <>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={disable}
                      />
                      <img
                        src="/icons/show.png"
                        alt="show"
                        onClick={() => setVisiblePassword(true)}
                      />
                    </>
                  )}
                  {visiblePassword && (
                    <>
                      <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={disable}
                      />
                      <img
                        src="/icons/hide.png"
                        alt="hide"
                        onClick={() => setVisiblePassword(false)}
                      />
                    </>
                  )}
                </div>
              </label>
            </form>
            <button
              className="send"
              disabled={disable}
              onClick={() => setDisplayModal(["flex", "2"])}
            >
              Salvar Alterações
            </button>
          </div>
        </PageArea>
      )}
    </PageContainer>
  );
}
