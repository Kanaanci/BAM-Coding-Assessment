import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StargateService } from '../../services/stargate.service';

@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './person-create.html'
})
export class PersonCreateComponent {
  name = signal('');
  error = signal('');
  submitting = signal(false);

  constructor(private api: StargateService, private router: Router) {}

  onSubmit(): void {
    if (!this.name().trim()) return;
    this.submitting.set(true);
    this.error.set('');

    this.api.createPerson(this.name().trim()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to create person.');
        this.submitting.set(false);
      }
    });
  }
}
