import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [commentList, setCommentList] = useState(["Muithoo lokooo!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDataRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleSubmitNewComment(event: FormEvent) {
    event.preventDefault();
    setCommentList([...commentList, newCommentText]);
    setNewCommentText("");
  }

  function handleChangeNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function handleDeleteComment(commentToDelete: string) {
    const commentListWithoutDeletedOne = commentList.filter(
      (comment) => comment !== commentToDelete
    );

    setCommentList(commentListWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.user}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.userInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>
          {publishedDataRelativeToNow}
        </time>
      </header>

      <main className={styles.postContent}>
        {content.map((line) => {
          switch (line.type) {
            case "paragraph":
              return <p key={line.content}>{line.content}</p>;
            case "link":
              return (
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>
              );
          }
        })}
      </main>

      <form onSubmit={handleSubmitNewComment} className={styles.feedbackForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}
          onChange={handleChangeNewComment}
          onInvalid={handleNewCommentInvalid}
          placeholder="Deixe seu comentário"
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      {commentList.map((comment) => (
        <Comment
          key={comment}
          comment={comment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </article>
  );
}
