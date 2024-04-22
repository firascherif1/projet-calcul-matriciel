import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vecteur',
  templateUrl: './vecteur.component.html',
  styleUrls: ['./vecteur.component.css']
})
export class VecteurComponent implements OnInit {
  myimage="assets/images/back22.jpg"
  myicon:string="assets/images/icon_home_algo.png";
  reload:string="assets/images/reload_algo.png";
  firstInputValue: number | null = null;
  secondInputValue: number | null = null;
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
      mA: [[Validators.required, Validators.min(1), Validators.max(this.matrixA.length-1)]]
    });
  }
  updateSecondInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.secondInputValue = value !== null ? parseFloat(value) : null;
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

  multiplyMatrixByVector() {
    for (let i = 0; i < this.matrixA.length; i++) {
      this.resultVector[i] = 0;
      for (let j = 0; j < this.matrixA[i].length; j++) {
        this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
    }
  }
  @ViewChild('in') log!: ElementRef;
  aff(){
    const log=this.log.nativeElement;
    log.style.display="block";
    
  }
  multiplicationmatriceTIVecteur(){
    
    for (let i = 0; i < this.matrixA.length; i++) {
        for (let j = 0; j <= i ; j++) {
            this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
        }
    }}
  private generateEmptyMatrix(rows: number, columns: number): number[][] {
    return Array.from({ length: rows }, () => Array(columns).fill(null));
  }
// multiplication matrice-vecteur
multiplicationmatriceTI_Vecteur(){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = 0; j <= i ; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
}

multiplicationmatriceTS_Vecteur(){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = i; j < n ; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
}


multiplicationMatriceDense_Vecteur(){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = 0; j < n; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
}

multiplicationmatriceDBI_Vecteur(m: number){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = Math.max(0, i - m); j <= i ; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
}

multiplicationmatriceDBS_Vecteur(m: number){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = i; j < Math.min(i + m + 1, n) ; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
}

multiplicationmatriceBande_Vecteur(m: number){
  const r=this.res.nativeElement;
  r.style.display="block";
    const n = this.matrixA.length;
  for (let i = 0; i < n; i++) {
      this.resultVector[i] = 0;
      for (let j = Math.max(0, i - m); j < Math.min(i + m + 1, n) ; j++) {
          this.resultVector[i] += this.matrixA[i][j] * this.vectorB[j];
      }
  }
  
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

  // Méthode appelée lorsque la sélection change
  onMatrixASelectionChange() {
    // console.log('Matrice A sélectionnée :', this.selectedMatrixA);
    // Vous pouvez faire d'autres actions en fonction de la matrice sélectionnée ici
    if(this.selectedMatrixA=="Matrice dense"){
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
    else if(this.selectedMatrixA=="Matrice bande"){
      
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
  if(this.selectedMatrixA=="Matrice dense"){
    this.multiplicationMatriceDense_Vecteur();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire superieure" ){
    this.multiplicationmatriceTS_Vecteur();
  }
  else if(this.selectedMatrixA=="Matrice triangulaire inferieure"){
    this.multiplicationmatriceTI_Vecteur();
  }
  else if(this.selectedMatrixA=="Matrice bande"){
    this.multiplicationmatriceBande_Vecteur(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande inferieur"){
    this.multiplicationmatriceDBI_Vecteur(this.matrixForm.get('mA')?.value);
  }
  else if(this.selectedMatrixA=="Matrice demi-bande superieur"){
    this.multiplicationmatriceDBS_Vecteur(this.matrixForm.get('mA')?.value);
  }
  }
  reloadPage() {
    window.location.reload();
  }
m=2;
isWithinBande(i: number, j: number): boolean {
  return Math.abs(i - j) <= this.matrixForm.get('mA')?.value;
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
