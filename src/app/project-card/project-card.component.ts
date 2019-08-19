import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

    @Input() title: string;
    @Input() link: URL;
    @Input() image: URL;
    @Input() description: string;

    constructor() { }

    ngOnInit() {
    }

}
