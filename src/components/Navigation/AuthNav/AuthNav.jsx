import { useState } from "react";
import css from "./AuthNav.module.css";
import ModalWindow from "../../Modals/ModalWindow";
import { signUpWithGoogle } from "../../../utils/registration";

export default function AuthNav() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openModal = (signUp) => {
    setIsSignUp(signUp);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.navList}>
      <div>
        <button className={css.navLink} onClick={() => openModal(false)}>
          Login
        </button>
      </div>

      <div>
        <button className={css.navLink} onClick={() => openModal(true)}>
          SignUp
        </button>
      </div>

      <button onClick={signUpWithGoogle} className={css.navLink}>
        Sign In with Google
      </button>

      {isModalOpen && <ModalWindow closeModal={closeModal} isSignUp={isSignUp} />}
    </div>
  );
}
