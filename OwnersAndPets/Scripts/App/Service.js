app.service("APIServise", function ($http) {
    this.get = function (route) {
        return $http.get('../api/'+route);
    }

    this.add = function (user,route)
    {
        return $http({
            method: 'POST',
            data: user,
            url:'../api/'+route
        });
    }

    this.delete = function (Id,route)
    {
        return $http({
            method: 'delete',
            data: Id,
            url: '../api/' + route + '/' + Id
        });
    }

    this.getPets = function (route, userId)
    {
        return $http({
            method: 'GET',
            data: userId,
            url: '../api/' + route + '/' + userId
        });
    }
    
});