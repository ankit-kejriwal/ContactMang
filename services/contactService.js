angular.module('contact',['ui.bootstrap','toaster','ngAnimate'])
     .controller('contactController',contactController)
     .service('contactService',contactService);


contactService.$inject = [];
function contactService(){
    var service = this;
    var lists =  [
        {
        "firstName": "Joe",
        "lastName": "Perry",
        "contactNumber": "444-888-1223",
        "contactEmail": "joe@cordis.us"
        },
        {
        "firstName": "Kate",
        "lastName": "Will",
        "contactNumber": "244-838-1213",
        "contactEmail": "kate@cordis.us"
        },
        {
        "firstName": "Harry",
        "lastName": "Robert",
        "contactNumber": "744-138-1292",
        "contactEmail": "harry@cordis.us"
        },
        {
        "firstName": "Tom",
        "lastName": "Bill",
        "contactNumber": "241-188-1191",
        "contactEmail": "tom@cordis.us"
        },
        {
        "firstName": "Roger",
        "lastName": "Steel",
        "contactNumber": "111-177-1231",
        "contactEmail": "roger@cordis.us"
        }
    ]; 

    service.getContacts = function(){
        return lists;
    }
    service.add = function(detail){
        var objValidity = {status:true};
        for(var i=0;i<lists.length;i++){
            if(detail.number.toString() === lists[i].contactNumber){
                objValidity.status = false;
                objValidity.msg = "Number exist";
                break;
            }
            if(detail.firstName === lists[i].firstName){
                objValidity.status = false;
                objValidity.msg = "Name exist";
            }            
        }
        if(objValidity.status){
        var Obj = {
            "firstName": detail.firstName,
            "middleName": detail.middleName,
            "lastName": detail.lastName,
            "contactNumber":detail.number.toString(),
            "contactEmail": detail.mail
        }
        lists.push(Obj);
        objValidity.msg = "Added";
            return objValidity.msg;
        } else{
            return objValidity.msg;
        }
    }
    
    service.edit = function(detail){
        var objValidity = {status:true};
        for(var i=0;i<lists.length;i++){
            if(detail.number === lists[i].contactNumber){
                lists[i].firstName = detail.firstName;
                lists[i].middleName = detail.middleName;
                lists[i].lastName = detail.lastName;
                lists[i].contactEmail = detail.contactEmail;
            }
        }
    }
}