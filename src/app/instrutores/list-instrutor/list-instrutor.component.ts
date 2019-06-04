import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InstrutorService } from '../../services/instrutor.service';
import { Instrutor } from '../../models/instrutor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-instrutor',
  templateUrl: './list-instrutor.component.html',
  styleUrls: ['./list-instrutor.component.scss']
})
export class ListInstrutorComponent implements OnInit {

  public instrutores: Instrutor[];
  public loading = false;
  @ViewChild('details') detailsModal: ElementRef;

  constructor(private instrutorService: InstrutorService, private router: Router) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.loading = true;
    this.instrutorService.getAll().subscribe(response => {
      this.instrutores = response.data;
      this.loading = false;
    });
  }

  goToInstrutor(instrutor: Instrutor) {
    this.router.navigate(['read-instrutor', instrutor.numeroMatricula]);
  }

  addInstrutor() {
    this.router.navigate(['create-instrutor']);
  }

  editInstrutor(instrutor: Instrutor) {
    this.router.navigate(['edit-instrutor', instrutor.numeroMatricula]);
  }

  deleteInstrutor(instrutor: Instrutor) {
    this.loading = true;
    this.instrutorService.delete(instrutor).subscribe(response => {
      console.log('Deletado', response);
      this.load();
    });
  }


}
