angular.module('profileApp', [])
    .controller('ProfileController', function($http) {
        var vm = this;
        vm.formProfile = {};

        vm.clear = function() {
            vm.formProfile = {
                name: "",
                email: "",
                gender:"",
                _id: ""
            };
        }

        $http.get('/api/profile/list').then(function(res) {
            vm.profiles = res.data;
        });

        vm.submit = function() {
            if(!vm.formProfile._id) {
                console.log("add new item");
                console.log(vm.formProfile.gender);

                var newProfile = {
                    name: vm.formProfile.name,
                    email: vm.formProfile.email,
                    gender:vm.formProfile.gender
                };

                vm.profiles.push(newProfile);
                $http.post('/api/profile/add', newProfile).then(function(res) {

                    vm.profiles[vm.profiles.length - 1]._id = res.data.profile._id;
                }, function(res) {
                    vm.profiles.pop();
                });
            } else {
                console.log("edit existing item");
                var backup = vm.profiles;

                vm.profiles = vm.profiles.map(function(profile) {
                    if(profile._id === vm.formProfile._id) {
                        console.log("edit from id: " + profile._id);
                        return vm.formProfile;
                    }
                    return profile;
                });
                $http.put('/api/profile/' + vm.formProfile._id + "/edit",
                    {
                        name: vm.formProfile.name,
                        email: vm.formProfile.email,
                        gender: vm.formProfile.gender
                    }
                ).then(function(res) {
                    console.log("Update status: " + res.status);
                }, function(res) {
                    console.log("Update status: " + res.status);
                    vm.profiles = backup;
                });
            }
            vm.clear();
        }

        vm.delete = function(index) {
            var backup = vm.profiles;
            var deleteId = vm.profiles[index]._id;
            vm.profiles = vm.profiles.filter(function(profile, profileIndex) {
                return index !== profileIndex;
            });
            $http.delete('/api/profile/'+ deleteId + '/delete').then(function(res) {

            }, function(res) {

                vm.profiles = backup;
            });
        }

        vm.edit = function(index) {
            editProfile = vm.profiles[index];
            vm.formProfile = {
                name: editProfile.name,
                email: editProfile.email,
                gender: editProfile.gender,
                _id: editProfile._id
            }
        }
    });
