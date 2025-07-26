import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  getServerSentEvent(url: string): EventSource {
    return new EventSource(url);
  }
}