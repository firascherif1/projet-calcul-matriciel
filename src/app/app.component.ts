import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algo_num';
  // matrix: number[][] = [];
  // rows: number = 0;
  // columns: number = 0;

  // fillMatrix() {
  //   this.matrix = [];
  //   for (let i = 0; i < this.rows; i++) {
  //     this.matrix[i] = [];
  //     for (let j = 0; j < this.columns; j++) {
  //       // Vous pouvez initialiser la matrice avec des valeurs par défaut ici si nécessaire
  //       this.matrix[i][j] = 0;
  //     }
  //   }
  // }
  // matrix: number[][] = [];
  // rows: number = 0;
  // columns: number = 0;

  // generateMatrix() {
  //   this.matrix = [];
  //   for (let i = 0; i < this.rows; i++) {
  //     this.matrix[i] = [];
  //     for (let j = 0; j < this.columns; j++) {
  //       // Initialisez la matrice avec des zéros ou une valeur par défaut si nécessaire
  //       this.matrix[i][j]=0;
  //     }
  //   }
  // }



  // matrixForm: FormGroup;
  // matrixA: number[][] = [];
  // matrixB: number[][] = [];
  // resultMatrix: number[][] = [];

  // constructor(private formBuilder: FormBuilder) {
  //   this.matrixForm = this.formBuilder.group({
  //     rows: [0, [Validators.required, Validators.min(1)]],
  //     columns: [0, [Validators.required, Validators.min(1)]]
  //   });
  // }

  // generateMatrices() {
  //   const rowsControl = this.matrixForm.get('rows');
  //   const columnsControl = this.matrixForm.get('columns');
  
  //   if (rowsControl && columnsControl && rowsControl.valid && columnsControl.valid) {
  //     const rows = rowsControl.value;
  //     const columns = columnsControl.value;
  
  //     this.matrixA = this.generateEmptyMatrix(rows, columns);
  //     this.matrixB = this.generateEmptyMatrix(rows, columns);
  //     this.resultMatrix = this.generateEmptyMatrix(rows, columns);
  //   }
  // }
  

  // multiplyMatrices() {
  //   for (let i = 0; i < this.matrixA.length; i++) {
  //     for (let j = 0; j < this.matrixA[i].length; j++) {
  //       this.resultMatrix[i][j] = this.matrixA[i][j] * this.matrixB[i][j];
  //     }
  //   }
  // }

  // private generateEmptyMatrix(rows: number, columns: number): number[][] {
  //   return Array.from({ length: rows }, () => Array(columns).fill(0));
  // }*************



  // matrixForm: FormGroup;
  // matrix: number[][] = [];

  // constructor(private formBuilder: FormBuilder) {
  //   this.matrixForm = this.formBuilder.group({
  //     rows: [0, [Validators.required, Validators.min(1)]],
  //     columns: [0, [Validators.required, Validators.min(1)]]
  //   });
  // }

  // generateMatrix() {
  //   const rowsControl = this.matrixForm.get('rows');
  //   const columnsControl = this.matrixForm.get('columns');
  
  //   if (rowsControl && columnsControl && rowsControl.valid && columnsControl.valid) {
  //     const rows = rowsControl.value;
  //     const columns = columnsControl.value;
  
  //     this.matrix = Array.from({ length: rows }, () => Array(columns).fill(0));
  //   }
  // }

  
}

