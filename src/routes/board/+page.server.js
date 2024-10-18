// import { wordGroups } from '../constants;

import axios from 'axios';
import { wordGroups } from '../../constants';
import { getBaseBoard, getBoardById } from '$lib/services/speech-board.service';

// /** @type {import('./$types').PageLoad} */
/** @type {import('./$types').PageServerLoad} */

export async function load({ params, url }) {
    console.log('params: ', params);
    // console.log('url: ', url.searchParams.get('boardid'));
    const boardId = url.searchParams.get('boardid');
    const baseBoard = boardId ?
        await getBoardById(boardId) :
        await getBaseBoard();
    if (baseBoard === null) {
        return {}; // or handle the null case appropriately
    }
    return { ...baseBoard };

};


