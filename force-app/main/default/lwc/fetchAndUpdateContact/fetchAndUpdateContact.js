import { LightningElement, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";
import getSingleContact from "@salesforce/apex/ContactController.getSingleContact";
import FIRSTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import ID_FIELD from "@salesforce/schema/Contact.Id";

export default class FetchAndUpdateContact extends LightningElement {
    disabled = false;
  @track error;

  @wire(getSingleContact)
  contact;

  handleChange(event) {
    // Display field-level errors and disable button if a name field is empty.
    console.log('event'+event.target.value);
    if (!event.target.value) {
      console.log('event2'+event.target.value);
      event.target.reportValidity();
      this.disabled = true;
    } else {
      console.log('event3'+event.target.value);
      this.disabled = false;
    }
  }

  updateContact() {
    const allValid = [...this.template.querySelectorAll("lightning-input")].reduce(
      (validSoFar, inputFields) => {
        inputFields.reportValidity();
        return validSoFar && inputFields.checkValidity();
      },
      true,
    );
    console.log('allValid'+allValid);
    if (allValid) {
      console.log('allValid1'+allValid);
      // Create the recordInput object
      const fields = {};
      fields[ID_FIELD.fieldApiName] = this.contact.data.Id;
      fields[FIRSTNAME_FIELD.fieldApiName] = this.template.querySelector(
        "[data-field='FirstName']",
      ).value;
      fields[LASTNAME_FIELD.fieldApiName] =
      this.template.querySelector("[data-field='LastName']").value;
      console.log('fields'+JSON.stringify(fields));
      const recordInput = { fields };
      updateRecord(recordInput)
        .then(() => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Contact updated",
              variant: "success",
            }),
          );
          // Display fresh data in the form
          return refreshApex(this.contact);
        })
        .catch((error) => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error creating record",
              message: error.body.message,
              variant: "error",
            }),
          );
        });
    } else {
      console.log('allValid2'+allValid);
      // The form is not valid
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Something is wrong",
          message: "Check your input and try again.",
          variant: "error",
        }),
      );
    }
  }
}