let fileSystem = require('fs');

// Trie Data Structure related function 

// Global Variable
// ===============
// name of the "key" 
const _letter_Code_ = 'letter'
const _is_word_Completed_ = 'isCompleted'
const _child_array_ = 'child'

// File inporter 
const import_word_file = (wordfilename = '_words_100k_trie_structured_.txt') => {
    try {
        return JSON.parse(fileSystem.readFileSync(wordfilename,{encoding:'utf8', flag:'r'}))
    } catch (error) {
        console.log(error.errno)
    }
}

const words_trieStructured_m = import_word_file('_words_100k_trie_structured_.txt')


const extractWordsFunc = (arr = words_trieStructured_m) =>{
    let wordArray = [];
    let singleWord = '';
    const lookingThroughNodes = (array, sequence = 0) => array.map((element, index)=>{
        if(sequence === 0){ singleWord = '' }
        singleWord = singleWord.slice(0, sequence) + String.fromCharCode(element[_letter_Code_])

        if(Array.isArray(element[_child_array_]) && (element[_child_array_].length>0) ){
            lookingThroughNodes([...element[_child_array_]], sequence+1)
        }
        
        if(element[_is_word_Completed_]){
            wordArray = [...wordArray, singleWord]
        }
    })
    lookingThroughNodes([...arr])
    return wordArray;
}

let start = performance.now();
console.log(extractWordsFunc())
let timeTaken = performance.now() - start;
console.log("Total time taken (for Loop traverse) : " + timeTaken + " milliseconds");