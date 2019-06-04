import { Component, OnInit } from '@angular/core';
import { Instrutor } from '../../models/instrutor.model';
import { InstrutorService } from '../../services/instrutor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-instrutor',
  templateUrl: './edit-instrutor.component.html',
  styleUrls: ['./edit-instrutor.component.scss']
})
export class EditInstrutorComponent implements OnInit {

  public instrutor: Instrutor = new Instrutor();
  public loading = false;
  public success = false;
  public error = false;
  public errorMsg = null;
  constructor(public instrutorService: InstrutorService, public route: ActivatedRoute) {
    this.load();
  }

  load() {
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

  salvarInstrutor(instrutor: Instrutor) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.instrutorService.update(instrutor).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
    }, errResponse => {
      console.log(errResponse);
      this.loading = false;
      this.error = true;
      this.errorMsg = this.printError(errResponse);
    });
  }

  printError(errResponse: any) {
    let errorText = '';
// tslint:disable-next-line: forin
    for (const e in errResponse.error) {
      errorText += `<b>${e}:</b> ${errResponse.error[e][0]} <br>`;
    }

    return errorText;
  }

  ngOnInit() {
  }

}
