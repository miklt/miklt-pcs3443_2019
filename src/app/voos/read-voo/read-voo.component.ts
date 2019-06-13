import { Component, OnInit } from '@angular/core';
import { Voo } from '../../models/voo.model';
import { VooService } from '../../services/voo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-read-voo',
  templateUrl: './read-voo.component.html',
  styleUrls: ['./read-voo.component.scss']
})
export class ReadVooComponent implements OnInit {

  voo: Voo = new Voo();
  loading = false;
  constructor(public vooService: VooService, public route: ActivatedRoute, private router: Router, public sessionServive: SessionService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.voo.id = params.id;
      this.vooService.getAll().subscribe(response => {
        console.log(response);
// tslint:disable-next-line: triple-equals
        const voo = response.data.find(a => a.id == this.voo.id);
        console.log(voo);
        this.voo = voo;
        this.loading = false;
      });
    });
  }


  editVoo(voo: Voo) {
    this.router.navigate(['edit-voo', voo.id]);
  }

  ngOnInit() {
  }

}
