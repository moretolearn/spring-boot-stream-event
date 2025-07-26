package com.moretolearn;

import java.io.IOException;
import java.time.Duration;
import java.util.Date;
import java.util.concurrent.Executors;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import reactor.core.publisher.Flux;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StreamEventController {

	 @GetMapping("/sse")
	    public SseEmitter stream() {
	        SseEmitter emitter = new SseEmitter(0L); // no timeout
	        Executors.newSingleThreadExecutor().submit(() -> {
	            try {
	                while (true) {
	                    String data = new Date().toString();
	                    emitter.send(data);
	                    Thread.sleep(1000); // send every 1 second
	                }
	            } catch (IOException | InterruptedException e) {
	                emitter.completeWithError(e);
	            }
	        });

	        return emitter;
	    }
	
	 // using webflux 
	@GetMapping(value = "/sse1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
                .map(seq -> new Date().toString());
    }
}

