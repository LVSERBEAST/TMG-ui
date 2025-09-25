import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]], // Changed to dropdown validation
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  loading = signal(false);
  submitted = signal(false);
  error = signal<string | null>(null);

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      // Simulate form submission
      setTimeout(() => {
        this.loading.set(false);
        this.submitted.set(true);
        this.contactForm.reset();
      }, 2000);

      // TODO: Replace with actual form submission logic
      // this.contactService.submitForm(this.contactForm.value).subscribe({
      //   next: () => {
      //     this.submitted.set(true);
      //     this.loading.set(false);
      //     this.contactForm.reset();
      //   },
      //   error: (error) => {
      //     this.error.set('Failed to send message. Please try again.');
      //     this.loading.set(false);
      //   }
      // });
    }
  }

  resetForm() {
    this.submitted.set(false);
    this.error.set(null);
    this.contactForm.reset();
  }
}
