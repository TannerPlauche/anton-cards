// import connectDB from '../lib/connectDB';
import { connectDB } from '$lib/db/connectDb';
import SpeechBoard from '../models/speech-board.model';
import * as mongoose from 'mongoose';
import { wordGroups } from '../../constants';

export async function getBaseBoard() {
    await connectDB()

    console.log('getting base board');
    const baseBoard: any = await SpeechBoard.findOne({ name: 'BASE' }).lean();
    console.log('baseBoard: ', baseBoard);
    if (baseBoard && !Array.isArray(baseBoard)) {
        baseBoard._id = baseBoard._id.toString();
    }
    return baseBoard;
}

export async function getBoards() {
    await connectDB()

    console.log('getting base board');
    const boards: any = await SpeechBoard.find().lean();
    return boards;
}

export async function getBoardById(id: string) {
    await connectDB()

    console.log('getting base board');
    const baseBoard: any = await SpeechBoard.findById(id).lean();
    console.log('baseBoard: ', baseBoard);
    if (baseBoard && !Array.isArray(baseBoard)) {
        baseBoard._id = baseBoard._id.toString();
    }
    return baseBoard;
}


export const createSpeechBoard = async (boardName: string) => {

    if (!boardName) {
        return {
            errors: ['Speech board must have a unique name']
        };
    }

    // check for existing boards
    const existingBoard = await SpeechBoard.findOne({ name: boardName }, { _id: true }).lean();
    console.log('existingBoards: ', existingBoard);

    if (existingBoard) {
        return {
            errors: ['Speech board must have a unique name']
        };
    }

    const boardData = {
        name: boardName,
        wordGroups: wordGroups,
    };

    const speechBoard = await SpeechBoard.create(boardData);

    console.log('speechBoard: ', speechBoard);
    return speechBoard;
};
