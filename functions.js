// ==============================================================================
// ********************* Trie Data Structure related function *******************
// ==============================================================================

// Global Variable, Those variable used for key of object
const _letter_Code_ = 'letter'
const _is_word_Completed_ = 'isCompleted'
const _child_array_ = 'child'


// Variable Which will contain Word as Trie Data Structured
let trieDataStructuredWords = []

// ************************************ functions ---------------------------------

// Add a single Word to Trie Data Structure
// recommendation -- do not use if insted use addWordFrmString(), ----- working same 
function addWord(word, defaultArr = []){
    let arr = JSON.parse(JSON.stringify([...defaultArr]))
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

// addWordFrmString() function is dependend on addWord() function.
// do not use this function without putting addWord() function implementation details before...
// it will take string as input parameter, 
// put every single word into an array, 
// and take all element to tire structure variable.
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

// This function is same as addWordFrmString() function 
// but this funciton use map() function instead of for loop 
// recommendation of using addWordFromStringFunc() insted of addWordFrmString() 
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

//isExist() function return a boolean value wheather a word is exist or not, 
            // if exist return - true, 
            // if not return - false
function isExist(word, array =[...trieDataStructuredWords]){
     const arr = [...array]

    let searchLetter = function (arr, word, sequence = 0, start = 0, end = arr.length-1) {
        let result = true

        // Base Condition - When the child is not found the base condition will fulfill
        if (start > end) {
            return false;
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
                result = result && searchLetter([...arr[mid][_child_array_]], word, sequence+1)
            }

            // this condition indicate it is the last letter of the word
            if(sequence === word.length - 1){
                // add "isCompleted = true" for indicating a complete word
                if(!arr[mid].hasOwnProperty([_is_word_Completed_])){ 
                    if(arr[mid][_is_word_Completed_] === true ){
                        return result && true
                    }else{
                        return false
                    }                 
                }
            }
            
            return result
        };            

        // Looking for Greater value containing Half of the arrary
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            return searchLetter(arr, word, sequence, start, mid-1);
        }else{
            // Looking for Smaller value containing Half of the arrary
            return searchLetter(arr, word, sequence, mid+1, end);
        }
    }

    return searchLetter(arr, word)
}

// deleteWord() function will remove a Word from Trie Data Structure
function deleteWord( word, defaultArr = []){
    let arr = JSON.parse(JSON.stringify([...defaultArr]))
    const finalResult = goThroughWords( arr, word[0], 0, 0, arr.length-1)
    
    // recursive function for looking trough Trie
    function goThroughWords(arr, letter, sequence, start, end ){
            if(start > end){
                return arr
            }

            let mid = Math.floor((start+end)/2)

            if((arr[mid][_letter_Code_])===letter.charCodeAt()){

                if((( sequence < word.length-1 
                    && arr[mid].hasOwnProperty([_child_array_]))
                    && Array.isArray(arr[mid][_child_array_]))
                    && arr[mid][_child_array_].length>0){
                        sequence = sequence + 1
                        arr[mid][_child_array_] = goThroughWords([...arr[mid][_child_array_]], word[sequence], sequence, start = 0, end =  arr[mid][_child_array_].length-1)           
                }

                // the main delete operation
                if(sequence === word.length - 1
                    && (arr[mid].hasOwnProperty([_is_word_Completed_]) 
                    && (typeof(arr[mid][_is_word_Completed_]) === 'boolean' 
                    && arr[mid][_is_word_Completed_] === true)) ){
                    arr[mid] = { ...arr[mid], [_is_word_Completed_]: false }
                }

                // remove empty child
                if(arr[mid].hasOwnProperty([_child_array_]) 
                    && (!(Array.isArray(arr[mid][_child_array_])) || arr[mid][_child_array_].length < 1) ){
                        let { [_child_array_]:value, ...objWithoutChild } = arr[mid];
                        arr[mid] = objWithoutChild 
                    }
                // remove isCompleted value
                if(arr[mid].hasOwnProperty([_is_word_Completed_]) && arr[mid][_is_word_Completed_] === false ){
                    let { [_is_word_Completed_]:value , ...objWithoutCompleted } = arr[mid];
                    arr[mid] = objWithoutCompleted  
                }

                // remove unnecessary element
                if(!arr[mid].hasOwnProperty([_is_word_Completed_]) && !arr[mid].hasOwnProperty([_child_array_]) ){
                    arr = [...arr].filter((_, i) => i !== mid);
                }
                    return arr
            }

            if(arr[mid][_letter_Code_]>letter.charCodeAt())
                return goThroughWords([...arr], letter, sequence, start, end = mid-1);
            else
                return goThroughWords([...arr], letter, sequence, start = mid + 1, end)
        }

        // console.log(result);
        return finalResult;
}

// Extract All Words from a Trie Data Structure word Collection
function extractWord(arr = [...trieDataStructuredWords]){
    let wordArray = [];
    let singleWord = '';
    putWordToArr([...arr])

    // This function will extract out every word from trie data structure
    function putWordToArr(arr, sequence = 0){

        // for loop is used for looking every peace of information
        for (let arrIndex = 0; arrIndex < arr.length; arrIndex++){

            if (arr[arrIndex].hasOwnProperty([_letter_Code_])) {
                
                // Initialize a Word from the Index/Sequence of 0
                if(sequence === 0){singleWord = ''}

                // Add every single letter to the **singleWord** variable for every word 
                singleWord = singleWord.slice(0, sequence) + String.fromCharCode(arr[arrIndex][_letter_Code_])

                // Add the word to an arr(wordArray[]) When the single word is Completed. 
                // i.e. Add word When isCompleted value is true 
                if(arr[arrIndex][_is_word_Completed_]){wordArray = [...wordArray, singleWord]}
            }

            if(Array.isArray(arr[arrIndex][_child_array_]) ){
                if (arr[arrIndex][_child_array_].length>0) {
                    // Recursive use of function for traversing through child nodes of letter
                    putWordToArr([...arr[arrIndex][_child_array_]], sequence+1)
                }
            }
        }
    }

    // returning the arr which contain all Word inside the **Trie Data Structure** 
    return wordArray;
}

// same function as extractWord() and return same result 
// this function uses JS ES6-- map() function instead of for loop 
// recommend to use extractWordsFunc() instead of extractWord
const extractWordsFunc = (arr = [...words_trieStructured]) =>{
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

// findWordFrmPrefix() --- this function will looking for word from the prefix 
// return a array of word with that prefix
// this function is similar to findSafxFrmPrefix()
//              but it return full word intead of safix 
function findWordFrmPrefix(word, arr = [...trieDataStructuredWords]){
    let wordTempArr = [];
    function miningWord(arr, word){
        let singleWord = '';
        putWordToArray(arr, word)
        function putWordToArray(arr, word, sequence = 0){
            for (let arrayIndex = 0; arrayIndex < arr.length; arrayIndex++){

                if (arr[arrayIndex].hasOwnProperty([_letter_Code_])) {
                    if(sequence === 0){singleWord = ''}
                    singleWord = singleWord.slice(0, sequence) + String.fromCharCode(arr[arrayIndex][_letter_Code_])
                    if(arr[arrayIndex][_is_word_Completed_]){wordTempArr = [...wordTempArr, word + singleWord]}
                }

                if(Array.isArray(arr[arrayIndex].child)){
                    if (arr[arrayIndex].child.length>0) {
                        putWordToArray([...arr[arrayIndex][_child_array_]], word, sequence+1)
                    }
                }

            }
        }
    }

    let findFPrfx = (arr, word, sequence = 0, start = 0, end = arr.length-1) =>{ 
                
        // Base Condition
        if (start > end) {
            miningWord(arr, word.slice(0, sequence))
            return false
        };
        
        let mid=Math.floor((start + end)/2);
        if (arr[mid][_letter_Code_] === word[sequence].charCodeAt()){
            let hasChildProperty = arr[mid].hasOwnProperty([_child_array_]);
                    
            if(hasChildProperty && sequence<word.length-1){
                sequence = sequence + 1
                findFPrfx([...arr[mid][_child_array_]], word, sequence)
                return true
            }else if(hasChildProperty && sequence >= word.length-1){
                miningWord(arr[mid][_child_array_], word)
                return true
            }
        };
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            return findFPrfx(arr, word, sequence, start, mid-1);
        }else { 
            return findFPrfx(arr, word, sequence, mid+1, end);
        }
    }
    findFPrfx(arr, word)
    return wordTempArr
}
// findSafxFrmPrefix() --- this function will looking for safix from the prefix
// return a array of safix of word from that prefix
// this function is similar to findWordFrmPrefix()
//              but it return Safix only,
function findSafxFrmPrefix(word, arr = [...trieDataStructuredWords]){

    let wordTempArr = [];

    function miningWord(arr){
        let singleWord = '';
        putWordToArray(arr)
        function putWordToArray(arr, sequence = 0){
            for (let arrayIndex = 0; arrayIndex < arr.length; arrayIndex++){
                if (arr[arrayIndex].hasOwnProperty([_letter_Code_])) {
                    if(sequence === 0){singleWord = ''}
                    singleWord = singleWord.slice(0, sequence) + String.fromCharCode(arr[arrayIndex][_letter_Code_])
                    if(arr[arrayIndex][_is_word_Completed_]){wordTempArr = [...wordTempArr, singleWord]}
                }
                if(Array.isArray(arr[arrayIndex][_child_array_])){
                    if (arr[arrayIndex][_child_array_].length>0) {
                        putWordToArray([...arr[arrayIndex][_child_array_]], sequence+1)
                    }
                }            
            }
        }
    }

    let findFPrfx = (arr, word, sequence = 0, start = 0, end = arr.length-1) =>{
        if (start > end) {
            miningWord(arr)
            return false
        };
        let mid=Math.floor((start + end)/2);
        if (arr[mid][_letter_Code_] === word[sequence].charCodeAt()){
            let hasChildProperty = arr[mid].hasOwnProperty([_child_array_]);
                    
            if(hasChildProperty && sequence<word.length-1){
                sequence = sequence + 1
                findFPrfx([...arr[mid][_child_array_]], word, sequence)
                return true
            }else if(hasChildProperty && sequence >= word.length-1){
                miningWord(arr[mid][_child_array_])
                return true
            }
        };
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            return findFPrfx(arr, word, sequence, start, mid-1);
        }
        else { 
            return findFPrfx(arr, word, sequence, mid+1, end);
        }
    }

    findFPrfx(arr, word)
    return wordTempArr
}


// those are ES-6 version
// Used
//      => Array function
//      => map() method

const findWordFrmPrefixFunc = (word, arr = [...words_trieStructured])=>{
    let wordTempArr = [];
    let singleWord = '';
    
    const miningWord = (array, sequence = 0) => array.map((element)=>{
        
        if(sequence === 0){ singleWord = '' }

        singleWord = singleWord.slice(0, sequence) 
                    + String.fromCharCode(element[_letter_Code_])

        if(element[_is_word_Completed_]){ 
            wordTempArr = [...wordTempArr, word + singleWord] }

        if(Array.isArray(element[_child_array_]) && (element[_child_array_].length>0) ){ 
            miningWord([...element[_child_array_]], sequence+1) }        

    })

    const findFPrfx = (arr, word, sequence = 0, start = 0, end = arr.length-1) =>{ 
                
        // Base Condition
        if (start > end) {
            miningWord(arr)
            return false
        };
        
        let mid=Math.floor((start + end)/2);
        if (arr[mid][_letter_Code_] === word[sequence].charCodeAt()){
            let hasChildProperty = arr[mid].hasOwnProperty([_child_array_]);
                    
            if(hasChildProperty && sequence<word.length-1){
                sequence = sequence + 1
                findFPrfx([...arr[mid][_child_array_]], word, sequence)
                return true
            }else if(hasChildProperty && sequence >= word.length-1){
                miningWord(arr[mid][_child_array_])
                return true
            }
        };
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            return findFPrfx(arr, word, sequence, start, mid-1);
        }else { 
            return findFPrfx(arr, word, sequence, mid+1, end);
        }
    }
    findFPrfx(arr, word)
    return wordTempArr
}

const findSafxFrmPrefixFunc = (word, arr = [...words_trieStructured])=>{

    let wordTempArr = [];
    let singleWord = '';
    const miningWord = (array, sequence = 0) => array.map((element)=>{
        
        if(sequence === 0){ singleWord = '' }

        singleWord = singleWord.slice(0, sequence) 
                    + String.fromCharCode(element[_letter_Code_])

        if(element[_is_word_Completed_]){ 
            wordTempArr = [...wordTempArr, singleWord] }

        if(Array.isArray(element[_child_array_]) && (element[_child_array_].length>0) ){ 
            miningWord([...element[_child_array_]], sequence+1) }        

    })

    const findFPrfx = (arr, word, sequence = 0, start = 0, end = arr.length-1) =>{
        if (start > end) {
            miningWord(arr)
            return false
        };
        let mid=Math.floor((start + end)/2);
        if (arr[mid][_letter_Code_] === word[sequence].charCodeAt()){
            let hasChildProperty = arr[mid].hasOwnProperty([_child_array_]);
                    
            if(hasChildProperty && sequence<word.length-1){
                sequence = sequence + 1
                findFPrfx([...arr[mid][_child_array_]], word, sequence)
                return true
            }else if(hasChildProperty && sequence >= word.length-1){
                miningWord(arr[mid][_child_array_])
                return true
            }
        };
        if(arr[mid][_letter_Code_] > word[sequence].charCodeAt()){
            return findFPrfx(arr, word, sequence, start, mid-1);
        }
        else { 
            return findFPrfx(arr, word, sequence, mid+1, end);
        }
    }

    findFPrfx(arr, word)
    return wordTempArr
}


