import { Component, OnInit } from '@angular/core';
import {  ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matrix, EigenvalueDecomposition } from 'ml-matrix';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent implements OnInit {

  myimage="assets/images/back22.jpg"
  myicon:string="assets/images/icon_home_algo.png";
  reload:string="assets/images/reload_algo.png";
  matrixForm: FormGroup;
  matrixA: number[][] = [];
  vectorB: number[] = [];
  resultVector: number[] = [];
  @ViewChild('id') res!: ElementRef;
  //id de matrice A
  @ViewChild('id_denseA') denseA!: ElementRef;
  @ViewChild('titre_matA') matA!: ElementRef;
  @ViewChild('id_denseA_inf') denseA_inf!: ElementRef;
  @ViewChild('id_denseA_sup') denseA_sup!: ElementRef;
  @ViewChild('id_denseA_bande_inf') denseA_bande_inf!: ElementRef;
  @ViewChild('id_denseA_bande_sup') denseA_bande_sup!: ElementRef;
  @ViewChild('id_bande') bande!: ElementRef;
  @ViewChild('id_denseB') vect!: ElementRef;
  constructor(private formBuilder: FormBuilder) {
    this.matrixForm = this.formBuilder.group({
      rows: [ [Validators.required, Validators.min(1)]],
      columns: [ [Validators.required, Validators.min(1)]],
      mA: [[Validators.required, Validators.min(1), Validators.max(this.matrixA.length-1)]],
      maxiter:[100,[Validators.required, Validators.min(1), Validators.max(this.matrixA.length-1)]]
    });
  }

  generateMatrixAndVector() {
    const rowsControl = this.matrixForm.get('rows');
    const columnsControl = this.matrixForm.get('columns');
  
    if (rowsControl && columnsControl && rowsControl.valid && columnsControl.valid) {
      const rows = rowsControl.value;
      const columns = columnsControl.value;
  
      this.matrixA = this.generateEmptyMatrix(rows, columns);
      this.vectorB = Array(columns).fill(null);
      this.resultVector = Array(rows).fill(null);
    }
  }

  
  @ViewChild('in') log!: ElementRef;
  aff(){
    const log=this.log.nativeElement;
    log.style.display="block";
    
  }
  
  private generateEmptyMatrix(rows: number, columns: number): number[][] {
    return Array.from({ length: rows }, () => Array(columns).fill(null));
  }












  

  ngOnInit(): void {
  }
  matricesA = [
    { name: 'Matrice dense' },
    { name: 'Matrice triangulaire superieure' },
    { name: 'Matrice triangulaire inferieure' },
    { name: 'Matrice bande'},
    {name: 'Matrice demi-bande inferieur'},
    {name: 'Matrice demi-bande superieur'}

    // ... Ajoutez vos matrices avec leurs propriétés ici
  ];
  
  
  selectedMatrixA=""; // Assurez-vous que le type correspond à celui de vos valeurs de matrice
  selectedMatrixB="";

  // Méthode appelée lorsque la sélection change
  onMatrixASelectionChange() {
    
    if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthodes d’élimination de Gauss"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Décomposition LU"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Elimination de Gauss-Jordan"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode d’élimination de Gauss avec pivotage partiel"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Cholesky"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Jacobi"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Gauss-Seidel"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "block";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice triangulaire superieure"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseA_sup.nativeElement;
        r.style.display = "block";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice triangulaire inferieure"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseA_inf.nativeElement;
        r.style.display = "block";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "none";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice Bande"){
      
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.bande.nativeElement;
        r.style.display = "block";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "none";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice demi-bande inferieur"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseA_bande_inf.nativeElement;
        r.style.display = "block";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "none";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m6 = this.denseA_bande_sup.nativeElement;
        m6.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixA=="Matrice demi-bande superieur"){
      this.generateMatrixAndVector();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseA_bande_sup.nativeElement;
        r.style.display = "block";
        const m1 = this.denseA.nativeElement;
        m1.style.display = "none";
        const m2 = this.denseA_sup.nativeElement;
        m2.style.display = "none";
        const m3 = this.denseA_inf.nativeElement;
        m3.style.display = "none";
        const m4 = this.bande.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseA_bande_inf.nativeElement;
        m5.style.display = "none";
        const mat = this.matA.nativeElement;
        mat.style.display = "block";
      });
    }


  }
  algo_choix(){
    // matrice dense * vecteur :
  if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthodes d’élimination de Gauss"){
    this.resolDenseGaussSym(this.matrixA.map(row => [...row]),[...this.vectorB]);
  }
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Décomposition LU"){
    this.resolDenseLU();
  }
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Elimination de Gauss-Jordan"){
    this.resolDenseGaussJordan(this.matrixA.map(row => [...row]),[...this.vectorB]);
  }
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode d’élimination de Gauss avec pivotage partiel"){
    this.resolDenseGauss_AvecPP(this.matrixA.map(row => [...row]),[...this.vectorB]);
  }
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Cholesky"){
    this.resolDenseCholesky();
  }
  //resolution itérative dense
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Gauss-Seidel"){
    this.test('s');
  }
  else if(this.selectedMatrixA=="Matrice Dense" && this.selectedMatrixB=="Méthode de Jacobi"){
    this.test('j');
  }
  //MATRICE BANDE
  else if(this.selectedMatrixA=="Matrice Bande" && this.selectedMatrixB=="Décomposition LU"){
    this.resolBandeLU();
  }
  else if(this.selectedMatrixA=="Matrice Bande" && this.selectedMatrixB=="Elimination de Gauss-Jordan"){
    this.resolBandeGaussJordan(this.matrixA.map(row => [...row]),[...this.vectorB]);
  }
  else if(this.selectedMatrixA=="Matrice Bande" && this.selectedMatrixB=="Méthode d’élimination de Gauss avec pivotage partiel"){
    this.resolBandeGauss_AvecPP(this.matrixA.map(row => [...row]),[...this.vectorB]);
  }
  else if(this.selectedMatrixA=="Matrice Bande" && this.selectedMatrixB=="Méthode de Cholesky"){
    this.resolBandeCholesky(this.matrixA.map(row => [...row]),[...this.vectorB],this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice Bande" && this.selectedMatrixB=="Méthodes d’élimination de Gauss"){
    this.resolBandeGaussSym(this.matrixA.map(row => [...row]),[...this.vectorB],this.matrixForm.get('mA')?.value);
  }
  //system triangulaire
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" ){
    this.solveUpperTriangularSystem(this.matrixA,this.vectorB);
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure"){
    this.solveLowerTriangularSystem(this.matrixA,this.vectorB);
  }
  // else if(this.selectedMatrixA=="Matrice Bande"&&this.selectedMatrixB=="Matrice Bande"){
  //   this.multiplicationmatriceBande_Vecteur(this.matrixForm.get('mA')?.value);
  // }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur"){
    this.solveLowerBandedTriangularSystem(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur"){
    this.solveUpperBandedTriangularSystem(this.matrixForm.get('mA')?.value);
  }
  }
  reloadPage() {
    window.location.reload();
  }
m=2;
isWithinBande(i: number, j: number): boolean {
  return Math.abs(i - j) <= this.matrixForm.get('mA')?.value;
}
///// Resolution linéaire:
//Résolution d’un système linéaire triangulaire inferieur 
solveLowerTriangularSystem(matrixA:number[][],vectorB:number[]):number[] {
  const r=this.res.nativeElement;
  r.style.display="block";
  const n =matrixA.length;

  

  for (let i = 0; i < n; i++) {
    this.resultVector[i] = vectorB[i];
      for (let j = 0; j < i; j++) {
        this.resultVector[i] -= matrixA[i][j] * this.resultVector[j];
      }
      this.resultVector[i] = this.resultVector[i] / matrixA[i][i];
  }

 return this.resultVector;
}
//Résolution d’un système linéaire triangulaire superieur
solveUpperTriangularSystem(matrixA:number[][],vectorB:number[]){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = matrixA.length;

  

    for (let i = n - 1; i >= 0; i--) {
        this.resultVector[i] = vectorB[i];
        for (let j = i + 1; j < n; j++) {
            this.resultVector[i] -= matrixA[i][j] * this.resultVector[j];
        }
        this.resultVector[i] = this.resultVector[i] / matrixA[i][i];
    }

    
}

//Résolution d’un système linéaire triangulaire inferieur demi-bande
solveLowerBandedTriangularSystem(m: number){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;

   

    for (let i = 0; i < n; i++) {
        this.resultVector[i] = this.vectorB[i];
        for (let j = Math.max(0, i - m); j < i ; j++) {
            this.resultVector[i] -= this.matrixA[i][j] * this.resultVector[j];
        }
        this.resultVector[i] = this.resultVector[i] / this.matrixA[i][i];
    }

    
}

//Résolution d’un système linéaire triangulaire superieur demi-bande
 solveUpperBandedTriangularSystem(m: number){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;


    for (let i = n - 1; i >= 0; i--) {
        this.resultVector[i] = this.vectorB[i];
        for (let j = i + 1; j < Math.min(i + m + 1, n); j++) {
            this.resultVector[i] -= this.matrixA[i][j] * this.resultVector[j];
        }
        this.resultVector[i] = this.resultVector[i] / this.matrixA[i][i];
    }

   
}

// ngOnInit(): void {
//   }
//************************************************ */
// resolDenseGauss(matrixA:number[][],vectorB:number[]) {
//   const n = this.matrixA.length;
//   // const matrixA =this.matrixA.map(row => [...row]);
//   // const vectorB=[...this.vectorB];
//   for(let k = 0; k < n-1; k++){
//       for(let i = k+1; i < n; i++){
//           matrixA[i][k] /= matrixA[k][k];
//           for(let j = k+1; j < n; j++){
//               matrixA[i][j] -= matrixA[i][k] * matrixA[k][j];
//           }
//           vectorB[i] -= matrixA[i][k] * vectorB[k];
//       }
//   }
//   this.solveUpperTriangularSystem(matrixA, vectorB);
// }
resolDenseGaussSym(matrixA:number[][],vectorB:number[]){
  if(this.estMatriceSymetrique(matrixA) && this.estMatriceDefiniePositive(matrixA)){
    
  const n = this.matrixA.length;
  let cst :number;
  for(let k = 0; k < n-1; k++){
      for(let i = k+1; i < n; i++){
          cst= matrixA[k][i] / matrixA[k][k];
          for(let j = i; j < n; j++){
              matrixA[i][j] -= cst * matrixA[k][j];
          }
          vectorB[i] -= cst * vectorB[k];
      }
  }
  this.solveUpperTriangularSystem(matrixA, vectorB);

  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ");
  
}
}



resolDenseLU() {
  if(this.estMatriceDecomposable(this.matrixA)){
    const n = this.matrixA.length;
  const L: number[][] = new Array(n);
  const U: number[][] = new Array(n);    
  for (let i = 0; i < n; i++){
      L[i] = new Array(n);
      U[i] = new Array(n);
      L[i][i] = 1;
      for (let j = 0; j <= i - 1 ; j++){
          L[i][j] = this.matrixA[i][j];
          for (let k = 0; k < j ; k++)
          {
              L[i][j] = L[i][j] - L[i][k] * U[k][j];
          }
          L[i][j] = L[i][j] / U[j][j];
      }
      for (let j = i; j < n; j++)
      {
      
          U[i][j] = this.matrixA[i][j];
          for (let k = 0; k < i; k++)
          {
              U[i][j] = U[i][j] - L[i][k] * U[k][j];
          }
      }   
  }
  
  this.solveUpperTriangularSystem(U,this.solveLowerTriangularSystem(L, this.vectorB));

  }
  else{
    alert("Votre Matrice n'est pas Décomposable LU");

  }
  
}


resolDenseGaussJordan(matrixA:number[][],vectorB:number[]){
  if(this.estMatriceSymetrique(matrixA) && this.estMatriceDefiniePositive(matrixA)){
    
    const n = matrixA.length;
  for(let i = 0; i < n; i++){
      this.resultVector[i] = vectorB[i];
  }
  for(let k = 0; k < n; k++)
  {
      for(let j = k + 1;j < n; j++)
      {
          matrixA[k][j] /= matrixA[k][k];
      }
      this.resultVector[k] /= matrixA[k][k];
      for(let i = 0; i < k; i++)
      {
          for(let j = k + 1; j < n; j++)
          {
              matrixA[i][j] -= matrixA[i][k] * matrixA[k][j];
          }
          this.resultVector[i] -= matrixA[i][k] * this.resultVector[k];
      }
      for(let i = k + 1; i < n; i++)
      {
          for(let j = k + 1; j < n; j++)
          {
              matrixA[i][j] -= matrixA[i][k] * matrixA[k][j];
          }
          this.resultVector[i] -= matrixA[i][k] * this.resultVector[k];
      }
  }

  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ");

  }
  
  
}



resolDenseCholesky(){
  if(this.estMatriceSymetrique(this.matrixA) && this.estMatriceDefiniePositive(this.matrixA)){
    const n = this.matrixA.length;
  let L: number[][] = new Array(n);
  let T: number[][] = new Array(n);
  for(let i = 0; i < n; i++ ){
      L[i] = new Array(n);
      T[i] = new Array(n);
      for(let j = 0; j < n; j++){
          L[i][j] = 0;
          T[i][j] = 0;
      }
  }
  for (let j = 0; j < n; j++)
  {
      
      L[j][j] = this.matrixA[j][j];
      for (let k = 0; k <= j - 1; k++)
      {
          L[j][j] = L[j][j] - L[j][k] * L[j] [k];
      }
      L[j][j] = Math.sqrt(L[j][j]);
      for (let i = j + 1; i < n; i++)
      {
          L[i][j] = this.matrixA[i][j];
          for (let k = 0;k <= j - 1; k++)
          {
              L[i][j] = L[i][j] - L[i][k] * L[j] [k];
          }
          L[i][j] = L[i][j] / L[j][j];
      }
  }
  T = this.matrice_transpose(L);
  
  this.solveUpperTriangularSystem(T,this.solveLowerTriangularSystem(L, this.vectorB));

  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ");

  }
}

matrice_transpose(matrixA:number[][]):number[][]{
  const n = matrixA.length;
  let T: number[][] = new Array(n);
  for(let j = 0; j < n; j++){
      T[j] = new Array(n);
      for(let i = 0; i < n; i++){
              T[j][i] = matrixA[i][j];
      }
  }
  return T;
}

//resolution par Méthode d’élimination de Gauss avec pivotage partiel
resolDenseGauss_AvecPP(matrixA: number[][], vectorB:number[]){
  const n = matrixA.length;

  //ajouter le vecteur a la matrice
  for (let i = 0; i < n; i++) {
      matrixA[i].push(vectorB[i]);
  }
  for (let i = 0; i < n; i++) {
      // Recherche de l'élément pivot
      let pivotRow = i;
      for (let j = i + 1; j < n; j++) {
          if (Math.abs(matrixA[j][i]) > Math.abs(matrixA[pivotRow][i])) {
              pivotRow = j;
          }
      }

      // Échange de lignes si nécessaire
      if (pivotRow !== i) {
          [matrixA[i], matrixA[pivotRow]] = [matrixA[pivotRow], matrixA[i]];
      }

      // Élimination de Gauss
      for (let j = i + 1; j < n; j++) {
          const factor = matrixA[j][i] / matrixA[i][i];
          for (let k = i; k < n + 1; k++) {
              matrixA[j][k] -= factor * matrixA[i][k];
          }
      }
  }
  //vecteur apres les changement
  for (let i = 0; i < n; i++) {
      vectorB[i] = matrixA[i][n];
  }
  //résolution
  this.solveUpperTriangularSystem(matrixA, vectorB);
  
}
//resolution Bande
resolBandeGaussSym(matrixA:number[][],vectorB:number[],m:number){
  if(this.estMatriceSymetrique(matrixA) && this.estMatriceDefiniePositive(matrixA)){
    const r=this.res.nativeElement;
  r.style.display="block";
  const n = this.matrixA.length;
  let cst:number;
    for(let k = 0; k < n; k++){
        for(let i = k+1; i < Math.min(k+m+1,n); i++){
            cst = matrixA[k][i]/matrixA[k][k];
            for(let j =i; j < Math.min(k+m+1,n); j++){
                matrixA[i][j] -= cst*matrixA[k][j];
            }
            vectorB[i] -= cst*vectorB[k];
        }
    }
  this.solveUpperTriangularSystem(matrixA, vectorB);

  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ")

  }
  
}
resolBandeGauss_AvecPP(matrixA: number[][], vectorB:number[]){
  const n = matrixA.length;

  //ajouter le vecteur a la matrice
  for (let i = 0; i < n; i++) {
      matrixA[i].push(vectorB[i]);
  }
  for (let i = 0; i < n; i++) {
      // Recherche de l'élément pivot
      let pivotRow = i;
      for (let j = i + 1; j < n; j++) {
          if (Math.abs(matrixA[j][i]) > Math.abs(matrixA[pivotRow][i])) {
              pivotRow = j;
          }
      }

      // Échange de lignes si nécessaire
      if (pivotRow !== i) {
          [matrixA[i], matrixA[pivotRow]] = [matrixA[pivotRow], matrixA[i]];
      }

      // Élimination de Gauss
      for (let j = i + 1; j < n; j++) {
          const factor = matrixA[j][i] / matrixA[i][i];
          for (let k = i; k < n + 1; k++) {
              matrixA[j][k] -= factor * matrixA[i][k];
          }
      }
  }
  //vecteur apres les changement
  for (let i = 0; i < n; i++) {
      vectorB[i] = matrixA[i][n];
  }
  //résolution
  this.solveUpperTriangularSystem(matrixA, vectorB);
  
}
resolBandeLU() {
  if(this.estMatriceDecomposable(this.matrixA)){
    const n = this.matrixA.length;
  const L: number[][] = new Array(n);
  const U: number[][] = new Array(n);    
  for (let i = 0; i < n; i++){
      L[i] = new Array(n);
      U[i] = new Array(n);
      L[i][i] = 1;
      for (let j = 0; j <= i - 1 ; j++){
          L[i][j] = this.matrixA[i][j];
          for (let k = 0; k < j ; k++)
          {
              L[i][j] = L[i][j] - L[i][k] * U[k][j];
          }
          L[i][j] = L[i][j] / U[j][j];
      }
      for (let j = i; j < n; j++)
      {
      
          U[i][j] = this.matrixA[i][j];
          for (let k = 0; k < i; k++)
          {
              U[i][j] = U[i][j] - L[i][k] * U[k][j];
          }
      }   
  }
  
  this.solveUpperTriangularSystem(U,this.solveLowerTriangularSystem(L, this.vectorB));

  }
  else{
    alert("Votre Matrice n'est pas Décomposable LU ");

  }
  
}


resolBandeGaussJordan(matrixA:number[][],vectorB:number[]){
  if(this.estMatriceSymetrique(matrixA) && this.estMatriceDefiniePositive(matrixA)){
    
    const n = matrixA.length;
  for(let i = 0; i < n; i++){
      this.resultVector[i] = vectorB[i];
  }
  for(let k = 0; k < n; k++)
  {
      for(let j = k + 1;j < n; j++)
      {
          matrixA[k][j] /= matrixA[k][k];
      }
      this.resultVector[k] /= matrixA[k][k];
      for(let i = 0; i < k; i++)
      {
          for(let j = k + 1; j < n; j++)
          {
              matrixA[i][j] -= matrixA[i][k] * matrixA[k][j];
          }
          this.resultVector[i] -= matrixA[i][k] * this.resultVector[k];
      }
      for(let i = k + 1; i < n; i++)
      {
          for(let j = k + 1; j < n; j++)
          {
              matrixA[i][j] -= matrixA[i][k] * matrixA[k][j];
          }
          this.resultVector[i] -= matrixA[i][k] * this.resultVector[k];
      }
  }

  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ");

  }
  
  
}
resolBandeCholesky(matrix:number[][],vector:number[],m:number){
  if(this.estMatriceSymetrique(matrix) && this.estMatriceDefiniePositive(matrix)){
    const r=this.res.nativeElement;
  r.style.display="block";
    const n=matrix.length;
  let L: number[][] = new Array(n);
    let T: number[][] = new Array(n);
  for(let i = 0; i < n; i++ ){
      L[i] = new Array(n);
      T[i] = new Array(n);
      for(let j = 0; j < n; j++){
          L[i][j] = 0;
          T[i][j] = 0;
      }
  }
  for (let j=0;j<n;j++)
  {
      // L[j] = new Array(n);
      // T[j] = new Array(n);
      L[j][j]=matrix[j][j];
      for (let k=0;k<=j-1; k++)
      {
          L[j][j]=L[j][j]-L[j][k]*L[j] [k];
      }
      L[j][j]=Math.sqrt(L[j][j]);
      for (let i = j + 1; i < Math.min(j + m + 1,n); i++)
      {
          L[i][j]=matrix[i][j];
          for (let k=0;k<=j-1;k++)
          {
              L[i][j]=L[i][j]-L[i][k]*L[j] [k];
          }
          L[i][j]=L[i][j]/L[j][j];
      }
  }
  T=this.matrice_transpose(L);
  
   this.solveUpperTriangularSystem(T,this.solveLowerTriangularSystem(L, vector));
  }
  else{
    alert("Votre Matrice n'est pas symétrique définie positive ")

  }
}
//Méthodes itérative 

    //methode de jocobi
    jacobi(matrixA: number[][], vectorB: number[], max_iter: number = 100, epsilon: number = 1e-6):number[]{
      if(this.convergenceJacobi(matrixA)){
        const r=this.res.nativeElement;
        r.style.display="block";
      const n = matrixA.length;
      
      let x: number[] = [];
      let max = 0;
      let k = 0;
      for(let i = 0; i < n; i++){
          this.resultVector[i] = 0;
      }
      while(true){
          for(let i = 0; i < n; i++){
              x[i] = this.resultVector[i];
          }
          for(let i = 0; i < n; i++){
              let s = vectorB[i];
              for(let j = 0; j < i; j++){
                  s = s - matrixA[i][j] * x[j];
              }
              for(let j = i + 1; j < n; j++){
                      s = s - matrixA[i][j] * x[j];
              }
              this.resultVector[i] = s / matrixA[i][i];
              if(max < Math.abs(x[i] - this.resultVector[i])){
                  max = Math.abs(x[i] - this.resultVector[i]);
              }
              if(max < epsilon || k == max_iter){
                   return this.resultVector;
              }
              k++
          }
      }
      }
      else{
        alert("Matrice de Jacobi Diverge");
        return this.resultVector;

      }
  }
  
test(str:string){
  if(Number.isInteger(this.matrixForm.get('maxiter')?.value) && this.matrixForm.get('maxiter')?.value > 0){
    if(str=='s'){
      this.gauss_seidel(this.matrixA.map(row => [...row]),[...this.vectorB],this.matrixForm.get('maxiter')?.value)
    }
    else if(str=='j'){
      this.jacobi(this.matrixA.map(row => [...row]),[...this.vectorB],this.matrixForm.get('maxiter')?.value)

    }
  }
  else{
    alert("Nombre d'itération doit étre entier supérieur à 0 ")
  }
}
  //methode de Gauss-Seidel
  gauss_seidel(matrixA: number[][], vectorB: number[], max_iter: number = 100, epsilon: number = 1e-6):number[]{
    if(this.convergenceGauss_Seidel(matrixA)){
      const r=this.res.nativeElement;
      r.style.display="block";
      const n = matrixA.length;
     
      let max = 0;
      let k = 0;
      for(let i = 0; i < n; i++){
          this.resultVector[i] = 0;
      }
      while(true){
          for(let i = 0; i < n; i++){
              let s = 0;
              for(let j = 0; j < i; j++){
                  s = s + matrixA[i][j] * this.resultVector[j];
              }
              for(let j = i + 1; j < n; j++){
                  s = s + matrixA[i][j] * this.resultVector[j];
              }
              s = (vectorB[i] - s) / matrixA[i][i];
              if(max < Math.abs(s - this.resultVector[i])){
                  max = Math.abs(s - this.resultVector[i]);
              }
              this.resultVector[i] = s;
          }
          if(max < epsilon || k == max_iter){
              return  this.resultVector;
          }
          k++;
      }
    } 
    else{
      alert("Matrice de Gauss Seidel Diverge")
      return this.resultVector;
    }
  }
onMatrixChange(value: number, i: number, j: number): void {
  // Only update the value if i is less than or equal to j
  if (i <= j) {
    this.matrixA[i][j] = value;
  }
}
// test matricielle 
 estMatriceSymetrique(matrice: number[][]): boolean {
  const n = matrice.length;

  // Vérification de la symétrie
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (matrice[i][j] !== matrice[j][i]) {
              return false; // La matrice n'est pas symétrique
          }
      }
  }

  return true; // La matrice est symétrique
}

 estMatriceDefiniePositive(matrice: number[][]): boolean {
  const n = matrice.length;
  if(matrice[0][0] <= 0){
      return false;
  }
  for(let i = 2; i <= n; i++){
      if(this.determinant(matrice, i) <= 0){
          return false;
      }
  }
  return true;
}

 estMatriceDecomposable(matrice: number[][]): boolean {
  const n = matrice.length;
  if(matrice[0][0] == 0){
      return false;
  }
  for(let i = 2; i <= n; i++){
      if(this.determinant(matrice, i) == 0){
          return false;
      }
  }
  return true;
}

 determinant(mat: number[][], n: number): number {
  if (n === 2) {
      return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
  } else {
      let det = 0;
      for (let i = 0; i < n; i++) {
          const sign = i % 2 === 0 ? 1 : -1;
          const cofactor = this.determinant(mat.slice(1).map(row => row.slice(0, i).concat(row.slice(i + 1))),n - 1);
          det += sign * mat[0][i] * cofactor;
      }
      return det;
  }
}

inverseGaussJordan(matrice: number[][]): number[][] | null {
  const n = matrice.length;

  // Créer une matrice identité
  const identite: number[][] = [];
  for (let i = 0; i < n; i++) {
      identite[i] = Array(n)
      for(let j = 0; j < n; j++){
          identite[i][j] = 0;
      }
      identite[i][i] = 1;

  }

  // Concaténer la matrice originale avec la matrice identité
  const matriceAugmentee = matrice.map((ligne, index) => [...ligne, ...identite[index]]);

  // Appliquer la méthode de Gauss-Jordan
  for (let i = 0; i < n; i++) {
      // Trouver le pivot non nul
      let pivotIndex = -1;
      for (let j = i; j < n; j++) {
          if (matriceAugmentee[j][i] !== 0) {
              pivotIndex = j;
              break;
          }
      }

      if (pivotIndex === -1) {
          console.error("La matrice n'est pas inversible.");
          return null;
      }

      // Échanger les lignes pour mettre le pivot sur la diagonale
      [matriceAugmentee[i], matriceAugmentee[pivotIndex]] = [matriceAugmentee[pivotIndex], matriceAugmentee[i]];

      // Mettre le pivot à 1
      const pivot = matriceAugmentee[i][i];
      for (let j = 0; j < 2 * n; j++) {
          matriceAugmentee[i][j] /= pivot;
      }

      // Élimination des autres lignes
      for (let k = 0; k < n; k++) {
          if (k !== i) {
              const facteur = matriceAugmentee[k][i];
              for (let j = 0; j < 2 * n; j++) {
                  matriceAugmentee[k][j] -= facteur * matriceAugmentee[i][j];
              }
          }
      }
  }

  // Extraire la partie droite (la matrice inverse)
  const inverse: number[][] = matriceAugmentee.map(ligne => ligne.slice(n));

  return inverse;
}
 sumMatrix(matrixA: number[][], matrixB: number[][]): number[][]{
  const n = matrixA.length;
  let resultMatrix: number[][] = new Array(n);
  for(let i = 0; i < n; i++){
      resultMatrix[i] = new Array(n);
      for(let j = 0; j < n; j++){
          resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
      }
  }
  return resultMatrix;
}
substractionMatrix(matrixA: number[][], matrixB: number[][]): number[][]{
  const n = matrixA.length;
  let resultMatrix: number[][] = new Array(n);
  for(let i = 0; i < n; i++){
      resultMatrix[i] = new Array(n);
      for(let j = 0; j < n; j++){
          resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
      }
  }
  return resultMatrix;
}
multiplicationMatriceDense_Dense(matrixA: number[][], matrixB: number[][]): number[][]{
  const n = matrixA.length;
  const resultMatrix: number[][] = new Array(n);
  for(let i = 0; i < n; i++){    
      resultMatrix[i] = new Array(n);
      for(let j = 0; j < n; j++){
          resultMatrix[i][j] = 0;
          for(let k = 0; k < n; k++){
              resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
          }
      }
  }
  return resultMatrix;
}
max(val: number []) : number{
  const n = val.length;
  let max = val[0];
  for(let i = 1; i < n; i++){
      if (max < val[i]){
          max = val[i];
      }
  }
  return max;
}

 obtenirValeursPropres(matrice: number[][]): number[] {
  // Convertir la matrice en objet Matrix de ml-matrix
  const matriceML = new Matrix(matrice);

  // Obtenir la décomposition des valeurs propres
  const decomposition: EigenvalueDecomposition = new EigenvalueDecomposition(matriceML);

  // Obtenir les valeurs propres (réelles et imaginaires)
  const valeursPropres = decomposition.realEigenvalues;

  return valeursPropres;
}

convergenceJacobi(matrix: number[][]): boolean{
  const n = matrix.length;
  let D: number[][] = new Array(n);
  let E: number[][] = new Array(n);
  let F: number[][] = new Array(n);
  for(let i = 0; i < n; i++){
      D[i] = new Array(n);
      E[i] = new Array(n);
      F[i] = new Array(n);
      for(let j = 0; j < n; j++){
          if(i < j){
              D[i][j] = 0;
              E[i][j] = 0;
              F[i][j] = -matrix[i][j];
          }
          else if (i == j){
              D[i][j] = matrix[i][j];
              E[i][j] = 0;
              F[i][j] = 0;
          }
          else if (i > j) {
              D[i][j] = 0;
              E[i][j] = -matrix[i][j];
              F[i][j] = 0;
          }
      }
  }
  let M = this.inverseGaussJordan(D);
  if (M == null){
      return false;
  }
  let N = this.sumMatrix(E, F);
  let J = this.multiplicationMatriceDense_Dense(M, N);
  let valeursPropres = this.obtenirValeursPropres(J);
  let maxVal = Math.abs(this.max(valeursPropres));

  if (maxVal < 1){
      return true;
  }
  else return false;
}

convergenceGauss_Seidel(matrix: number[][]): boolean{
  const n = matrix.length;
  let D: number[][] = new Array(n);
  let E: number[][] = new Array(n);
  let F: number[][] = new Array(n);
  for(let i = 0; i < n; i++){
      D[i] = new Array(n);
      E[i] = new Array(n);
      F[i] = new Array(n);
      for(let j = 0; j < n; j++){
          if(i < j){
              D[i][j] = 0;
              E[i][j] = 0;
              F[i][j] = -matrix[i][j];
          }
          else if (i == j){
              D[i][j] = matrix[i][j];
              E[i][j] = 0;
              F[i][j] = 0;
          }
          else if (i > j) {
              D[i][j] = 0;
              E[i][j] = -matrix[i][j];
              F[i][j] = 0;
          }
      }
  }
  let M = this.inverseGaussJordan(this.substractionMatrix(D, E));
  if (M == null){
      return false;
  }
  let N = F;
  let J = this.multiplicationMatriceDense_Dense(M, N);
  let valeursPropres = this.obtenirValeursPropres(J);
  let maxVal = Math.abs(this.max(valeursPropres));
  
  if (maxVal < 1){
      return true;
  }
  else return false;
}
}
function type(value: any) {
  throw new Error('Function not implemented.');
}

