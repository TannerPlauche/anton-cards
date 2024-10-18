// import { wordGroups } from '../constants;

import axios from 'axios';
import { wordGroups } from '../../constants';
import { getBaseBoard, getBoardById, getBoards } from '$lib/services/speech-board.service';

/** @type {import('./$types').PageServerLoad} */

export async function load() {
    const boards = await getBoards();
    boards.forEach((board: any) => {
        board._id = board._id.toString();
    });
    console.log('boards#####: ', boards);
    if (!boards?.length) {
        return { boards: [] }; // or handle the null case appropriately
    }


    return { boards };

};


