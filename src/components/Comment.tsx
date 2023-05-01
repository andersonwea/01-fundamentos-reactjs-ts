import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

import { ThumbsUp, Trash } from "@phosphor-icons/react";

interface CommentProps {
  comment: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ comment, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(comment);
  }

  function handleLikeComment() {
    setLikeCount((state) => state + 1);
  }

  return (
    <article>
      <div className={styles.container}>
        <Avatar
          src={"https://github.com/srandersondev.png"}
          hasBorder={false}
        />
        <div className={styles.comment}>
          <header>
            <div className={styles.userInfo}>
              <strong>
                Anderson silva <span>(você)</span>
              </strong>
              <time title="Comentado em 26/04/2023 ás 18:37:00">
                Cerca de 1h atrá
              </time>
            </div>

            <button
              className={styles.commentDelete}
              onClick={handleDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>

          <div className={styles.commentContent}>{comment}</div>
        </div>
      </div>
      <button className={styles.commentLike} onClick={handleLikeComment}>
        <ThumbsUp />
        Aplaudir
        <span>{likeCount}</span>
      </button>
    </article>
  );
}
