import styles from "./Profile.module.css";
import { Avatar } from "./Avatar";
import { PencilSimpleLine } from "@phosphor-icons/react";

export function Profile() {
  return (
    <aside className={styles.profile}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=50"
      />
      <Avatar src={"https://github.com/srandersondev.png"} />
      <div className={styles.userInfo}>
        <strong>Anderson Silva</strong>
        <span>Web Developer</span>
      </div>

      <footer className={styles.editProfile}>
        <a href="#">
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
