# SpellChecker using Trie Data Structure in JavaScript
 
# Topic related 
    1. Programming Language: JavaScript
    2. Data Structure - trie
    3. Searching method - Binary Search

# Short Description 
This project contain some functions, which is deal with trie data structure using JavaScript, this also used binary search for searching inside node

# Functions 
    1. addWord()
    2. addWordFrmString()
    3. addWordFromStringFunc()
    4. isExist()
    5. deleteWord()
    6. extractWord()
    7. extractWordsFunc()
    8. findWordFrmPrefix()
    9. findSafxFrmPrefix()
    10. findSafxFrmPrefixFunc()
    11. findWordFrmPrefixFunc()
  
  
   # addWord()
      Parameters (2) 
         a. word (mendatory)
         b. array (optional)
  Functionality
  ===
 This addWord() function will take an word(mendatory) and an array(optional) parameter. This array could be an empty array or any array previously keept any word destructured into trie data structured in the same way. 
This funciton will destructure the words into tri data structured (i.e - store word into array as trie data structure) and return an array of tri data structured object nodes. if optional array parameter provided, the function will make a new copy of array and then add word into that array and finally return that new array.
 => if the word is already stored inside trie nodes, the function will not make any change.
 => function will also store data sorted way inside each node. the sorted order is mantained accroding to character coding. 
 
   # addWordFrmString() & addWordFromStringFunc()
      Parameters (2) 
         a. text / string (i.e A complete sentence) - (mendatory)
         b. array (optional)
         
      Dependency 
         a. addWord() function
         b. Global Variabls 

  Functionality
  ===
  Both addWordFrmString() and addWordFromStringFunc() will return same result
  Those funtion will take a string of words (i.e. a complete sentence), pull out each word and add those word one by one, into array of trie structured node.
  this function use addWord() function to do this 

  [ addWordFrmString() & addWordFromStringFunc() ] vs addword() 
  ==
  The main difference between those funcitons:
  - the addWord() function can take take only a single word as input parameter, 
  - addWordFrmString() or addWordFromStringFunc() can take multiple word as a single string input. 
  - rest of the functionality is same
 
 addWordFrmString() vs addWordFromStringFunc()
 ==
 accroding to result both function has no difference 
 but there is a slight differece,
 - the addWordFrmString() use JavaScript for loop for iterating into each word
 - the addWordFromStringFunc() use new JS ES6 map() function for iteration, 
 for those difference there is a slite difference of working performance between two function
 
      "  addWordFromStringFunc() function is recommended to use  "
      
   isExist() 
   ==
       Parameters (2) 
         a. word - (a single word)
         b. array - of trie data structure (optional)
       Dependency 
         a. array 
         b. Global Variabls
         
Functionality
  ===
  isExit() function take a word as input parameter, return boolean value wheather the word is exist into the array or not exist 
  input parameter array is optional, but if the array does not given to the second parameter, the function will search the word inside default array, 
  if the input prameter is given, the function will search the value inside the array has given as prameter, not into the default array of the application. 
  return value - true means the word is exist, and false means the word is not exist. 
  
   deleteWord()
   ==
       Parameters (2) 
         a. word - (a single word)
         b. array - of trie data structure (optional)
       Dependency 
         a. array 
         b. Global Variabls
 
Functionality
===
  deleteWord() function take a word as first parameter, and delete it from the array, 
  but not from the original array, it simply just copy an array then delete word from that array, and finally return that array. 
  if the optional second parameter is given the delete functionality workd accroding to that array. and if no parameter is given it take default array as the parameter. 
  
   extractWord() & extractWordsFunc()
   ==
       Parameters  (1) 
         a. array - of trie data structure (optional)
       Dependency 
         a. array 
         b. Global Variabls

Functionality
===
  accroding to result both function will return same result
both extractWord() and extractWordsFunc() functions pull out all word from trie data structured array, optionaly it take an array as input parameter, 
if the parameter is given - the funciton will look for the all word from that array, if not given the function will look for words from default array
those function will return a single dimention array of every word destructured into the array of trie data structure. The returnd array will sorted alphabetically  

extractWord() vs extractWordsFunc()
==
 Functionality
 ===
 accroding to result both function has no difference 
 but there is a slight differece,
 - the extractWord() use JavaScript for loop for iterating into each word
 - the extractWordsFunc() use new JS ES6 map() function for iteration, 
 for those difference there is a slite difference of working performance between two function
 
      "  extractWordsFunc() function is recommended to use  "  - as it will perform better. 
      
findWordFrmPrefix() & findSafxFrmPrefixFunc()
==
       Parameters  (2) 
         a. Prefix of any word (mendatory)
         b. array - of trie data structure (optional)
       Dependency 
         a. array 
         b. Global Variabls
 Functionality
 ===
  Both function will give the same result, but works differently accroding to their functionality
  recommend to use "" findSafxFrmPrefixFunc() ""
  takes input of prefix of any word in the first peremeter, 
optionally takes array as second argument of the function, if second peremeter is provided, the function will look for the word inside this argument, not into the global array, if the second peremeter is not given, the function will look for word of having that prefix into the default array storage of word of trie data structure. 
