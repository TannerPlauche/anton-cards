// import speechBoardModel from "$lib/models/speech-board.model";
import { createSpeechBoard } from "$lib/services/speech-board.service";
import { json } from "@sveltejs/kit";
import { wordGroups } from "../constants";

// export const actions = {
//     'create-board': async (boardName: string) => {
//         console.log('creating a board with the name: ', boardName);
//         const speechBoard = await createSpeechBoard(boardName);
//         return speechBoard;
//     }

// }

export async function POST({ request }: any) {
    const body = await request.json();
    console.log('body: ', body);
    const boardName = body.name;
    console.log('creating a board with the name: ', boardName);
    const speechBoard = await createSpeechBoard(boardName);
    return json(speechBoard);
}