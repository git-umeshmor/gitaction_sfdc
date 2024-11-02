import { LightningElement,wire } from 'lwc';
import fetchOpportunity from '@salesforce/apex/FetchOpportunityListFromSFDataBase.fetchOpportunityList';
export default class ParentComponentFetchOpportunityList extends LightningElement {
    @wire(fetchOpportunity)
    oppList;
}