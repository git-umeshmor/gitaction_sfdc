public with sharing class ApexWithLwcRecordCreation {
   @AuraEnabled
   public static void  createAccount(Account acc){
        system.debug('The account record recived is'+acc);
        if(acc != null){
            try{
                insert acc;
            }
            catch(exception ex){
                system.debug('Error in processing the record'+ex.getMessage());
            }
        }
   }
}