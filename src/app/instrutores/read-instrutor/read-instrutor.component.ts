import { Component, OnInit } from '@angular/core';
import { Instrutor } from '../../models/instrutor.model';
import { InstrutorService } from '../../services/instrutor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-instrutor',
  templateUrl: './read-instrutor.component.html',
  styleUrls: ['./read-instrutor.component.scss']
})
export class ReadInstrutorComponent implements OnInit {

  instrutor: Instrutor = new Instrutor();
  loading = false;
  constructor(public instrutorService: InstrutorService, public route: ActivatedRoute, private router: Router) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.instrutor.numeroMatricula = params.id;
      this.instrutorService.getAll().subscribe(response => {
        console.log(response);
// tslint:disable-next-line: triple-equals
        const instrutor = response.data.find(a => a.numeroMatricula == this.instrutor.numeroMatricula);
        console.log(instrutor);
        this.instrutor = instrutor;
        this.loading = false;
      });
    });
  }


  editInstrutor(instrutor: Instrutor) {
    this.router.navigate(['edit-instrutor', instrutor.numeroMatricula]);
  }

  ngOnInit() {
  }

}
