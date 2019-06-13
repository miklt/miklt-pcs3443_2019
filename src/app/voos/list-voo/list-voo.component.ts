import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VooService } from '../../services/voo.service';
import { Voo } from '../../models/voo.model';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-list-voo',
  templateUrl: './list-voo.component.html',
  styleUrls: ['./list-voo.component.scss']
})
export class ListVooComponent implements OnInit {

  public voos: Voo[];
  public loading = false;
  @ViewChild('details') detailsModal: ElementRef;

  constructor(private vooService: VooService, private router: Router, public sessionService: SessionService) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.loading = true;
    this.vooService.getAll().subscribe(response => {
      this.voos = response.data;
      if (this.sessionService.getAtor() !== 'funcionario') {
        this.voos = this.voos.filter(voo => voo.dadosInstrutor.cpf === this.sessionService.getCPF());
      }
      this.loading = false;
    });
  }

  goToVoo(voo: Voo) {
    this.router.navigate(['read-voo', voo.id]);
  }

  addVoo() {
    this.router.navigate(['create-voo']);
  }

  editVoo(voo: Voo) {
    this.router.navigate(['edit-voo', voo.id]);
  }

  deleteVoo(voo: Voo) {
    this.loading = true;
    this.vooService.delete(voo).subscribe(response => {
      console.log('Deletado', response);
      this.load();
    });
  }


}
