var combinationSum4 = function(nums, target) {
    var result = [];
    calc(nums, target, [], result);
    return result.length;
};

function calc(nums, count, history, result) {
    for(var i=0;i<nums.length;i++) {
        var sub = count - nums[i];
        if(sub > 0) {
            history.push(nums[i]);
            calc(nums, sub, history, result);
        }
        else if (sub == 0) {
            // result.push(history.push(nums[i]));
            // history.push(nums[i]);
            result.push(nums[i]);
        }
    }
}