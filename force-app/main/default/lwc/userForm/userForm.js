import { LightningElement } from 'lwc';

export default class UserForm extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }
}