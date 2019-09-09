import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faCropAlt, faTimes, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CropperComponent } from 'angular-cropperjs';
import mergeImages from 'merge-images';
import { saveAs } from 'file-saver';
import base64Img from 'base64-img';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() post
  @ViewChild('cropper') public cropper: CropperComponent;
  faCropAlt = faCropAlt;
  faTimes = faTimes;
  faArrowDown = faArrowDown;
  save = false;
  config = {
    dragMode: 'move',
    background: true,
    movable: true,
    rotatable: true,
    scalable: true,
    zoomable: true,
    viewMode: 1,
    checkImageOrigin: false,
    cropmove: this.cropMoved.bind(this),
    checkCrossOrigin: true,
    cropBoxMovable: false,
    cropBoxResizable: false,
    guides: false,
    center: false,
    modal: false,
    highlight: false,
    autoCropArea: 1
  };
  croppedFile;
  overlayedImage = '';
  overlay;
  constructor(private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.requestDefaultBase64();
  }

  cropMoved(data) {
    this.croppedFile = this.cropper.cropper.getCroppedCanvas().toDataURL();
  }

  crop(post) {
    this.spinner.show();
    base64Img.requestBase64(post.overlay, (err, res, body) => {
      this.overlay = body;
      let i = new Image();
      i.onload = () => {
        this.resizeImage(this.overlay, i.width, i.height);
      };
      i.src = this.croppedFile;
    });
  }

  resizeImage(base64Str, width, height) {
    let img = new Image();
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      mergeImages([this.croppedFile, canvas.toDataURL()], {
        width: 350,
        height: 365
      }
      ).then(b64 => {
        this.spinner.hide();
        this.overlayedImage = b64
        this.save = true;
      })
    };
    img.src = base64Str;
  }

  async saveCroppedImage() {
    await saveAs(this.overlayedImage, "croppedImage.png")
  }
  close() {
    this.save = false;
    this.modalService.dismissAll();
  }

  requestDefaultBase64() {
    base64Img.requestBase64(this.post.url, (err, res, body) => {
      this.croppedFile = body;
    });
  }
}
