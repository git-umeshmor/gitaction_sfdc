import { LightningElement ,wire} from 'lwc';
import fetchAccountDetails from '@salesforce/apex/ContollerToFetchAccounts.fetchAccountDetails';
export default class DisplayAccountDetails extends LightningElement {
    accountList ;
    @wire(fetchAccountDetails)
    accountData({data,error}){
        if(data){
            console.log(JSON.stringify(data))
            this.accountList = data;
        }

        if(error){
            console.log('Error fetching records');
        }

    }
}