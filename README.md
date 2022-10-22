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
    12. findWordFrmPrefixFunc()
  
  
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
  
