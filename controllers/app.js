angular.module('contact',['ui.bootstrap','toaster','ngAnimate'])
        .controller('contactController',contactController);

contactController.$inject =['$scope','contactService','$uibModal','toaster'];
function contactController($scope,contactService,$uibModal,toaster){
        $scope.displayContact = false;
        $scope.add = function(){
            $scope.viewClicked = false;
            var modalInstance = $uibModal.open({    
                templateUrl : 'views/addContact.html',
                controller: function($scope,$uibModalInstance,contactService){
                    $scope.addCont = function(obj){
                        if(checkEntry(obj)){
                            var msg = contactService.add(obj);
                            $uibModalInstance.close();
                            toaster.pop('success', "", msg);
                        } else{
                            toaster.pop('error','',"Something is Wrong.Please check for special character in First Name or check contact Number");
                        }
                    }
                }
        });
    }   
    $scope.fetchContact = function(){
        $scope.viewClicked = true;
        $scope.displayContact = true;
        $scope.displayList = contactService.getContacts(); 
    }
    
    $scope.editContact = function(list){
        $scope.viewClicked = false;        
        var modalInstance = $uibModal.open({
            templateUrl : 'views/editContact.html',
            controller: function($scope,$uibModalInstance,contactService){
                $scope.editObj = list;
                $scope.editCont = function(obj){
                    contactService.edit(obj);
                    $uibModalInstance.close();
                    toaster.pop('success', "", "Updated");
                }
            }
    });
    };
    
    
    function checkEntry(obj){
        var splChars = "*|,\":<>[]{}`\';()@&$#%";
        for (var i = 0; i < obj.firstName.length; i++) {
            if (splChars.indexOf(obj.firstName.charAt(i)) != -1){
                return false;
            }
        }
        if (obj.number.toString().length != 10)
            return false;
        return true;
    }
};