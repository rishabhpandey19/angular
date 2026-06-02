import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

interface StatCard { label: string; value: number; icon: string; trend: number; }

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss'] })
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [
    { label: 'Total Users', value: 0, icon: 'people', trend: 12 },
    { label: 'Active Sessions', value: 0, icon: 'wifi', trend: -3 },
    { label: 'Revenue', value: 0, icon: 'attach_money', trend: 8 },
    { label: 'Errors', value: 0, icon: 'bug_report', trend: -22 },
  ];
  recentUsers: User[] = [];
  loading = true;

  constructor(private userService: UserService) {}
  ngOnInit(): void { this.loadDashboardData(); }

  loadDashboardData(): void {
    this.userService.getUsers(1, 5).subscribe({
      next: (res) => {
        this.recentUsers = res.data;
        this.stats[0].value = res.total;
        this.stats[1].value = Math.floor(Math.random() * 200);
        this.stats[2].value = Math.floor(Math.random() * 50000);
        this.stats[3].value = Math.floor(Math.random() * 15);
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }
}
