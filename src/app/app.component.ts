import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from './Services/restaurant.srvice';
import { Restourant } from './Model/restourant';
import { WordCount } from './Model/word.count';
import { TextServce } from './Services/text.servce';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'word-count';
  myForm!: FormGroup;
  result: WordCount[] = [];
  isBusy: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    public restaurantService: RestaurantService,
    public textServce: TextServce,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      text: [''],
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      source: ['input']
    })
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.result = [];
    this.isSubmitting = true;

    if (form.value.source === 'input') {
      this.result = this.textServce.countWrod(form.value.text);
    } else if (form.value.source === 'url' && this.f.url.valid) {
      this.loadRestourant(form.value.url);
    }
  }

  resetFormAndCleatTable() {
    this.f['text'].setValue('');
    this.f['url'].setValue('');
    this.isSubmitting = false;
    this.isBusy = false;
    this.result = [];
  }

  loadRestourant(url: string) {
    this.isBusy = true;
    this.restaurantService.getRestourant(url)
    .pipe(first())
    .subscribe({
      next: (res: Restourant) => {
        this.result = this.textServce.countWrod(res.description);
        this.isBusy = false;
      },
      error: () => {
        this.isBusy = false;
      }
    });
  }

}