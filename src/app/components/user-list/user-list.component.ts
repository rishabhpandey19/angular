import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({ selector: 'app-user-list', templateUrl: './user-list.component.html', styleUrls: ['./user-list.component.scss'] })
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';
  currentPage = 1;
  totalUsers = 0;
  pageSize = 20;
  loading = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void { this.fetchUsers(); }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (res) => { this.users = res.data; this.filteredUsers = res.data; this.totalUsers = res.total; this.loading = false; },
      error: () => (this.loading = false),
    });
  }

  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  onPageChange(page: number): void { this.currentPage = page; this.fetchUsers(); }
  deleteUser(id: number): void {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== id);
      this.filteredUsers = this.filteredUsers.filter((u) => u.id !== id);
    });
  }
}
