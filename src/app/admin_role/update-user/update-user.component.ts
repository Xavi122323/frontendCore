import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  /*userForm = new FormGroup({
    email: new FormControl(''),
    role: new FormControl('')
  });*/

  userForm!: FormGroup;
  user: any;
  id: any;

  constructor(private adminRoleService: AdminRoleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userID'))
    this.adminRoleService.findUser(this.id).subscribe(
      (user) => {
        this.user=user
        this.userForm = new FormGroup({
          email: new FormControl(this.user.email),
          role: new FormControl(this.user.role)
        });
      }
    )
  }

  onSubmit(){
    this.adminRoleService.editUser(this.userForm.value, this.id).subscribe(
      (server) =>{
        
      }
    )
    this.router.navigate(['list/user']);
  }
}
