import { DatePipe, DecimalPipe, JsonPipe, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Component, computed, inject, signal } from '@angular/core';
import { environment } from '../environments/environment';

interface FileEntity {
  id: number;
  name: string;
  size: number;
  createdAt: string;
  path: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  template: `

    <mat-card [ngStyle]="{
      margin: '40px auto',
      maxWidth: '500px',
      padding: '40px'
    }">

      <input
        #inputRef
        accept="image/*"
        type="file"
        hidden
        (change)="onFileSelected($event)"
      />

      @if (selectedFile()) {
        <mat-card [ngStyle]="{
          padding: '20px',
          margin: '20px'
        }">
          <h3>{{ selectedFile()?.name }}</h3>
          <pre>{{ selectedMetaData() | json }}</pre>
        </mat-card>
      }

      <button
        [ngStyle]="{
          marginTop: '20px'
        }"
        mat-stroked-button
        (click)="inputRef.click()">
        <mat-icon>file_upload</mat-icon> Select file
      </button>

      <button
        [ngStyle]="{
          marginTop: '20px'
        }"
        [disabled]="uploading()"
        color="accent"
        mat-flat-button
        (click)="upload()">
        Upload
      </button>

    </mat-card>

    <div [ngStyle]="{
      maxWidth: '800px',
      margin: '0px auto',
      textAlign: 'center'
    }">
      @for (item of data(); track item.id) {
        <mat-card [ngStyle]="{
          display: 'inline-block',
          maxWidth: '200px',
          width: '100%',
          verticalAlign: 'top',
          margin: '10px'
        }">
          <h4>{{ item.name }}</h4>
          <p [ngStyle]="{ fontSize: '10px' }">
              Created {{ item.createdAt | date: 'medium' }}
              <br/>
              Size {{ (item.size / (1024 * 1024)) | number }} MB
          </p>
          <img
            [ngStyle]="{
              display: 'block',
              width: '100%'
            }"
            [src]="item.path"
          />
        </mat-card>
      }
    </div>

  `,
  imports: [
    NgStyle,
    MatButtonModule,
    MatCardModule,
    MatCardModule,
    MatIconModule,
    JsonPipe,
    MatRadioModule,
    DatePipe,
    DecimalPipe
  ]
})
export class AppComponent {
  #http = inject(HttpClient);

  data = signal<FileEntity[]>([]);
  selectedFile = signal<File | undefined>(undefined);
  selectedMetaData = computed(() => {
    const file = this.selectedFile();
    if (!file) { return undefined; }
    return {
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type
    };
  });
  uploading = signal(false);

  constructor() {
    this.#loadData();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile.set(target.files ? target.files[0] : undefined);
  }

  upload() {
    const selectedFile = this.selectedFile();

    if (!selectedFile) { return; }

    this.uploading.set(true);

    const formData = new FormData();

    formData.append(
      'file',
      selectedFile,
      selectedFile.name
    );
    this.#http
      .post(`${environment.apiUrl}/file`, formData)
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.#loadData();
          this.#reset();
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.#reset();
        }
      });

  }

  #reset() {
    this.selectedFile.set(undefined);
    this.uploading.set(false);
  }

  #loadData() {
    this.#http
      .get<FileEntity[]>(`${environment.apiUrl}/file`)
      .subscribe((d) => this.data.set(d))
  }

}
