import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WordCount } from './Model/word.count';
import { RestaurantService } from './Services/restaurant.srvice';
import { TextServce } from './Services/text.servce';

describe('AppComponent', () => {

  let textService = new  TextServce();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
       imports: [HttpClientModule], 
        providers: [RestaurantService, TextServce]
    }).compileComponents();
  });

  it(`#countWrod#_Should_Match_Mock_Data `, () => {
    let mocResult: WordCount[] = [];
    let mocText = "Hello, I am hello. am I?";
       
    mocResult.push(   { word: 'hello', occurences: 2 });
    mocResult.push( { word: 'i', occurences: 2 });
    mocResult.push(  { word: 'am', occurences: 2 });

    const funcResult = textService.countWrod(mocText);
    
    expect(mocResult).toEqual(funcResult);
  });

  it(`#countWrod#_Should_Should_Not_Return_More_Than_10_Recored `, () => {
    let mocText = "Hello, I am hello. am I? This matcher recursively checks the equality of all fields, rather than checking for object identity. Click to expand. Most used jest functions";

    const funcResult = textService.countWrod(mocText);
    
    expect(10).toEqual(funcResult.length);
  });

 
});