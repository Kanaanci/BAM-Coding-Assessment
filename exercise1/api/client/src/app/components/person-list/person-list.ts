import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StargateService } from '../../services/stargate.service';
import { PersonAstronaut } from '../../models/models';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [RouterLink, DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './person-list.html'
})
export class PersonListComponent implements OnInit {
  people = signal<PersonAstronaut[]>([]);
  loading = signal(true);
  error = signal('');
  displayedColumns = ['name', 'currentRank', 'currentDutyTitle', 'careerStartDate', 'careerEndDate', 'actions'];

  constructor(private api: StargateService) {}

  ngOnInit(): void {
    this.api.getPeople().subscribe({
      next: (res) => {
        this.people.set(res.people);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load people.');
        this.loading.set(false);
      }
    });
  }
}
