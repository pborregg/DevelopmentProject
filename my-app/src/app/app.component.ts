import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'my-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public title = 'TRPG Testing App';
    public userName: string;
    public charName: string;
    public trpgSchema: string[];
    public modalRef: BsModalRef;

    constructor(
        private titleService: Title,
        private httpService: HttpClient,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.setTitle(this.title);

        this.httpService.get('./assets/trpg-schema.json').subscribe(
            data => {
                this.trpgSchema = data as string[];	 // FILL THE ARRAY WITH DATA.
                console.log('Schema: ', this.trpgSchema);
                this.userName = this.trpgSchema.playername;
                this.charName = this.trpgSchema.character.name;
            },
            (err: HttpErrorResponse) => {
                console.log('Error: ', err.message);
            }
        );
    }

    public setTitle(newTitle: string): void {
        this.titleService.setTitle(newTitle);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


}
