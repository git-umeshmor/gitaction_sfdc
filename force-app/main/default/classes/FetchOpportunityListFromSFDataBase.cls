public with sharing class FetchOpportunityListFromSFDataBase {
   @AuraEnabled(cacheable=true)
   public static list<opportunity> fetchOpportunityList(){
        return [SELECT Id,Name,StageName,Amount FROM Opportunity];
   }
}