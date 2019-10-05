import { Parser } from "src/enums";
import { IParserReply } from "src/interfaces";

export interface IReadlineParser {
    emit: (event: Parser, data: IParserReply) => boolean;
}