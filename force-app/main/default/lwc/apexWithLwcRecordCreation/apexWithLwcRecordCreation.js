import { LightningElement ,track} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import createAccountRecord from '@salesforce/apex/ApexWithLwcRecordCreation.createAccount'
export default class ApexWithLwcRecordCreation extends LightningElement {
    //below field is JSON Object
    @track accountRecord = { 
        Name : NAME_FIELD
    }

    handleOnchange(event){
        console.log('Account name is'+event.target.value);
        this.accountRecord.Name = event.target.value;
    }

    handleClick(event){
        console.log('I am being clicked');
        createAccountRecord({acc : this.accountRecord})
        .then((result)=>{
            console.log('record inserted successfully')
        })
        .catch((error)=>{
            console.log('record insertion failed')
        })
    }
}