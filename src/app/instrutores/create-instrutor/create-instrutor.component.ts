import { Component, OnInit } from '@angular/core';
import { Instrutor } from '../../models/instrutor.model';
import { InstrutorService } from '../../services/instrutor.service';

@Component({
  selector: 'app-create-instrutor',
  templateUrl: './create-instrutor.component.html',
  styleUrls: ['./create-instrutor.component.scss']
})
export class CreateInstrutorComponent implements OnInit {

  public novoInstrutor: Instrutor = new Instrutor();
  public success = false;
  public loading = false;
  public error = false;
  public errorMsg = null;
  constructor(public instrutorService: InstrutorService) { }

  ngOnInit() {
  }

  salvarInstrutor(instrutor: Instrutor) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.instrutorService.create(instrutor).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
      this.novoInstrutor = new Instrutor();
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

}
