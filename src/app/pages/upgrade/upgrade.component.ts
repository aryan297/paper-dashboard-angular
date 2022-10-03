import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from "html2canvas";
import { DomSanitizer } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


interface GeneratedMeme {
	id: number;
	url: string;
}

@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'upgrade.component.html',
    styleUrls: ['./upgrade.component.scss']
})

export class UpgradeComponent implements OnInit{
    public memes: GeneratedMeme[];
    EventData
	imagePath

	 elementRef: ElementRef;
     @ViewChild('screen') screen: ElementRef;
     @ViewChild('canvas') canvas: ElementRef;
     @ViewChild('downloadLink') downloadLink: ElementRef;

	 elementType = NgxQrcodeElementTypes.URL;
	 correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
	 value = 'https://geek-vikings.web.app/';

    constructor(elementRef: ElementRef,private _sanitizer: DomSanitizer){

		html2canvas(document.body,
			{
			useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
			});

        this.elementRef = elementRef;
		this.memes = [];
        this.EventData= JSON.parse(localStorage.getItem('save_event'))
    }
    // ---
	// PUBLIC METHODS.
	// ---

	// I use html2canvas to generate a PNG of the current meme configuration. The
	// generated images is appended to the view.
	public generateMeme() : void {

		window.scrollTo( 0, 0 );

		var target = this.elementRef.nativeElement.querySelector( "#meme-element" );

		// Generate the screenshot using html2canvas.
		var promise = html2canvas(
			target,
			{
				logging: false,
				// The onclone callback gives us access to the cloned DOCUMENT before the
				// screenshot is generated. This gives us the ability to make edits to
				// the DOM that won't affect the original page content. In this case, I
				// am applying a special CSS class that allows me to tweak the padding
				// around the text.
				onclone: ( doc ) => {

					doc.querySelector( "#meme-element" )!.classList.add( "html2canvas" );

				}
			}
		);

		promise
			.then(
				( canvas ) => {

					// Once the screenshot has been generated (as a canvas element), we
					// can grab the PNG data URI which we can then use to render an IMG
					// tag in the app.
					this.memes.unshift({
						id: Date.now(),
						url: canvas.toDataURL()
					});

				}
			)
			.catch(
				( error ) => {

					console.warn( "An error occurred." );
					console.error( error );

				}
			)
		;

	}


	// I scroll the given HTML element into view, using smooth scrolling if available.
	public scrollIntoView( element: HTMLElement ) : void {

		// NOTE: The "options" are not available in all browsers.
		try {

			element.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});

		} catch ( error ) {

			element.scrollIntoView();

		}

	}

    downloadImage(){
     html2canvas(this.screen.nativeElement).then(function(canvas){
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.downloadLink.nativeElement.download = 'O2O.png';
          this.downloadLink.nativeElement.click();
		
        }); 
      } 

	  convertToPng()
{ 
    html2canvas(this.screen.nativeElement, {useCORS: true}).then(function(canvas) {
      let img = new Image();
	  const a = document.createElement("a");
      img.src = canvas.toDataURL('image/png');
	 
	  a.href = canvas.toDataURL('image/png');
	  a.download= 'O2O.png';
	  a.click();
	
 /*      img.onload = function () {
        let pdf = new jsPDF('landscape', 'mm', 'a4');
        pdf.addImage(img, 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
        pdf.save('O2O.pdf');
      }; */
    });
}

    ngOnInit(){
    }
}


