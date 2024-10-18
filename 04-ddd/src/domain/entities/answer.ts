import { randomUUID } from "crypto";

interface AnswerProps {
  authorId: string
  questionId: string
  content: string
 }

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;
  
  constructor(props: AnswerProps, id?: string) {
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
    this.id = id ?? randomUUID();
  }
}