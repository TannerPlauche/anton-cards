// const mongoose = require('mongoose');
import mongoose from 'mongoose';
/**  WORD GROUP STRUCTURE EXAMPLE
{
    groupName: 'Basic',
    words: [
        { word: 'when', fileName: 'when.svg' },
        { word: 'who', fileName: 'who.svg' },
        { word: 'why', fileName: 'why.svg' },
        { word: 'yes', fileName: 'yes.svg' },
        { word: 'no', fileName: 'no.svg' },
        { word: 'stop', fileName: 'stop.svg' },
    ]
},
 */

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true
        },
        wordGroups: Array
    },
    {
        strict: false,
        collection: 'speechBoards'
    }
);

console.log('mongoose.models *******', mongoose.models)
const SpeechBoard =  mongoose.model('speechBoard', userSchema);
export default mongoose?.models.speechBoard || SpeechBoard;

