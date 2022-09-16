import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
 ColumnDefs: any;  
 RowData: any;  
 IsColumnsToFit: boolean;  
 gridApi: any;  
 gridColumnApi: any;  
 /*    public tableData1: TableData;
    public tableData2: TableData;
    ngOnInit(){
        this.tableData1 = {
            headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
            dataRows: [
                ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
            ]
        };
        this.tableData2 = {
            headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
            dataRows: [
                ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
                ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
                ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
            ]
        };
    } */
 
    AgLoad: boolean;  
    constructor() { }  
    
    ngOnInit() {  

      
      this.GetAgColumns();  
      this.GetGiftVoucherList();  
      
    }  
    GetAgColumns() {  
      this.ColumnDefs = [  
        { headerName: 'ArtNo', field: 'ArtNo', sortable: true, filter: true },  
        { headerName: 'Provider', field: 'Provider', sortable: true, filter: true },  
        { headerName: 'ProviderArtNo', field: 'ProviderArtNo', sortable: true, filter: true },  
        { headerName: 'Brand', field: 'Brand', sortable: true, filter: true },  
        { headerName: 'Price', field: 'Price', sortable: true, filter: true },  
        { headerName: 'BuyAccount', field: 'BuyAccount', sortable: true, filter: true }  
      ];  
    }  
    GetGiftVoucherList() {  
      this.AgLoad = true;  
      this.RowData = [  
        {  
          ArtNo: "100",  
          Provider: "IPhone 11",  
          ProviderArtNo: "1Yu",  
          Brand: "Apple",  
          Price: 7810.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "101",  
          Provider: "Samsung galaxy",  
          ProviderArtNo: "1Yu",  
          Brand: "Samsung",  
          Price: 2310.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "102",  
          Provider: "Iphone 11 Pro",  
          ProviderArtNo: "1Yu",  
          Brand: "Apple",  
          Price: 7810.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "103",  
          Provider: "Intex",  
          ProviderArtNo: "1Yu",  
          Brand: "Intex",  
          Price: 5810.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "100",  
          Provider: "IPhone 11",  
          ProviderArtNo: "1Yu",  
          Brand: "Apple",  
          Price: 7810.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "101",  
          Provider: "Samsung galaxy",  
          ProviderArtNo: "1Yu",  
          Brand: "Samsung",  
          Price: 2310.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "102",  
          Provider: "Iphone 11 Pro",  
          ProviderArtNo: "1Yu",  
          Brand: "Apple",  
          Price: 7810.23,  
          BuyAccount: "123",  
        },  
        {  
          ArtNo: "103",  
          Provider: "Intex",  
          ProviderArtNo: "1Yu",  
          Brand: "Intex",  
          Price: 5810.23,  
          BuyAccount: "123",  
        }  
      ];  
    }  
    

        BindData(params) {  
        this.gridApi = params.api;  
        this.gridColumnApi = params.columnApi;  
        params.api.setRowData(this.RowData);  
        if (this.IsColumnsToFit) {  
          this.gridApi.sizeColumnsToFit();  
        } 
    }
}
