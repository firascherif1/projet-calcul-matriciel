import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentBackground="";
  ngOnInit(): void {
    this.getRandomBackground();
  }
  backgrounds: string[] = [
    'assets/images/back22.jpg',
    'assets/images/back1.jpg',
    'assets/images/back3.jpg',
    // Ajoutez autant d'URLs que nécessaire
  ];
  myimage="assets/images/back22.jpg"
  getRandomBackground() {
    const randomIndex = Math.floor(Math.random() * this.backgrounds.length);
    this.currentBackground = this.backgrounds[randomIndex];
  }

  // matrixRows = 3;
  // matrixColumns = 3;
  // matrixForm!: FormGroup;

  // constructor(private formBuilder: FormBuilder) {}

  // ngOnInit(): void {
  //   this.initializeForm();
  // }

  // initializeForm(): void {
  //   this.matrixForm = this.formBuilder.group({});
  //   for (let i = 0; i < this.matrixRows; i++) {
  //     for (let j = 0; j < this.matrixColumns; j++) {
  //       const controlName = this.getFormControlName(i, j);
  //       this.matrixForm.addControl(controlName, this.formBuilder.control(''));
  //     }
  //   }
  // }

  // getFormControlName(i: number, j: number): string {
  //   return `matrix_${i}_${j}`;
  // }

  // getFormControl(i: number, j: number): FormControl {
  //   return this.matrixForm.get(this.getFormControlName(i, j)) as FormControl;
  // }

  // submitMatrix(): void {
  //   console.log('Submitted Matrix:', this.matrixForm.value);
  // }

  // range(n: number): number[] {
  //   return Array.from({ length: n }, (_, index) => index);
  // }
  
  // Expose the range method to the template
//  range = this.range.bind(this);
}


