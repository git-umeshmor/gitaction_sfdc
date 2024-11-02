import { LightningElement } from 'lwc';
import createContact from '@salesforce/apex/CreateContactInSalesforce.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateContact extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    isLoading = false; 

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleClick(event){
        this.isLoading = true;
        createContact({firstName : this.firstName , lastName : this.lastName , email : this.email , phone : this.phone })
        .then(result=>{
            this.showToast('Success', 'Contact created with Id: ' + result, 'success');
            this.clearForm();
        })
        .catch(error=>{
            this.showToast('Error', 'Error creating contact: ' + error.body.message, 'error');
        })
        .finally(() => {
            this.isLoading = false; // Hide the spinner
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    clearForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.template.querySelectorAll('lightning-input').forEach(input => {
            input.value = '';
        });
    }
}