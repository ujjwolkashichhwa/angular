import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private CustomerService : CustomerService) { }
  customerArray = []
  showDeletedMessage:Boolean;
  searchText: string ="";

  ngOnInit() {
    this.CustomerService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item =>
          {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
      }
    );
  }

  onDelete($key)
  {
    if(confirm('Are you sure to delete the record?'))
    {
      this.CustomerService.deleteCustomer($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false,5000);
    }
  }

  filterCondition(customer)
  {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1;
  }

}
