import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    deviceToken: string;

    /**
     * Constructor
     */
    constructor(private messaging: AngularFireMessaging) {
        // Request permission for notification in browser
        this.requestPermission();
        // Listen service worker when new nofification are sent to
        this.listenServiceWorker();
    }

    private requestPermission() {
        this.messaging.requestPermission
            .pipe(mergeMapTo(this.messaging.tokenChanges))
            .subscribe(
                (token) => {
                    console.log('Permission granted! Save to the server!', token);
                },
                (error) => { console.error(error); },
            );
    }

    private listenServiceWorker() {
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('[App] Received message from service worker', event.data);
        });
    }
}
