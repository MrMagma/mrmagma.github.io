import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})

export class ProjectsComponent implements OnInit {

    projects: Array<{
        title: string,
        link: URL,
        image: URL
    }> = [
        {
            title: "test",
            link: new URL("https://www.google.com"),
            image: new URL("https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg")
        },
        {
            title: "test",
            link: new URL("https://www.google.com"),
            image: new URL("https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg")
        },
        {
            title: "test",
            link: new URL("https://www.google.com"),
            image: new URL("https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg")
        },
        {
            title: "test",
            link: new URL("https://www.google.com"),
            image: new URL("https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg")
        },
        {
            title: "test",
            link: new URL("https://www.google.com"),
            image: new URL("https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg")
        }
    ]

    constructor() { }

    ngOnInit() {
    }

}
