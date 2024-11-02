public with sharing class CreateContactInSalesforce {
    @AuraEnabled
    public static string  createContact(String firstName, String lastName, String email,String phone) {
        //string result ='';
        contact con = new contact();
        con.FirstName = firstName ;
        con.LastName = lastName ;
        con.email = email;
        con.phone = phone;
        try {
            insert con;
            System.debug('con created with Id: ' + con.Id);
            return con.id ;

        } 
        catch (DmlException e) 
        {
            System.debug('An error occurred: ' + e.getMessage());
            return e.getMessage();
        }
    }
}