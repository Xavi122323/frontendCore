import { Component } from '@angular/core';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  
  user: any;

  constructor (private adminRoleService: AdminRoleService, private router: Router) {}

  ngOnInit(): void {
    this.adminList();
  }

  adminList(){
    this.adminRoleService.listUsers().subscribe(
      user => {
      this.user = user;
    })
  }

  deleteUser(id: any){
    this.adminRoleService.deleteUser(id).subscribe((data: any) => {
      this.adminList();
    })
  }

  editUser(id: any){
    this.router.navigate(['edit/user', id])
  }
}
