import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-matrice',
  templateUrl: './matrice.component.html',
  styleUrls: ['./matrice.component.css']
})
export class MatriceComponent implements OnInit {
myimage="assets/images/back22.jpg"
myicon:string="assets/images/icon_home_algo.png";
reload:string="assets/images/reload_algo.png";
defaultValue: number | undefined ;
firstInputValue: number | null = null;
  secondInputValue: number | null = null;
  matrixForm: FormGroup;
  matrixA: number[][] = [];
  matrixB: number[][] = [];
  resultMatrix: number[][] = [];
  showAlert: boolean = false;
  @ViewChild('id') res!: ElementRef;
  //id de matrice A
  @ViewChild('id_denseA') denseA!: ElementRef;
  @ViewChild('titre_matA') matA!: ElementRef;
  @ViewChild('id_denseA_inf') denseA_inf!: ElementRef;
  @ViewChild('id_denseA_sup') denseA_sup!: ElementRef;
  @ViewChild('id_denseA_bande_inf') denseA_bande_inf!: ElementRef;
  @ViewChild('id_denseA_bande_sup') denseA_bande_sup!: ElementRef;
  @ViewChild('id_bande') bande!: ElementRef;
  //id de matrice B
  @ViewChild('titre_matB') matB!: ElementRef;
  @ViewChild('id_denseB') denseB!: ElementRef;
  @ViewChild('id_denseB_inf') denseB_inf!: ElementRef;
  @ViewChild('id_denseB_sup') denseB_sup!: ElementRef;
  @ViewChild('id_denseB_bande_inf') denseB_bande_inf!: ElementRef;
  @ViewChild('id_denseB_bande_sup') denseB_bande_sup!: ElementRef;
  @ViewChild('id_denseB_bande') denseB_bande!: ElementRef;
  
  constructor(private formBuilder: FormBuilder) {
    this.matrixForm = this.formBuilder.group({
      rows: [ [Validators.required, Validators.min(1)]],
      columns: [ [Validators.required, Validators.min(1)]],
      mA: [[Validators.required, Validators.min(1), Validators.max(this.matrixA.length-1)]],
      mB: [[Validators.required, Validators.min(1), Validators.max(this.matrixB.length-1)]]
    });
    
    // this.matrixForm.get('columns')?.setValidators(this.matrixForm.get('rows')?.value);
    // Mettre à jour la définition de mA après que matrixForm a été initialisé
this.matrixForm.get('mA')?.setValidators([Validators.required, Validators.min(1), Validators.max(this.matrixA.length - 1)]);
    
  }
  updateSecondInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.secondInputValue = value !== null ? parseFloat(value) : null;
  }
  getDefaultValueForMA(){
    return this.matrixForm.get('rows')?.value;
  }
  choixCocher(libelle: string="choix") {
    // Fonction appelée lorsqu'une case à cocher est cochée ou décochée
    console.log('Choix coché ou décoché:', libelle);
    // Vous pouvez ajouter le code correspondant à chaque choix ici
    if(libelle == "generateMatrices"){
       this.generateMatrices();
    }
  }
  generateMatrices() {
    
    const rowsControl = this.matrixForm.get('rows');
    const columnsControl = this.matrixForm.get('columns');
  
    if (rowsControl && columnsControl && rowsControl.valid && columnsControl.valid) {
      const rows = rowsControl.value;
      const columns = columnsControl.value;
  
      this.matrixA = this.generateEmptyMatrix(rows, columns);
      this.matrixB = this.generateEmptyMatrix(rows, columns);
      this.resultMatrix = this.generateEmptyMatrix(rows, columns);
      
    }
  }
 // matrice dense * matrice :

    //dense
multiplicationMatriceDense_Dense(){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;

  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = 0; k < n; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
 
}

  //tri_inf
multiplicationMatriceDense_TI(){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = j; k < n ; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

  //tri_sup
multiplicationMatriceDense_TS(){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = 0; k <= j; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

  //bande 
multiplicationMatriceDense_Bande(m:number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(0, j - m); k < Math.min(j + m + 1, n) ; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
  
}

  //demi_bane_inf
multiplicationMatriceDense_DBI(m:number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = j; k < Math.min(j + m + 1, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
  
}

  //demi_bande_sup
multiplicationMatriceDense_DBS(m:number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(0, j - m); k <= j ; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
  
}
// matrice tri_inf * matrice :

    //dense
    multiplicationMatriceTI_dense(){
      const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          this.resultMatrix[i][j] = 0;
          for (let k = 0; k <= i; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }

  }

  //tri_inf
  multiplicationMatriceTI_TI(){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for(let i = 0; i < n; i++){    
          for(let j = 0; j <= i; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = j; k <= i ; k++){
                      this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //tri_sup
  multiplicationMatriceTI_TS(){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
          
          for (let j = 0; j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = 0; k <= j; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
         for(let j = i + 1; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for (let k = 0; k <= i; k++){
                 this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
     
  }

  //bande   a verifier 
  multiplicationMatriceTI_Bande(m:number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
   
          for (let j = 0; j < Math.min(i + m + 1, n); j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = Math.max(0, j - m); k <= i; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //demi_bande_inf    a verifier 
  multiplicationMatriceTI_DBI(m:number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
          
          for (let j = 0; j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = j; k <= Math.min(j + m + 1, i); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //demi_bande_superieur
  multiplicationMatriceTI_DBS(m:number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
          
          for (let j = 0; j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = Math.max(0, j - m); k <= j; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
         for(let j = i + 1; j < Math.min(i + m + 1, n); j++){
              this.resultMatrix[i][j] = 0;
              for (let k = Math.max(0, j - m); k <= i; k++){
                 this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //matrice tri_sup * matrice :
    
    //dense
    multiplicationMatriceTS_dense(){
      const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
  for (let i = 0; i < n; i++) {
      
      for (let j = 0; j < n; j++) {
          this.resultMatrix[i][j] = 0;
          for (let k = i; k < n; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
 
  }

  //tri_inf
  multiplicationMatriceTS_TI(){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
          
          for (let j = 0; j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = i; k < n; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
         for(let j = i + 1; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for (let k = j; k < n; k++){
                 this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //tri_sup
  multiplicationMatriceTS_TS(){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for(let i = 0; i < n; i++){    
          
          for(let j = i; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = i; k <= j; k++){
                      this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //bande   
  multiplicationMatriceTS_bande(m: number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for(let i = 0; i < n; i++){    
          
          for(let j = Math.max(0, i - m); j < n; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = Math.max(i, j - m); k < Math.min(j + m + 1, n); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //demi_bande_inf
  multiplicationMatriceTS_DBI(m: number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for (let i = 0; i < n; i++) {
          
          for (let j = Math.max(0, i - m); j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = i; k < Math.min(j + m + 1, n); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
         for(let j = i + 1; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for (let k = j; k < Math.min(j + m + 1, n); k++){
                 this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //demi_bande_sup
  multiplicationMatriceTS_DBS(m: number){
    const r=this.res.nativeElement;
    r.style.display="block";
      const n = this.matrixA.length;
      
      for(let i = 0; i < n; i++){    
          
          for(let j = i; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = Math.max(i, j - m); k <= j; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
      
  }

  //// matrice bande * matrice :

    //dense
multiplicationMatriceBande_Dense(s: number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(0, i - s); k < Math.min(i + s + 1, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//tri_inf
multiplicationMatriceBande_TI(s: number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(j, i - s); k < Math.min(i + s + 1, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//tri_sup
multiplicationMatriceBande_TS(s: number){
  const r=this.res.nativeElement;
    r.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(0, i - s); k <= Math.min(i + s, j); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//bande  
multiplicationMatriceBande_Bande(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.min(Math.max(0, i - r),Math.max(0, i - s)); k < Math.max(Math.min(i + r + 1, n),Math.min(i + s + 1, n)); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//demi_bande_inf
multiplicationMatriceBande_DBI(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < Math.min(i + s +1 , n) ; j++) {
          this.resultMatrix[i][j] = 0;
          for (let k = j; k < Math.max(Math.min(j + s + 1, n),Math.min(j + r + 1, n)); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//demi_bande_sup
multiplicationMatriceBande_DBS(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      for (let j = Math.max(0, i - s); j < n ; j++) {
          this.resultMatrix[i][j] = 0;
          for (let k = Math.min(Math.max(0, j - s),Math.max(0, j - r)); k <= j; k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

// matrice demi_bande_inferieur * matrice :

    // Dense
    multiplicationMatriceDBI_Dense(s: number){
      const k=this.res.nativeElement;
    k.style.display="block";
      const n = this.matrixA.length;
      for(let i = 0; i < n; i++){    
          for(let j = 0; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = Math.max(0, i - s); k <= i; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //tri_inf
multiplicationMatriceDBI_TI(s: number){
  const k=this.res.nativeElement;
    k.style.display="block";
      const n = this.matrixA.length;
      for(let i = 0; i < n; i++){    
          for(let j = 0; j <= i; j++){
              this.resultMatrix[i][j] = 0;
              for(let k = Math.max(j, i - s); k <= i; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //tri_sup
multiplicationMatriceDBI_TS(s: number){
  const k=this.res.nativeElement;
    k.style.display="block";
      const n = this.matrixA.length;
      for (let i = 0; i < n; i++) {
          for (let j = Math.max(0, i - s); j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = Math.max(0, i - s); k <= j; k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
         for(let j = i + 1; j < n; j++){
              this.resultMatrix[i][j] = 0;
              for (let k = Math.max(0, i - s); k <= i; k++){
                 this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //bande
multiplicationMatriceDBI_bande(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
      for (let i = 0; i < n; i++) {
          for (let j = 0; j < Math.max(Math.min(i + s + 1, n),Math.min(i + r + 1, n)); j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = Math.min(Math.max(0, j - s),Math.max(0, j - r)); k <= Math.max(Math.min(j + s, i),Math.min(j + r, i)); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  //demi_bande_inf
multiplicationMatriceDBI_DBI(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
      const n = this.matrixA.length;
      for (let i = 0; i < n; i++) {
          for (let j = 0; j <= i; j++) {
           this.resultMatrix[i][j] = 0;
            for (let k = Math.min(Math.max(0, i - s),Math.max(0, i - r)); k <= Math.max(Math.min(j + s, i),Math.min(j + r, i)); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }
  //demi_bande_sup
multiplicationMatriceDBI_DBS(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
      const n = this.matrixA.length;
      // if(s == r){
      //     return false;
      // }
      for (let i = 0; i < n; i++) {
          for (let j = Math.max(0, i - s); j <= i; j++) {
              this.resultMatrix[i][j] = 0;
              for (let k = Math.min(Math.max(0, j - r),Math.max(0, j - s)); k <= Math.max(Math.min(i + s, j),Math.min(i + r, j)); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
          for(let j = i + 1; j < Math.min(i + r + 1, n); j++){
              this.resultMatrix[i][j] = 0;
              for (let k = Math.max(0, j - r); k <= Math.min(j + s, i); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
              }
          }
      }
  }

  // matrice demi_bande_supérieur * matrice :

    //Dense
multiplicationMatriceDBS_Dense(s: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = i; k < Math.min(i + s, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//tri_inf
multiplicationMatriceDBS_TI(s: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
       this.resultMatrix[i][j] = 0;
        for (let k = i; k < Math.min(i + s, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
     for(let j = i + 1; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for (let k = j; k < Math.min(i + s, n); k++){
             this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//tri_sup
multiplicationMatriceDBS_TS(s: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = i; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = i; k <= Math.min(i + s, j); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//bande
multiplicationMatriceDBS_bande(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = Math.min(Math.max(i - s, 0),Math.max(i - r, 0)); j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.min(Math.max(j - s, i),Math.max(j - r, i)); k < Math.max(Math.min(i + s + 1, n),Math.min(i + r + 1, n)); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//demi_bande_inf
multiplicationMatriceDBS_DBI(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      for (let j = Math.max(0, i - r); j <= i; j++) {
       this.resultMatrix[i][j] = 0;
        for (let k = Math.min(Math.max(i, j - r),Math.max(i, j - s)); k < Math.max(Math.min(j + s + 1, n),Math.min(j + r + 1, n)); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
     for(let j = i + 1; j < Math.min(i + s + 1, n); j++){
          this.resultMatrix[i][j] = 0;
          for (let k = Math.min(Math.max(j, i - r),Math.max(j, i - s)); k < Math.max(Math.min(i + s + 1, n),Math.min(i + r + 1, n)); k++){
             this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}

//demi_bande_sup
multiplicationMatriceDBS_DBS(s: number, r: number){
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = i; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.min(Math.max(j - s, i),Math.max(j - r, i)); k <= Math.max(Math.min(i + s, j),Math.min(i + r, j)); k++){
                  this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
          }
      }
  }
}


// bande * transpose
multiplicationMatriceBande_Transpose(m: number){
  
  const k=this.res.nativeElement;
    k.style.display="block";
  const n = this.matrixA.length;
  for(let i = 0; i < n; i++){    
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(Math.max(0, i - m),Math.max(0, j - m)) ; k < Math.min(Math.min(n, i + m + 1),Math.min(n, j + m + 1)); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixA[j][k];
          }
      }
  }
}

// bande * inverse
multiplicationMatriceBande_Inverse(m: number) {
  
  const k=this.res.nativeElement;
  k.style.display="block";
const n = this.matrixA.length;

const matrixB = this.inverseGaussJordan(this.matrixA);
if(matrixB != null){
  for(let i = 0; i < n; i++){    
      
      for(let j = 0; j < n; j++){
          this.resultMatrix[i][j] = 0;
          for(let k = Math.max(0, i - m); k < Math.min(i + m + 1, n); k++){
              this.resultMatrix[i][j] += this.matrixA[i][k] * matrixB[k][j];
          }
      }
  }
  
}
else{
  alert("  Matrice n'est pas inversible ");
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














  // multiplyMatrices() {
  //   const r=this.res.nativeElement;
  //   r.style.display="block";
  //   console.log(this.matrixA);
  //   console.log(this.matrixB);
  //   for (let i = 0; i < this.matrixA.length; i++) {
  //     for (let j = 0; j < this.matrixA[i].length; j++) {
  //       this.resultMatrix[i][j] = this.matrixA[i][j] * this.matrixB[i][j];
  //     }
  //   }
    
  // }




  // multiplyMatriceTI_TS() {
    
  //   const r=this.res.nativeElement;
  //   r.style.display="block";
  //   for (let i = 0; i < this.matrixA.length; i++) {
      
  
      
  //     for (let j = 0; j <= i; j++) {
  //       for (let k = 0; k <= j; k++) {
  //         this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
  //         console.log(this.resultMatrix[i][j]);
  //       }
  //     }
  
      
  //     for (let j = i + 1; j < this.matrixA.length; j++) {
  //       for (let k = 0; k <= i; k++) {
  //         this.resultMatrix[i][j] += this.matrixA[i][k] * this.matrixB[k][j];
  //         console.log(this.resultMatrix[i][j]);
  //       }
  //     }
  //   }
    
  // }

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
  matricesB = [
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
    
    if(this.selectedMatrixA=="Matrice dense"){
      this.generateMatrices();
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
      this.generateMatrices();
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
      this.generateMatrices();
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
    else if(this.selectedMatrixA=="Matrice bande"){
      
      // if(this.matrixForm.get('mA')?.value!=0){
        this.generateMatrices();
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
      // }
    }
    else if(this.selectedMatrixA=="Matrice demi-bande inferieur"){
      this.generateMatrices();
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
      this.generateMatrices();
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

    
    // Vous pouvez faire d'autres actions en fonction de la matrice sélectionnée ici
}
  // Méthode appelée lorsque la sélection change
  onMatrixBSelectionChange() {
    if(this.selectedMatrixB=="Matrice dense"){
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "block";
        const m3 = this.denseB_sup.nativeElement;
        m3.style.display = "none";
        const m4 = this.denseB_inf.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseB_bande.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseB_bande_inf.nativeElement;
        m6.style.display = "none";
        const r = this.denseB_bande_sup.nativeElement;
        r.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixB=="Matrice triangulaire superieure"){
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseB_sup.nativeElement;
        r.style.display = "block";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "none";
        const m4 = this.denseB_inf.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseB_bande.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseB_bande_inf.nativeElement;
        m6.style.display = "none";
        const m7 = this.denseB_bande_sup.nativeElement;
        m7.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixB=="Matrice triangulaire inferieure"){
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseB_inf.nativeElement;
        r.style.display = "block";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "none";
        const m3 = this.denseB_sup.nativeElement;
        m3.style.display = "none";
        const m5 = this.denseB_bande.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseB_bande_inf.nativeElement;
        m6.style.display = "none";
        const m7 = this.denseB_bande_sup.nativeElement;
        m7.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixB=="Matrice bande"){
      
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseB_bande.nativeElement;
        r.style.display = "block";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "none";
        const m3 = this.denseB_sup.nativeElement;
        m3.style.display = "none";
        const m4 = this.denseB_inf.nativeElement;
        m4.style.display = "none";
        const m6 = this.denseB_bande_inf.nativeElement;
        m6.style.display = "none";
        const m7 = this.denseB_bande_sup.nativeElement;
        m7.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixB=="Matrice demi-bande inferieur"){
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseB_bande_inf.nativeElement;
        r.style.display = "block";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "none";
        const m3 = this.denseB_sup.nativeElement;
        m3.style.display = "none";
        const m4 = this.denseB_inf.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseB_bande.nativeElement;
        m5.style.display = "none";
        const m7 = this.denseB_bande_sup.nativeElement;
        m7.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }
    else if(this.selectedMatrixB=="Matrice demi-bande superieur"){
      this.generateMatrices();
      setTimeout(() => {
        const k=this.res.nativeElement;
        k.style.display="none";
        const r = this.denseB_bande_sup.nativeElement;
        r.style.display = "block";
        const m1 = this.denseB.nativeElement;
        m1.style.display = "none";
        const m3 = this.denseB_sup.nativeElement;
        m3.style.display = "none";
        const m4 = this.denseB_inf.nativeElement;
        m4.style.display = "none";
        const m5 = this.denseB_bande.nativeElement;
        m5.style.display = "none";
        const m6 = this.denseB_bande_inf.nativeElement;
        m6.style.display = "none";
        const mat = this.matB.nativeElement;
        mat.style.display = "block";
      });
    }

    // console.log('Matrice B sélectionnée :', this.selectedMatrixB);
    // Vous pouvez faire d'autres actions en fonction de la matrice sélectionnée ici
}
isWithinBandeA(i: number, j: number): boolean {
  return Math.abs(i - j) <=this.matrixForm.get('mA')?.value;
}
isWithinBandeB(i: number, j: number): boolean {
  return Math.abs(i - j) <=this.matrixForm.get('mB')?.value;
}
reloadPage() {
  window.location.reload();
}
algo_choix(){
  // matrice dense * matrice :
  if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceDense_Dense();
  }
  
  else if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceDense_TS();
  }
  else if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceDense_TI();
  }
  else if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceDense_Bande(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceDense_DBI(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice dense" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceDense_DBS(this.matrixForm.get('mB')?.value);
  }
  //// matrice tri_inf * matrice :
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceTI_dense();
  }
  
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceTI_TS();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceTI_TI();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceTI_Bande(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceTI_DBI(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceTI_DBS(this.matrixForm.get('mB')?.value);
  }
  //// matrice tri_sup * matrice :
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceTS_dense();
  }
  
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceTS_TS();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceTS_TI();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceTS_bande(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceTS_DBI(this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceTS_DBS(this.matrixForm.get('mB')?.value);
  }
  //matrice bande * matrice
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceBande_Dense(this.matrixForm.get('mA')?.value);
  }
  
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceBande_TS(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice inverse"){
    this.multiplicationMatriceBande_Inverse(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice transposée"){
    this.multiplicationMatriceBande_Transpose(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceBande_TI(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceBande_Bande(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceBande_DBI(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice bande" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceBande_DBS(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  //matrice demi_bande_inf * matrice
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceDBI_Dense(this.matrixForm.get('mA')?.value);
  }
  
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceDBI_TS(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceDBI_TI(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceDBI_bande(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceDBI_DBI(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceDBI_DBS(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  //matrice demi_bande_sup * matrice
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice dense"){
    this.multiplicationMatriceDBS_Dense(this.matrixForm.get('mA')?.value);
  }
  
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice triangulaire superieure"){
    this.multiplicationMatriceDBS_TS(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice triangulaire inferieure"){
    this.multiplicationMatriceDBS_TI(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice bande"){
    this.multiplicationMatriceDBS_bande(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice demi-bande inferieur"){
    this.multiplicationMatriceDBS_DBI(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur" && this.selectedMatrixB=="Matrice demi-bande superieur"){
    this.multiplicationMatriceDBS_DBS(this.matrixForm.get('mA')?.value,this.matrixForm.get('mB')?.value);
  }
  
}


onShowAlertChange() {
  if (this.matrixForm.get('rows')?.value != this.matrixForm.get('columns')?.value) {
    console.log("here")
    this.showCustomAlert(); // Remplacez 'maFonction' par le nom de votre fonction à appeler
  }
}

showCustomAlert() {
  alert("The values of Rows and Columns must be equal");
  window.location.reload();
}
}
