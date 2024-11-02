public with sharing class ContollerToFetchAccounts {
    @AuraEnabled(cacheable=true)
    public static list<account> fetchAccountDetails(){
        return [SELECT Id ,Name , Industry ,type FROM Account WHERE Industry != null AND Type != null limit 10];
    }
}