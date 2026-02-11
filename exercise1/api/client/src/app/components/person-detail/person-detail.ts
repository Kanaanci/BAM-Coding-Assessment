import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StargateService } from '../../services/stargate.service';
import { PersonAstronaut, AstronautDuty } from '../../models/models';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './person-detail.html'
})
export class PersonDetailComponent implements OnInit {
  person = signal<PersonAstronaut | null>(null);
  duties = signal<AstronautDuty[]>([]);
  loading = signal(true);
  error = signal('');
  name = '';
  dutyColumns = ['rank', 'dutyTitle', 'dutyStartDate', 'dutyEndDate'];

  constructor(private api: StargateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.api.getDutiesByName(this.name).subscribe({
      next: (res) => {
        this.person.set(res.person);
        this.duties.set(res.astronautDuties);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load person details.');
        this.loading.set(false);
      }
    });
  }
}
