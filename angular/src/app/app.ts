import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SseService } from './sseservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  events: string[] = [];
  event: Date | undefined;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private sseService: SseService
  ) {
    // const eventSource = this.sseService.getServerSentEvent('http://localhost:8080/sse');
    // eventSource.onmessage = (event) => {
    //   console.log('Received:', event.data);
    //   this.events = [...this.events, event.data];
    //   this.cdr.detectChanges();
    // };
    // eventSource.onerror = (err) => {
    //   console.error('EventSource failed:', err);
    //   eventSource.close();
    // };
  }

  ngOnInit() {
    const source = new EventSource('http://localhost:8080/sse');
    source.onmessage = (event) => {
      console.log('Received:', event.data); // ✅ Ensure this shows
      this.zone.run(() => {
        this.event = parse(event.data, 'EEE MMM dd HH:mm:ss OOO yyyy', new Date());
        this.cdr.detectChanges();
      });
    };
    source.onerror = (err) => {
      console.error('SSE error:', err);
    };
  }
}
