import { Injectable } from '@angular/core';
import { WordCount } from '../Model/word.count';

@Injectable({
  providedIn: 'root',
})
export class TextServce {
    countWrod( bodyText : string) : WordCount[] {
        let pattern = /\w+/g;
        let  matchedWords = bodyText.toLowerCase().match(pattern);
        let result: WordCount[] = [];
    
        matchedWords!.reduce((stats, word) => {
            var foundIndex = result.findIndex(x => x.word == word);
            if (foundIndex != -1) {
              result[foundIndex].occurences = result[foundIndex].occurences + 1;
            } else {
              result.push({ word: word, occurences: 1 });
            }
             return result;
          }, {});
      
        return result.sort((a, b) => a.occurences >   b.occurences ? -1 : 1).splice(0,10);
      }
}