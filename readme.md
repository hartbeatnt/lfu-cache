a javascript Least Frequently Used Cache that supports 
get() and push() operations in constant time

get(key) - Get the value (will always be positive) of the 
key if the key exists in the cache, otherwise return -1.

put(key, value) - Set or insert the value if the key is 
not already present. When the cache reaches its capacity, 
it should invalidate the least frequently used item before 
inserting a new item. For the purpose of this problem, when 
there is a tie (i.e., two or more keys that have the same 
frequency), the least recently used key would be evicted.

based on https://leetcode.com/problems/lfu-cache/description/