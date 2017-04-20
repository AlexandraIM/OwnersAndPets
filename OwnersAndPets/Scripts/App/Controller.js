
//controller for user
app.controller("UserController", function ($scope, $location, APIServise) {
     //Get All Users
    getAllUsers();

    function getAllUsers()
    {
        var callService = APIServise.get('Users');
        callService.then(function (responce) {
            $scope.users = responce.data;
            //Count total items
            $scope.totalItems = $scope.users.length;
            //Show first page
            $scope.currentPage = 1;
            //Items per page
            $scope.itemsPerPage = 3;
            //set page
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            //change page
            $scope.pageChanged = function () {
                $log.log('Page changed to: ' + $scope.currentPage);
            };

            //show items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first paghe
            };
           
        }, function (error) {
            $log.error("Error: " + error.data);
        });
    }

    
    //Submit user to db
    $scope.submit = function () {
        var user = {
            "Name": $scope.Name
        };

        var saveUser = APIServise.add(user,'Users');
        saveUser.then(function (responce) {
            $scope.Name = "";
            $("#Result").text("User Added").css("color", "green");
            getAllUsers();
        }, function (error) {
            console.error(error.data);
            $("#Result").text("Faild to add user!").css("color", "red");
        });
    };
    // redirect ot user page
    $scope.goToUserPage = function (userId) {
        $location.path('/View/Pet/'+userId );
    };
    //delete user page
    $scope.deleteUser = function (Id) {
        var del = APIServise.delete(Id,'Users');
        del.then(function (responce) {
            getAllUsers();
        }, function (error) {
            console.error(error.data);
        });
    };      
});
//controller for pets
app.controller("PetController", function ($scope, $routeParams,$log, $location, APIServise) {

    //get user id from query string
    var userId = $routeParams.UserId;
    //get user and relative pets
    getPets();
    
    function getPets() {
        var callService = APIServise.getPets('Users', userId);
        callService.then(function (responce) {
            
            $scope.user = responce.data;
           //total pets
            $scope.totalItems = $scope.user[0].Pets.length;
            //current page
            $scope.currentPage = 1;
            //items per page
            $scope.itemsPerPage = 3;
            //set page
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            //chage page
            $scope.pageChanged = function () {
                $log.log('Page changed to: ' + $scope.currentPage);
            };
            //Items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first paghe
            };
        }, function (error) {
            $log.error("Error: " + error.data);
        });
    }
    //add new pet to user
    $scope.submit = function () {
        var pet = {
            "Name": $scope.Name,
            "UserId": userId
        };

        var savePet = APIServise.add(pet, 'Pets');
        savePet.then(function (responce) {
            $scope.Name = "";
            $("#Result").text("Pet Added").css("color", "green");
            getPets();
        }, function (error) {
            console.error(error.data);
            $("#Result").text("Faild to add pet!").css("color", "red");
        });
    };
    //delete pet from user
    $scope.delete = function (petId) {
        var del = APIServise.delete(petId, 'Pets');
        del.then(function (responce) {
            getPets();
        }, function (error) {
            console.error(error.data);
        });
    };
    //redirect to All users page
    $scope.backToUsers = function () {
        $location.path('/');
    };
});