import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ytbPro';
  constructor(private service: SharedService) {
    this.ClickedRow = function(index){  
      this.HighlightRow = index;
   }
   this.getTopTrendingClick();
  }

  listYoutubeTrending: any = []
  listYoutubeTrendingTemp1: any = []
  listYoutubeTrendingTemp2: any = []
  listYoutubeTrendingTemp3: any = []
  listYoutubeTrendingTemp4: any = []

  listSearchOne: any = []
  linkYoutube = '';
  networkAtSearchOne = '';

  listSearchMultiple: any = []
  selectedFile: File = null;

  regionCode = '';
  cookies = '';
  idVideo = ''
  networkName = '';
  edit= false;
  isLoadingAPI=false;

  HighlightRow : Number = 0;
  ClickedRow:any;
  response='';

  isHiddenPause: boolean = true;
  isStopCallAPI:boolean = false;

  getTopTrendingClick() {
    console.log("getTopTrendingClick");
    console.log("regionCode "+ this.regionCode);
    console.log("apiKey "+this.cookies);
    this.service.getTopTrendingYoutube0To50(this.regionCode).subscribe(data=> {
      console.log(data.items)
      this.listYoutubeTrendingTemp1 = data.items;
      this.service.getTopTrendingYoutube100To150(this.regionCode).subscribe(top2=> {
        console.log(top2.items)
        this.listYoutubeTrendingTemp2 = top2.items;
        this.service.getTopTrendingYoutube150To200(this.regionCode).subscribe(top3=> {
          this.listYoutubeTrendingTemp3 = top3.items;
          this.service.getTopTrendingYoutube150To200(this.regionCode).subscribe(top4=> {
            this.listYoutubeTrendingTemp4 = top4.items;
            this.listYoutubeTrending = this.listYoutubeTrendingTemp1.concat(this.listYoutubeTrendingTemp2.concat(this.listYoutubeTrendingTemp3.concat(this.listYoutubeTrendingTemp4)))
            this.listYoutubeTrending.forEach(function (eachItem){ 
              eachItem.edit = false;
              eachItem.networkName = "";
              eachItem.isLoadingAPI = false;
            });
          });
        });
      });

    });
  }

  checkNetWorkClick(item:any, index:number) {
    if (this.cookies == '') {
      alert('Vui lòng nhập Cookie !')
    } else {
      this.changeState(index)
      this.service.getNetWork(item.id, this.cookies).subscribe(data => {
        console.log(data)
        if (data == "Need Reset Cookie") {
          alert('Lỗi! Bạn cần đổi Cookie mới')
          this.listYoutubeTrending[index].edit = false;
          this.listYoutubeTrending[index].isLoadingAPI = false;
        } else {
          this.listYoutubeTrending[index].networkName = data;
          this.listYoutubeTrending[index].isLoadingAPI = false;
        }
      })
    }
  }

  async autoGetNetwork() {
    if (this.cookies == '') {
      alert('Vui lòng nhập Cookie !')
    } else {
      this.isHiddenPause = false;
      console.log('auto')
      this.isStopCallAPI = false;
      for (var index in this.listYoutubeTrending) {
        if (!this.isStopCallAPI) {
          console.log(this.listYoutubeTrending[index]);
          this.changeState(index)
          this.response = await this.service.getNetWork(this.listYoutubeTrending[index].id, this.cookies)
          .pipe(delay(5000))
          .toPromise();
          if (this.response == "Need Reset Cookie") {
            alert('Lỗi! Bạn cần đổi Cookie mới')
            this.listYoutubeTrending[index].edit = false;
            this.listYoutubeTrending[index].isLoadingAPI = false;
            break;
          } else {
            this.listYoutubeTrending[index].networkName = this.response;
            this.listYoutubeTrending[index].isLoadingAPI = false;
          }
        }
      }
    }
  }

  delayTime(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  stopAutoGetNetwork() {
    console.log('stop')
    this.isHiddenPause = true;
    this.isStopCallAPI = true;
  }

  changeState(index:any) {
    this.listYoutubeTrending[index].isLoadingAPI = true;
    this.listYoutubeTrending[index].edit = true;
  }

  searchWithOneVideo() {
    if(this.linkYoutube == '') {
      alert('Vui lòng nhập Link youtube')
    } else {
      var splitted = this.linkYoutube.split("=");
      var id = splitted[1];
      if (this.cookies == '') {
        alert('Vui lòng nhập Cookie !')
      } else {
        this.service.getNetWork(id, this.cookies).subscribe(data => {
          if (data == "Need Reset Cookie") {
            alert('Lỗi! Bạn cần đổi Cookie mới')
          } else {
            this.networkAtSearchOne = data;
          }
        })
      }
    }
  }

  uploadFile() {
    console.log(this.selectedFile)
    if (this.selectedFile == null) {
      alert("Chưa chọn File")
    } else {
      this.service.uploadFile(this.selectedFile).subscribe(res => {
        console.log(res)
        this.service.getAllLinkFromFile().subscribe(data =>{
          this.listSearchMultiple = data
          console.log(this.listSearchMultiple)
        })
      })
    }
  }

  async getNet() {
    if (this.cookies == '') {
      alert('Vui lòng nhập Cookie !')
    } else {
      for (var index in this.listSearchMultiple) {
        console.log(this.listSearchMultiple[index]);
        this.listSearchMultiple[index].isLoadingAPI = true;
        var splitted = this.listSearchMultiple[index].link.split("=");
        var id = splitted[1];
        this.response = await this.service.getNetWork(id, this.cookies)
        .pipe(delay(5000))
        .toPromise();
        this.listSearchMultiple[index].isLoadingAPI = false;
        if (this.response == "Need Reset Cookie") {
          alert('Lỗi! Bạn cần đổi Cookie mới')
          break;
        } else {
          this.listSearchMultiple[index].networkName = this.response;
        }
      }
    }
  }

  onFileSelected(event:any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
  }
  
}
