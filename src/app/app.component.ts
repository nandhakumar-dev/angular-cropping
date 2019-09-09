import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './services/common.service';
import { ModalComponent } from './components/modal/modal.component';
import { faExpand } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allPost;
  faExpand = faExpand;
  constructor(private modalService: NgbModal, private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getAllPost().subscribe(data => {
      if (data && data.hasOwnProperty('body')) {
        this.allPost = data['body'].imgs;
        console.log(this.allPost)
      }
    });
  }

  viewPost(post) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.post = post;
  }

}
