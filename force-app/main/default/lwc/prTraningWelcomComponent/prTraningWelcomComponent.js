import { LightningElement } from 'lwc';
export default class PrTraningWelcomComponent extends LightningElement {
    name = "";
    handleOnchange(event){
        this.name = event.target.value;
    }
}