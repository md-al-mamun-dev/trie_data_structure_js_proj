// this JS file purpose 
// ====================
// this js file's function is structured for taking word collection as input from .txt file
// and then put it into trie data structure, finally save it into .txt file

// Extra Note
// ==========
// All function's related to trie data structure saved into trieDataStructured_functions.js file
// including addWord() addWordFrmString() function used in this file

var fs = require('fs');

// Global Variable
// Those variable used for key of object 
const _letter_Code_ = 'letter'
const _is_word_Completed_ = 'isCompleted'
const _child_array_ = 'child'

//this is default array for all function 
let trieDataStructuredWords = [] 

let trieDataStructuredWords_100k = []
let trieDataStructuredWords_400k = []

function addWord(word, arr = JSON.parse(JSON.stringify([...trieDataStructuredWords]))){
    let isAdjacentIndexSmall = true;
    let adjacentIndexValue = 0;

    // Internal function which put data in sorted 
    function addNode(arr, letterCode, adjIndex , isSmall, isCompleted  ){
        // arr means array[] -  where we need to keep the data as object
        // letterCode - this value contain Integer Character Code of a letter
        // adjIndex - adjacent Index this will be the most nearest index of the letter
        // isSmall - is Small indecate is the adjacent index is small or big
        // isCompleted - contain boolean value, indicate is a word complited with this letter 

        let aLetterNode 
        isCompleted 
            ? aLetterNode = {[_letter_Code_]:letterCode, [_is_word_Completed_]:isCompleted}
            : aLetterNode = {[_letter_Code_]:letterCode, [_child_array_]:[]}
        
        // all those condition using for store the data in a sorted way.
        arr.length === 0 

            // There is no value exist yet. So, just add a value 
            ? arr = [aLetterNode]

            // The array has already some value, we will check isSmall either we put the value befor or after of **Adjacent Index** 
            : isSmall

                // value(letter) of adjacent Index is **smaller** then current value(letter)
                ? adjIndex===arr.length-1

                    // adjacent index is the last index of the array and                    
                    // so store data to the tail of the array 
                    ? arr = [...[...arr].splice(0, adjIndex+1), aLetterNode]

                    // adjacent index is situated anywere middle inside the array
                    // so split the Array within two segment and put the data just after Adjacent Index element in the middle of the array
                    : arr = [...[...arr].splice(0, adjIndex+1), aLetterNode , ...[...arr].splice(adjIndex+1, arr.length)]

                // value(letter) of adjacent Index is **Larger** then current value(letter)  
                : adjIndex===0

                    // Adjacent Index is the first value so we need to put node before all other value
                    ? arr = [aLetterNode , ...[...arr].splice(adjIndex, arr.length)]

                    // adjacent index is situated anywere middle inside the array
                    // so split the Array within two segment and put the data just before Adjacent Index element in the middle of the array
                    : arr = [...[...arr].splice(0, adjIndex) , aLetterNode , ...[...arr].splice(adjIndex, arr.length)]
        return arr
    }

    // This function used recursively, for the reason of 1.Binary search, 2.Traverse through Child Nodes
    //      1.Binary search - search a letter and if there is no letter found it will call addNode to include to the data structure
    //      2.Traversing To Child node: if letter is found it will traverse for another letter by calling itself again. 
    let searchLetter = function (arr, word, sequence = 0, start = 0, end = arr.length-1) {
                
        // Base Condition - When the child is not found the base condition will fulfill
        if (start > end) {

            // isCompleted default value
            let isComplete = false

            // when a word is completed the Last index of word will the sequence 
            //  is completed will be true 
            if(sequence === word.length-1){
                isComplete = true
            }

            // as letter is not found, we need to add the letter, and put it into the array
            arr =  addNode([...arr], letterCode = word[sequence].charCodeAt() , adjacentIndexValue, isAdjacentIndexSmall, isComplete)

            // use searchLetter function recursively for check the adding of letter is done and traverse through child
            arr = searchLetter([...arr], word, sequence)

            // finally return the array
            return arr
        };
            
        // Calculate middle index of the array
        let mid=Math.floor((start + end)/2);

        // When the letter is found on array this condition will meet
        if (arr[mid][_letter_Code_] === word[sequence].charCodeAt()){

            //Condition meet when letters of the word has not finished
            // Eventually traverse through child Node
            if(sequence<word.length - 1){
                
                // if there is no child Array, Add a child:[] array
                if(!arr[mid].hasOwnProperty([_child_array_])){ arr[mid][_child_array_] = [] }

                // Traverse for next letter inside Child Nodes using recursion of searchLetter Function
                arr[mid][_child_array_] = searchLetter([...arr[mid][_child_array_]], word, sequence+1)
            }

            // this condition indicate it is the last letter of the word
            if(sequence === word.length - 1){

                // add "isCompleted = true" for indicating a complete word
                if(!arr[mid].hasOwnProperty([_is_word_Completed_])){ arr[mid][_is_word_Completed_] = true }
            }
            
            return arr
        };            

        // Looking for Greater value containing Half of the arrary
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            isAdjacentIndexSmall = false;
            adjacentIndexValue = mid
            // recursivly looking -- Binary search
            return searchLetter(arr, word, sequence, start, mid-1);
        }else{
            // Looking for Smaller value containing Half of the arrary
            isAdjacentIndexSmall = true;
            adjacentIndexValue = mid; 
            // recursivly looking -- Binary search
            return searchLetter(arr, word, sequence, mid+1, end);
        }
    }
    return searchLetter(arr, word)
}

function addWordFrmString( wordString, arr = JSON.parse(JSON.stringify([...trieDataStructuredWords]))){

    let wordsArray = wordString.split(/\s|\n|,|\.|!/gi).filter(x=>x!='')


    wordsArray = wordsArray.map(element => { return element.toLowerCase(); });
    wordsArray = [...new Set(wordsArray)];
    // console.log(wordsArray)
    console.log('Total word count before destructure: ' + wordsArray.length)
    for (let i = 0; i < wordsArray.length; i++) {
        arr = addWord(wordsArray[i], arr)
    }
    return arr
}

const addWordFromStringFunc = (wordStr, arr = []) =>{
    // use to make a new copy of an array 
    // this function will not mutate original arry
    // this will return a complete new arry after chaing 
    let newArr = JSON.parse(JSON.stringify([...arr]));
    // wordStr.split(/\s|\n|,|\.|!/gi) --Regular expression use for seperate out every word 
    // map(e=>e.toLowerCase()) -- used for take each word into lower case 
    [...new Set(wordStr.split(/\s|\n|,|\.|!/gi).filter(x=>x!='').map(e=>e.toLowerCase()))].map((element, index)=>{
        newArr = addWord(element, newArr)        
    })
    return newArr;
}

function storeWordCollection(wordStrings , filename = ' trieDeStructuredWord.txt ', testName= 'default Test', arr = JSON.parse(JSON.stringify([...trieDataStructuredWords]))){
    let start = performance.now();
    arr = addWordFromStringFunc(wordStrings, [...arr])
    fs.writeFile(filename, JSON.stringify([...arr]) , err => {
        if (err) {
        console.error(err);
        }else{
            console.log(` ${filename} \t-\t file written successfully `)
        }
    })
    return arr;
}

const  words_100K_plainText = fs.readFileSync('_words_100k_string_.txt',{encoding:'utf8', flag:'r'})
const  words_400K_plainText = fs.readFileSync('_words_400k_string_.txt',{encoding:'utf8', flag:'r'})

storeWordCollection(words_100K_plainText, '_words_100k_trie_structured_.txt', 'Test Phase: 0', arr = JSON.parse(JSON.stringify([...trieDataStructuredWords_100k])))
storeWordCollection(words_400K_plainText, '_words_400k_trie_structured_.txt', 'Test Phase: 1', arr = JSON.parse(JSON.stringify([...trieDataStructuredWords_400k])))