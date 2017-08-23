class Solution(object):
    def firstMissingPositive(self, nums):
        l = len(nums)
        i = 0

        while i < l:
            val = nums[i]

            if val == i + 1 or not 0 < val <= l:
                i += 1
            elif nums[val - 1] == val:
                nums[i] = -1
                i += 1
            else:
                nums[i] = nums[val - 1]
                nums[val - 1] = val

        for i, val in enumerate(nums):
            if i != val - 1:
                return i + 1

        return l + 1
