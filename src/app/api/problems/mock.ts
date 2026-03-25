export const mockProblems = [
  // ==================== ARRAYS ====================
  {
    id: "1",
    title: "Two Sum",
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <strong>indices of the two numbers</strong> such that they add up to <code>target</code>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>
<h3>Constraints:</h3>
<ul><li>2 ≤ nums.length ≤ 10<sup>4</sup></li><li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li><li>Only one valid answer exists.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
  },
  {
    id: "2",
    title: "Best Time to Buy and Sell Stock",
    description: `<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the i<sup>th</sup> day.</p>
<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>
<p>Return the <strong>maximum profit</strong> you can achieve from this transaction. If you cannot achieve any profit, return <code>0</code>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ prices.length ≤ 10<sup>5</sup></li><li>0 ≤ prices[i] ≤ 10<sup>4</sup></li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
  },
  {
    id: "3",
    title: "Contains Duplicate",
    description: `<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>5</sup></li><li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
  },
  {
    id: "4",
    title: "Maximum Subarray",
    description: `<p>Given an integer array <code>nums</code>, find the <strong>subarray</strong> with the largest sum, and return its sum.</p>
<p>A <strong>subarray</strong> is a contiguous non-empty sequence of elements within an array.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>5</sup></li><li>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
  },
  {
    id: "5",
    title: "Product of Array Except Self",
    description: `<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>
<p>You must write an algorithm that runs in <strong>O(n)</strong> time and without using the division operation.</p>
<h3>Constraints:</h3>
<ul><li>2 ≤ nums.length ≤ 10<sup>5</sup></li><li>-30 ≤ nums[i] ≤ 30</li><li>The product of any prefix or suffix of nums fits in a 32-bit integer.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
  },
  {
    id: "6",
    title: "3Sum",
    description: `<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
<p>Notice that the solution set must not contain duplicate triplets.</p>
<h3>Constraints:</h3>
<ul><li>3 ≤ nums.length ≤ 3000</li><li>-10<sup>5</sup> ≤ nums[i] ≤ 10<sup>5</sup></li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
  },
  {
    id: "7",
    title: "Move Zeroes",
    description: `<p>Given an integer array <code>nums</code>, move all <code>0</code>'s to the end of it while maintaining the relative order of the non-zero elements.</p>
<p><strong>Note</strong> that you must do this in-place without making a copy of the array.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>4</sup></li><li>-2<sup>31</sup> ≤ nums[i] ≤ 2<sup>31</sup> - 1</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]", output: "[0]" },
    ],
  },
  {
    id: "8",
    title: "Sort Colors",
    description: `<p>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong>in-place</strong> so that objects of the same color are adjacent, with the colors in the order red, white, and blue.</p>
<p>We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.</p>
<p>You must solve this problem without using the library's sort function.</p>
<h3>Constraints:</h3>
<ul><li>n == nums.length</li><li>1 ≤ n ≤ 300</li><li>nums[i] is either 0, 1, or 2.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" },
    ],
  },
  {
    id: "9",
    title: "Find the Duplicate Number",
    description: `<p>Given an array of integers <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code> inclusive.</p>
<p>There is only <strong>one repeated number</strong> in nums, return this repeated number.</p>
<p>You must solve the problem <strong>without</strong> modifying the array and using only constant extra space.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ n ≤ 10<sup>5</sup></li><li>nums.length == n + 1</li><li>1 ≤ nums[i] ≤ n</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,3,4,2,2]", output: "2" },
      { input: "nums = [3,1,3,4,2]", output: "3" },
      { input: "nums = [3,3,3,3,3]", output: "3" },
    ],
  },
  {
    id: "10",
    title: "First Missing Positive",
    description: `<p>Given an unsorted integer array <code>nums</code>, return the <strong>smallest missing positive integer</strong>.</p>
<p>You must implement an algorithm that runs in <strong>O(n)</strong> time and uses <strong>O(1)</strong> auxiliary space.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>5</sup></li><li>-2<sup>31</sup> ≤ nums[i] ≤ 2<sup>31</sup> - 1</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "nums = [1,2,0]", output: "3" },
      { input: "nums = [3,4,-1,1]", output: "2" },
      { input: "nums = [7,8,9,11,12]", output: "1" },
    ],
  },

  // ==================== STRINGS ====================
  {
    id: "11",
    title: "Valid Anagram",
    description: `<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p>
<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ s.length, t.length ≤ 5 × 10<sup>4</sup></li><li>s and t consist of lowercase English letters.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
  },
  {
    id: "12",
    title: "Valid Palindrome",
    description: `<p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.</p>
<p>Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ s.length ≤ 2 × 10<sup>5</sup></li><li>s consists only of printable ASCII characters.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" },
      { input: 's = " "', output: "true" },
    ],
  },
  {
    id: "13",
    title: "Longest Substring Without Repeating Characters",
    description: `<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
<h3>Constraints:</h3>
<ul><li>0 ≤ s.length ≤ 5 × 10<sup>4</sup></li><li>s consists of English letters, digits, symbols and spaces.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" },
    ],
  },
  {
    id: "14",
    title: "Longest Palindromic Substring",
    description: `<p>Given a string <code>s</code>, return the <strong>longest palindromic substring</strong> in <code>s</code>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ s.length ≤ 1000</li><li>s consists of only digits and English letters.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 's = "babad"', output: '"bab"' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
  },
  {
    id: "15",
    title: "Group Anagrams",
    description: `<p>Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ strs.length ≤ 10<sup>4</sup></li><li>0 ≤ strs[i].length ≤ 100</li><li>strs[i] consists of lowercase English letters.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
  },
  {
    id: "16",
    title: "Minimum Window Substring",
    description: `<p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the <strong>minimum window substring</strong> of <code>s</code> such that every character in <code>t</code> (including duplicates) is included in the window.</p>
<p>If there is no such substring, return the empty string <code>""</code>.</p>
<h3>Constraints:</h3>
<ul><li>m == s.length, n == t.length</li><li>1 ≤ m, n ≤ 10<sup>5</sup></li><li>s and t consist of uppercase and lowercase English letters.</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
  },

  // ==================== LINKED LIST ====================
  {
    id: "17",
    title: "Reverse Linked List",
    description: `<p>Given the <code>head</code> of a singly linked list, reverse the list, and return the <strong>reversed list</strong>.</p>
<h3>Constraints:</h3>
<ul><li>The number of nodes in the list is the range [0, 5000].</li><li>-5000 ≤ Node.val ≤ 5000</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
  },
  {
    id: "18",
    title: "Merge Two Sorted Lists",
    description: `<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>
<p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>
<p>Return the head of the merged linked list.</p>
<h3>Constraints:</h3>
<ul><li>The number of nodes in both lists is in the range [0, 50].</li><li>-100 ≤ Node.val ≤ 100</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
  },
  {
    id: "19",
    title: "Linked List Cycle",
    description: `<p>Given <code>head</code>, the head of a linked list, determine if the linked list has a <strong>cycle</strong> in it.</p>
<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the <code>next</code> pointer.</p>
<p>Return <code>true</code> if there is a cycle, otherwise return <code>false</code>.</p>
<h3>Constraints:</h3>
<ul><li>The number of nodes in the list is in the range [0, 10<sup>4</sup>].</li><li>-10<sup>5</sup> ≤ Node.val ≤ 10<sup>5</sup></li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1,2], pos = 0", output: "true" },
      { input: "head = [1], pos = -1", output: "false" },
    ],
  },
  {
    id: "20",
    title: "Add Two Numbers",
    description: `<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit.</p>
<p>Add the two numbers and return the sum as a linked list.</p>
<h3>Constraints:</h3>
<ul><li>The number of nodes in each linked list is in the range [1, 100].</li><li>0 ≤ Node.val ≤ 9</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9], l2 = [9,9,9]", output: "[8,9,9,0,1]" },
    ],
  },
  {
    id: "21",
    title: "Merge K Sorted Lists",
    description: `<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>
<p>Merge all the linked-lists into one sorted linked-list and return it.</p>
<h3>Constraints:</h3>
<ul><li>k == lists.length</li><li>0 ≤ k ≤ 10<sup>4</sup></li><li>0 ≤ lists[i].length ≤ 500</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
      { input: "lists = [[]]", output: "[]" },
    ],
  },

  // ==================== STACK & QUEUE ====================
  {
    id: "22",
    title: "Valid Parentheses",
    description: `<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p>An input string is valid if:</p>
<ul><li>Open brackets must be closed by the same type of brackets.</li><li>Open brackets must be closed in the correct order.</li><li>Every close bracket has a corresponding open bracket of the same type.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
  },
  {
    id: "23",
    title: "Min Stack",
    description: `<p>Design a stack that supports push, pop, top, and retrieving the minimum element in <strong>constant time</strong>.</p>
<p>Implement the <code>MinStack</code> class:</p>
<ul><li><code>MinStack()</code> initializes the stack object.</li><li><code>push(val)</code> pushes the element val onto the stack.</li><li><code>pop()</code> removes the element on the top of the stack.</li><li><code>top()</code> gets the top element of the stack.</li><li><code>getMin()</code> retrieves the minimum element in the stack.</li></ul>
<p>You must implement a solution with <strong>O(1)</strong> time complexity for each function.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: "[null,null,null,null,-3,null,0,-2]" },
    ],
  },
  {
    id: "24",
    title: "Largest Rectangle in Histogram",
    description: `<p>Given an array of integers <code>heights</code> representing the histogram's bar height where the width of each bar is <code>1</code>, return the area of the <strong>largest rectangle</strong> in the histogram.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ heights.length ≤ 10<sup>5</sup></li><li>0 ≤ heights[i] ≤ 10<sup>4</sup></li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "heights = [2,1,5,6,2,3]", output: "10" },
      { input: "heights = [2,4]", output: "4" },
    ],
  },

  // ==================== BINARY SEARCH ====================
  {
    id: "25",
    title: "Binary Search",
    description: `<p>Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.</p>
<p>You must write an algorithm with <strong>O(log n)</strong> runtime complexity.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>4</sup></li><li>All integers in nums are unique.</li><li>nums is sorted in ascending order.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
  },
  {
    id: "26",
    title: "Search in Rotated Sorted Array",
    description: `<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values). Prior to being passed to your function, <code>nums</code> is possibly <strong>rotated</strong> at an unknown pivot index.</p>
<p>Given the array <code>nums</code> after the possible rotation and an integer <code>target</code>, return the <strong>index</strong> of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not.</p>
<p>You must write an algorithm with <strong>O(log n)</strong> runtime complexity.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" },
    ],
  },
  {
    id: "27",
    title: "Find Minimum in Rotated Sorted Array",
    description: `<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times.</p>
<p>Given the sorted rotated array <code>nums</code> of <strong>unique</strong> elements, return the minimum element of this array.</p>
<p>You must write an algorithm that runs in <strong>O(log n)</strong> time.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
      { input: "nums = [11,13,15,17]", output: "11" },
    ],
  },
  {
    id: "28",
    title: "Median of Two Sorted Arrays",
    description: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>
<p>The overall run time complexity should be <strong>O(log (m+n))</strong>.</p>
<h3>Constraints:</h3>
<ul><li>nums1.length == m, nums2.length == n</li><li>0 ≤ m ≤ 1000, 0 ≤ n ≤ 1000</li><li>1 ≤ m + n ≤ 2000</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
  },

  // ==================== TREES ====================
  {
    id: "29",
    title: "Maximum Depth of Binary Tree",
    description: `<p>Given the <code>root</code> of a binary tree, return its <strong>maximum depth</strong>.</p>
<p>A binary tree's maximum depth is the number of nodes along the <strong>longest path</strong> from the root node down to the farthest leaf node.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
  },
  {
    id: "30",
    title: "Invert Binary Tree",
    description: `<p>Given the <code>root</code> of a binary tree, invert the tree, and return its root.</p>
<h3>Constraints:</h3>
<ul><li>The number of nodes in the tree is in the range [0, 100].</li><li>-100 ≤ Node.val ≤ 100</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
      { input: "root = []", output: "[]" },
    ],
  },
  {
    id: "31",
    title: "Same Tree",
    description: `<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p>
<p>Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
  },
  {
    id: "32",
    title: "Binary Tree Level Order Traversal",
    description: `<p>Given the <code>root</code> of a binary tree, return the <strong>level order traversal</strong> of its nodes' values (i.e., from left to right, level by level).</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
      { input: "root = []", output: "[]" },
    ],
  },
  {
    id: "33",
    title: "Validate Binary Search Tree",
    description: `<p>Given the <code>root</code> of a binary tree, determine if it is a <strong>valid binary search tree (BST)</strong>.</p>
<p>A valid BST is defined as follows:</p>
<ul><li>The left subtree of a node contains only nodes with keys <strong>less than</strong> the node's key.</li><li>The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node's key.</li><li>Both the left and right subtrees must also be binary search trees.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
  },
  {
    id: "34",
    title: "Lowest Common Ancestor of a Binary Tree",
    description: `<p>Given a binary tree, find the <strong>lowest common ancestor (LCA)</strong> of two given nodes in the tree.</p>
<p>The lowest common ancestor is defined as the lowest node in the tree that has both <code>p</code> and <code>q</code> as descendants (where a node can be a descendant of itself).</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" },
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5" },
    ],
  },
  {
    id: "35",
    title: "Binary Tree Maximum Path Sum",
    description: `<p>A <strong>path</strong> in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence <strong>at most once</strong>.</p>
<p>The <strong>path sum</strong> of a path is the sum of the node's values in the path.</p>
<p>Given the <code>root</code> of a binary tree, return the <strong>maximum path sum</strong> of any <strong>non-empty</strong> path.</p>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "root = [1,2,3]", output: "6" },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42" },
    ],
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  {
    id: "36",
    title: "Climbing Stairs",
    description: `<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>
<p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ n ≤ 45</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" },
    ],
  },
  {
    id: "37",
    title: "House Robber",
    description: `<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected — <strong>it will automatically contact the police if two adjacent houses were broken into on the same night</strong>.</p>
<p>Given an integer array <code>nums</code> representing the amount of money of each house, return the <strong>maximum amount of money</strong> you can rob tonight <strong>without alerting the police</strong>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,2,3,1]", output: "4" },
      { input: "nums = [2,7,9,3,1]", output: "12" },
    ],
  },
  {
    id: "38",
    title: "Coin Change",
    description: `<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>
<p>Return the <strong>fewest number of coins</strong> that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ coins.length ≤ 12</li><li>1 ≤ coins[i] ≤ 2<sup>31</sup> - 1</li><li>0 ≤ amount ≤ 10<sup>4</sup></li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "coins = [1,5,10,25], amount = 30", output: "2" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" },
    ],
  },
  {
    id: "39",
    title: "Longest Increasing Subsequence",
    description: `<p>Given an integer array <code>nums</code>, return the length of the <strong>longest strictly increasing subsequence</strong>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 2500</li><li>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
      { input: "nums = [7,7,7,7,7,7,7]", output: "1" },
    ],
  },
  {
    id: "40",
    title: "Word Break",
    description: `<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>
<p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true" },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
    ],
  },
  {
    id: "41",
    title: "Edit Distance",
    description: `<p>Given two strings <code>word1</code> and <code>word2</code>, return the <strong>minimum number of operations</strong> required to convert <code>word1</code> to <code>word2</code>.</p>
<p>You have the following three operations permitted on a word:</p>
<ul><li>Insert a character</li><li>Delete a character</li><li>Replace a character</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'word1 = "horse", word2 = "ros"', output: "3" },
      { input: 'word1 = "intention", word2 = "execution"', output: "5" },
    ],
  },

  // ==================== GRAPH ====================
  {
    id: "42",
    title: "Number of Islands",
    description: `<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the <strong>number of islands</strong>.</p>
<p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
  },
  {
    id: "43",
    title: "Clone Graph",
    description: `<p>Given a reference of a node in a <strong>connected undirected graph</strong>, return a <strong>deep copy</strong> (clone) of the graph.</p>
<p>Each node in the graph contains a value (<code>int</code>) and a list of its neighbors.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
  },
  {
    id: "44",
    title: "Course Schedule",
    description: `<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a, b]</code> indicates that you <strong>must</strong> take course <code>b</code> first if you want to take course <code>a</code>.</p>
<p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ],
  },
  {
    id: "45",
    title: "Word Ladder",
    description: `<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return the <strong>number of words</strong> in the shortest transformation sequence from <code>beginWord</code> to <code>endWord</code>, or <code>0</code> if no such sequence exists.</p>
<p>Each adjacent pair of words differs by a single letter. Every transformed word must exist in the word list.</p>`,
    difficulty: "hard" as const,
    testcases: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: "0" },
    ],
  },

  // ==================== MATRIX ====================
  {
    id: "46",
    title: "Set Matrix Zeroes",
    description: `<p>Given an <code>m x n</code> integer matrix <code>matrix</code>, if an element is <code>0</code>, set its entire row and column to <code>0</code>'s.</p>
<p>You must do it <strong>in place</strong>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
      { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" },
    ],
  },
  {
    id: "47",
    title: "Spiral Matrix",
    description: `<p>Given an <code>m x n</code> <code>matrix</code>, return all elements of the <code>matrix</code> in <strong>spiral order</strong>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
    ],
  },
  {
    id: "48",
    title: "Rotate Image",
    description: `<p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90 degrees</strong> (clockwise).</p>
<p>You have to rotate the image <strong>in-place</strong>, which means you have to modify the input 2D matrix directly. <strong>DO NOT</strong> allocate another 2D matrix and do the rotation.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
      { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" },
    ],
  },

  // ==================== BACKTRACKING ====================
  {
    id: "49",
    title: "Subsets",
    description: `<p>Given an integer array <code>nums</code> of <strong>unique</strong> elements, return all possible <strong>subsets</strong> (the power set).</p>
<p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10</li><li>-10 ≤ nums[i] ≤ 10</li><li>All the numbers of nums are unique.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
  },
  {
    id: "50",
    title: "Permutations",
    description: `<p>Given an array <code>nums</code> of distinct integers, return <strong>all the possible permutations</strong>. You can return the answer in <strong>any order</strong>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 6</li><li>-10 ≤ nums[i] ≤ 10</li><li>All the integers of nums are unique.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    ],
  },
  {
    id: "51",
    title: "Combination Sum",
    description: `<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return a list of all <strong>unique combinations</strong> of <code>candidates</code> where the chosen numbers sum to <code>target</code>.</p>
<p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    ],
  },
  {
    id: "52",
    title: "N-Queens",
    description: `<p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>
<p>Given an integer <code>n</code>, return <strong>all distinct solutions</strong> to the n-queens puzzle.</p>
<p>Each solution contains a distinct board configuration of the n-queens' placement, where <code>'Q'</code> and <code>'.'</code> both indicate a queen and an empty space, respectively.</p>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: "n = 1", output: '[["Q"]]' },
    ],
  },

  // ==================== HEAP / PRIORITY QUEUE ====================
  {
    id: "53",
    title: "Kth Largest Element in an Array",
    description: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <strong>k<sup>th</sup> largest</strong> element in the array.</p>
<p>Note that it is the k<sup>th</sup> largest element in the <strong>sorted order</strong>, not the k<sup>th</sup> distinct element.</p>
<p>Can you solve it without sorting?</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
  },
  {
    id: "54",
    title: "Top K Frequent Elements",
    description: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements. You may return the answer in <strong>any order</strong>.</p>
<h3>Constraints:</h3>
<ul><li>1 ≤ nums.length ≤ 10<sup>5</sup></li><li>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></li><li>k is in the range [1, the number of unique elements in the array].</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
  },
  {
    id: "55",
    title: "Find Median from Data Stream",
    description: `<p>The <strong>median</strong> is the middle value in an ordered integer list. If the size of the list is even, the median is the average of the two middle values.</p>
<p>Implement the <code>MedianFinder</code> class:</p>
<ul><li><code>MedianFinder()</code> initializes the object.</li><li><code>addNum(int num)</code> adds the integer from the data stream.</li><li><code>findMedian()</code> returns the median of all elements so far.</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]', output: "[null,null,null,1.5,null,2.0]" },
    ],
  },

  // ==================== GREEDY ====================
  {
    id: "56",
    title: "Jump Game",
    description: `<p>You are given an integer array <code>nums</code>. You are initially positioned at the array's <strong>first index</strong>, and each element in the array represents your maximum jump length at that position.</p>
<p>Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
  },
  {
    id: "57",
    title: "Container With Most Water",
    description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the i<sup>th</sup> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
<p>Return the <strong>maximum amount of water</strong> a container can store.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
  },

  // ==================== BIT MANIPULATION ====================
  {
    id: "58",
    title: "Single Number",
    description: `<p>Given a <strong>non-empty</strong> array of integers <code>nums</code>, every element appears <strong>twice</strong> except for one. Find that single one.</p>
<p>You must implement a solution with a linear runtime complexity and use only constant extra space.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
      { input: "nums = [1]", output: "1" },
    ],
  },
  {
    id: "59",
    title: "Number of 1 Bits",
    description: `<p>Write a function that takes the binary representation of a positive integer and returns the <strong>number of set bits</strong> it has (also known as the Hamming weight).</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "n = 11", output: "3" },
      { input: "n = 128", output: "1" },
      { input: "n = 2147483645", output: "30" },
    ],
  },
  {
    id: "60",
    title: "Reverse Bits",
    description: `<p>Reverse bits of a given 32 bits unsigned integer.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "n = 00000010100101000001111010011100", output: "964176192" },
      { input: "n = 11111111111111111111111111111101", output: "3221225471" },
    ],
  },

  // ==================== INTERVALS ====================
  {
    id: "61",
    title: "Merge Intervals",
    description: `<p>Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
  },
  {
    id: "62",
    title: "Non-overlapping Intervals",
    description: `<p>Given an array of intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, return the <strong>minimum number of intervals</strong> you need to remove to make the rest of the intervals non-overlapping.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" },
      { input: "intervals = [[1,2],[2,3]]", output: "0" },
    ],
  },

  // ==================== MATH ====================
  {
    id: "63",
    title: "Palindrome Number",
    description: `<p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a <strong>palindrome</strong>, and <code>false</code> otherwise.</p>
<h3>Constraints:</h3>
<ul><li>-2<sup>31</sup> ≤ x ≤ 2<sup>31</sup> - 1</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" },
      { input: "x = 10", output: "false" },
    ],
  },
  {
    id: "64",
    title: "FizzBuzz",
    description: `<p>Given an integer <code>n</code>, return a string array <code>answer</code> (1-indexed) where:</p>
<ul><li><code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by 3 and 5.</li><li><code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by 3.</li><li><code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by 5.</li><li><code>answer[i] == i</code> (as a string) if none of the above conditions are true.</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "n = 3", output: '["1","2","Fizz"]' },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
      { input: "n = 15", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
  },
  {
    id: "65",
    title: "Roman to Integer",
    description: `<p>Given a roman numeral, convert it to an integer.</p>
<p>Roman numerals: <code>I=1, V=5, X=10, L=50, C=100, D=500, M=1000</code></p>
<p>Subtraction rules: <code>IV=4, IX=9, XL=40, XC=90, CD=400, CM=900</code></p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: 's = "III"', output: "3" },
      { input: 's = "LVIII"', output: "58" },
      { input: 's = "MCMXCIV"', output: "1994" },
    ],
  },

  // ==================== TRIE ====================
  {
    id: "66",
    title: "Implement Trie (Prefix Tree)",
    description: `<p>A <strong>trie</strong> (pronounced as "try") or <strong>prefix tree</strong> is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.</p>
<p>Implement the Trie class:</p>
<ul><li><code>Trie()</code> Initializes the trie object.</li><li><code>insert(String word)</code> Inserts the string word into the trie.</li><li><code>search(String word)</code> Returns true if the string word is in the trie.</li><li><code>startsWith(String prefix)</code> Returns true if there is a previously inserted string word that has the prefix.</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output: "[null,null,true,false,true,null,true]" },
    ],
  },

  // ==================== DESIGN ====================
  {
    id: "67",
    title: "LRU Cache",
    description: `<p>Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU) cache</strong>.</p>
<p>Implement the <code>LRUCache</code> class:</p>
<ul><li><code>LRUCache(int capacity)</code> Initialize the LRU cache with positive size capacity.</li><li><code>int get(int key)</code> Return the value of the key if the key exists, otherwise return -1.</li><li><code>void put(int key, int value)</code> Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.</li></ul>
<p>The functions <code>get</code> and <code>put</code> must each run in <strong>O(1)</strong> average time complexity.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: "[null,null,null,1,null,-1,null,-1,3,4]" },
    ],
  },

  // ==================== TWO POINTERS ====================
  {
    id: "68",
    title: "Trapping Rain Water",
    description: `<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>
<h3>Constraints:</h3>
<ul><li>n == height.length</li><li>1 ≤ n ≤ 2 × 10<sup>4</sup></li><li>0 ≤ height[i] ≤ 10<sup>5</sup></li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
  },

  // ==================== HASH MAP ====================
  {
    id: "69",
    title: "Longest Consecutive Sequence",
    description: `<p>Given an unsorted array of integers <code>nums</code>, return the <strong>length of the longest consecutive elements sequence</strong>.</p>
<p>You must write an algorithm that runs in <strong>O(n)</strong> time.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "nums = [100,4,200,1,3,2]", output: "4" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
  },
  {
    id: "70",
    title: "Majority Element",
    description: `<p>Given an array <code>nums</code> of size <code>n</code>, return the <strong>majority element</strong>.</p>
<p>The majority element is the element that appears more than <code>⌊n / 2⌋</code> times. You may assume that the majority element always exists in the array.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "nums = [3,2,3]", output: "3" },
      { input: "nums = [2,2,1,1,1,2,2]", output: "2" },
    ],
  },

  // ====================================================================
  //  FRONTEND ENGINEERING PROBLEMS
  // ====================================================================

  // ==================== JAVASCRIPT UTILITIES ====================
  {
    id: "71",
    title: "Debounce",
    description: `<p>Implement a <code>debounce</code> function that delays invoking the provided callback until after <code>wait</code> milliseconds have elapsed since the last time it was invoked.</p>
<p>The debounced function should:</p>
<ul><li>Delay the execution of <code>callback</code> by <code>wait</code> ms.</li><li>If called again before the timer expires, reset the timer.</li><li>Return a function that accepts any number of arguments and passes them to <code>callback</code>.</li></ul>
<pre><code>function debounce(func, wait) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "debounce(fn, 300) called 3 times within 100ms", output: "fn called once after 300ms from last call" },
      { input: "debounce(fn, 0) called once", output: "fn called immediately on next tick" },
    ],
  },
  {
    id: "72",
    title: "Throttle",
    description: `<p>Implement a <code>throttle</code> function that limits the rate at which a function can fire. The throttled function should be invoked at most once per <code>wait</code> milliseconds.</p>
<ul><li>The first call should execute immediately.</li><li>Subsequent calls within the <code>wait</code> period are ignored.</li><li>After the wait period, the next call will execute.</li></ul>
<pre><code>function throttle(func, wait) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "throttle(fn, 300) called every 100ms for 1s", output: "fn called at 0ms, 300ms, 600ms, 900ms" },
      { input: "throttle(fn, 1000) called once", output: "fn called immediately" },
    ],
  },
  {
    id: "73",
    title: "Promise.all",
    description: `<p>Implement the <code>Promise.all()</code> method.</p>
<p><code>Promise.all()</code> takes an iterable of promises and returns a single promise that:</p>
<ul><li>Resolves when <strong>all</strong> input promises resolve, with an array of their results in the same order.</li><li>Rejects immediately when <strong>any</strong> input promise rejects, with that rejection reason.</li></ul>
<pre><code>function promiseAll(promises) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "promiseAll([resolve(1), resolve(2), resolve(3)])", output: "[1, 2, 3]" },
      { input: "promiseAll([resolve(1), reject('error'), resolve(3)])", output: "Rejects with 'error'" },
      { input: "promiseAll([])", output: "[]" },
    ],
  },
  {
    id: "74",
    title: "Deep Clone",
    description: `<p>Implement a <code>deepClone</code> function that creates a deep copy of a given value.</p>
<p>Your implementation should handle:</p>
<ul><li>Primitive values (string, number, boolean, null, undefined)</li><li>Arrays (including nested arrays)</li><li>Plain objects (including nested objects)</li><li>Date objects</li><li>RegExp objects</li></ul>
<p>You do not need to handle: functions, Maps, Sets, WeakMaps, Symbols, or circular references.</p>
<pre><code>function deepClone(value) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'deepClone({ a: 1, b: { c: 2 } })', output: '{ a: 1, b: { c: 2 } } (new reference)' },
      { input: "deepClone([1, [2, [3]]])", output: "[1, [2, [3]]] (new reference)" },
      { input: "deepClone(new Date('2024-01-01'))", output: "Date('2024-01-01') (new instance)" },
    ],
  },
  {
    id: "75",
    title: "Flatten Array",
    description: `<p>Implement a function <code>flatten</code> that flattens a nested array into a single-level array.</p>
<p>An optional <code>depth</code> parameter controls how many levels deep to flatten. If not provided, fully flatten the array.</p>
<pre><code>function flatten(arr, depth = Infinity) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "flatten([1, [2, [3, [4]]]])", output: "[1, 2, 3, 4]" },
      { input: "flatten([1, [2, [3, [4]]]], 1)", output: "[1, 2, [3, [4]]]" },
      { input: "flatten([1, [2], 3])", output: "[1, 2, 3]" },
    ],
  },
  {
    id: "76",
    title: "Curry",
    description: `<p>Implement a <code>curry</code> function that transforms a function so it can be called with fewer arguments than it expects, returning a new function that takes the remaining arguments.</p>
<pre><code>function curry(func) {
  // Your implementation
}

// Example usage:
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "curry(add)(1)(2)(3)", output: "6" },
      { input: "curry(add)(1, 2)(3)", output: "6" },
      { input: "curry(add)(1)(2, 3)", output: "6" },
    ],
  },
  {
    id: "77",
    title: "Event Emitter",
    description: `<p>Implement an <code>EventEmitter</code> class with the following methods:</p>
<ul><li><code>on(event, listener)</code> — Register a listener for an event. Returns the emitter for chaining.</li><li><code>off(event, listener)</code> — Remove a specific listener for an event.</li><li><code>emit(event, ...args)</code> — Trigger all listeners for an event with the given arguments.</li><li><code>once(event, listener)</code> — Register a listener that is automatically removed after it fires once.</li></ul>
<pre><code>class EventEmitter {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'emitter.on("click", fn); emitter.emit("click", data)', output: "fn called with data" },
      { input: 'emitter.once("load", fn); emitter.emit("load"); emitter.emit("load")', output: "fn called only once" },
    ],
  },
  {
    id: "78",
    title: "Memoize",
    description: `<p>Implement a <code>memoize</code> function that caches the result of a function call based on its arguments.</p>
<p>If the function is called again with the same arguments, return the cached result instead of recomputing.</p>
<pre><code>function memoize(func) {
  // Your implementation
}</code></pre>
<p>Consider: How will you create a cache key from the arguments? What about objects as arguments?</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "memoized(1, 2) called twice", output: "func called once, second returns cached result" },
      { input: "memoized(1, 2) then memoized(2, 1)", output: "func called twice (different args)" },
    ],
  },
  {
    id: "79",
    title: "Function.prototype.bind",
    description: `<p>Implement <code>Function.prototype.bind</code> from scratch.</p>
<p>The <code>bind()</code> method creates a new function that, when called, has its <code>this</code> keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.</p>
<pre><code>Function.prototype.myBind = function(thisArg, ...args) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "fn.myBind(obj)(arg1)", output: "Same as fn.bind(obj)(arg1)" },
      { input: "fn.myBind(obj, 1)(2, 3)", output: "fn called with this=obj, args=[1,2,3]" },
    ],
  },
  {
    id: "80",
    title: "JSON.stringify",
    description: `<p>Implement a simplified version of <code>JSON.stringify</code>.</p>
<p>Your implementation should handle:</p>
<ul><li>Primitives: strings, numbers, booleans, null</li><li>Arrays (nested)</li><li>Plain objects (nested)</li><li><code>undefined</code> values should be omitted from objects and become <code>null</code> in arrays</li></ul>
<pre><code>function jsonStringify(value) {
  // Your implementation
}</code></pre>`,
    difficulty: "hard" as const,
    testcases: [
      { input: 'jsonStringify({ a: 1, b: "hello" })', output: '\'{"a":1,"b":"hello"}\'' },
      { input: "jsonStringify([1, null, true, undefined])", output: "'[1,null,true,null]'" },
      { input: "jsonStringify(42)", output: "'42'" },
    ],
  },
  {
    id: "81",
    title: "Deep Equal",
    description: `<p>Implement a function <code>deepEqual</code> that checks if two values are deeply equal.</p>
<p>Should handle primitives, arrays, plain objects, <code>null</code>, <code>NaN</code>, and nested structures.</p>
<pre><code>function deepEqual(a, b) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "deepEqual({ a: { b: 1 }}, { a: { b: 1 }})", output: "true" },
      { input: "deepEqual([1, [2]], [1, [2]])", output: "true" },
      { input: "deepEqual({ a: 1 }, { a: 2 })", output: "false" },
      { input: "deepEqual(NaN, NaN)", output: "true" },
    ],
  },
  {
    id: "82",
    title: "Promise.race",
    description: `<p>Implement <code>Promise.race()</code>.</p>
<p>It takes an iterable of promises and returns a single promise that settles with the state of the first promise to settle (either resolve or reject).</p>
<pre><code>function promiseRace(promises) {
  // Your implementation
}</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "promiseRace([delay(100, 'a'), delay(50, 'b')])", output: "Resolves with 'b'" },
      { input: "promiseRace([reject('err'), delay(50, 'ok')])", output: "Rejects with 'err'" },
    ],
  },
  {
    id: "83",
    title: "Sleep",
    description: `<p>Implement a <code>sleep</code> function that returns a promise which resolves after <code>ms</code> milliseconds.</p>
<pre><code>function sleep(ms) {
  // Your implementation
}

// Usage:
await sleep(1000); // pauses for 1 second</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "await sleep(100)", output: "Resolves after ~100ms" },
      { input: "await sleep(0)", output: "Resolves on next tick" },
    ],
  },
  {
    id: "84",
    title: "Array.prototype.reduce",
    description: `<p>Implement <code>Array.prototype.reduce</code> from scratch.</p>
<p>The <code>reduce()</code> method executes a user-supplied reducer callback function on each element of the array, passing in the return value from the previous element. The final result is a single value.</p>
<pre><code>Array.prototype.myReduce = function(callback, initialValue) {
  // Your implementation
}</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "[1,2,3].myReduce((acc, val) => acc + val, 0)", output: "6" },
      { input: "[1,2,3].myReduce((acc, val) => acc + val)", output: "6 (uses first element as initial)" },
    ],
  },
  {
    id: "85",
    title: "Classnames",
    description: `<p>Implement the popular <code>classnames</code> utility function that conditionally joins class names together.</p>
<p>It accepts any number of arguments which can be strings, objects, or arrays:</p>
<pre><code>function classnames(...args) {
  // Your implementation
}

classnames('foo', 'bar');           // 'foo bar'
classnames('foo', { bar: true });   // 'foo bar'
classnames({ foo: true }, { bar: false }); // 'foo'
classnames(['foo', 'bar']);         // 'foo bar'</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "classnames('foo', 'bar')", output: "'foo bar'" },
      { input: "classnames('foo', { bar: true, baz: false })", output: "'foo bar'" },
      { input: "classnames(['a', { b: true }], 'c')", output: "'a b c'" },
    ],
  },
  {
    id: "86",
    title: "Get Nested Value",
    description: `<p>Implement a <code>get</code> function (like Lodash's <code>_.get</code>) that retrieves the value at a given path of an object.</p>
<p>If the path doesn't exist, return a default value.</p>
<pre><code>function get(object, path, defaultValue) {
  // Your implementation
}

get({ a: { b: { c: 3 }}}, 'a.b.c');     // 3
get({ a: { b: { c: 3 }}}, 'a.b.d', 0);  // 0</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "get({ a: { b: 1 }}, 'a.b')", output: "1" },
      { input: "get({ a: [1, 2] }, 'a[1]')", output: "2" },
      { input: "get({}, 'a.b.c', 'default')", output: "'default'" },
    ],
  },

  // ==================== DOM MANIPULATION ====================
  {
    id: "87",
    title: "getElementsByClassName",
    description: `<p>Implement <code>document.getElementsByClassName</code> from scratch.</p>
<p>Given a DOM tree root node and a class name string, return an array of all elements in the DOM tree that have the given class name.</p>
<pre><code>function getElementsByClassName(root, className) {
  // Your implementation using DOM traversal
}</code></pre>
<p>You cannot use <code>document.getElementsByClassName</code> or <code>querySelectorAll</code>.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "getElementsByClassName(root, 'active')", output: "Array of all elements with class 'active'" },
      { input: "getElementsByClassName(root, 'nonexistent')", output: "[]" },
    ],
  },
  {
    id: "88",
    title: "jQuery CSS Selector",
    description: `<p>Implement a simplified jQuery-like <code>$(selector).css(prop, value)</code> function.</p>
<ul><li><code>$(selector)</code> — Select elements matching the CSS selector.</li><li><code>.css(property)</code> — Get the computed style property value.</li><li><code>.css(property, value)</code> — Set the style property on all selected elements.</li></ul>
<pre><code>function $(selector) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "$('.box').css('color', 'red')", output: "All .box elements have color: red" },
      { input: "$('#main').css('display')", output: "Returns computed display value" },
    ],
  },
  {
    id: "89",
    title: "Identical DOM Trees",
    description: `<p>Implement a function that checks if two DOM trees are identical.</p>
<p>Two DOM trees are identical if they have the same structure and the same attributes/text content at every node.</p>
<pre><code>function isIdentical(treeA, treeB) {
  // Your implementation
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "isIdentical(div1, div2) where both are <div><p>Hi</p></div>", output: "true" },
      { input: "isIdentical(div1, div2) where div1 has extra class", output: "false" },
    ],
  },
  {
    id: "90",
    title: "Table of Contents Generator",
    description: `<p>Implement a function that generates a table of contents from an HTML document.</p>
<p>Scan the document for heading elements (<code>h1</code> through <code>h6</code>) and generate a nested list structure representing the document outline.</p>
<pre><code>function generateTOC(doc) {
  // Your implementation
  // Returns nested array of { text, level, children }
}</code></pre>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "Document with h1, h2, h2, h3", output: "Nested TOC with correct hierarchy" },
      { input: "Document with no headings", output: "[]" },
    ],
  },

  // ==================== UI COMPONENTS ====================
  {
    id: "91",
    title: "Counter",
    description: `<p>Build a simple <strong>counter</strong> component with the following features:</p>
<ul><li>Display the current count (starting at 0)</li><li>An <strong>increment</strong> button that adds 1</li><li>A <strong>decrement</strong> button that subtracts 1</li><li>A <strong>reset</strong> button that sets the count back to 0</li></ul>
<p>Style the component with a clean, modern look. The count should be prominently displayed.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Click increment 3 times", output: "Count displays 3" },
      { input: "Click increment 2x, decrement 1x", output: "Count displays 1" },
      { input: "Click increment 5x, then reset", output: "Count displays 0" },
    ],
  },
  {
    id: "92",
    title: "Todo List",
    description: `<p>Build a fully functional <strong>Todo List</strong> application:</p>
<ul><li>Add new todos via an input field + button or Enter key</li><li>Mark todos as complete (checkbox / strikethrough)</li><li>Delete individual todos</li><li>Show count of remaining incomplete todos</li><li>Filter todos: All / Active / Completed</li><li>Clear all completed todos button</li></ul>
<p>Empty input should not create a todo. Persist todos in localStorage.</p>`,
    difficulty: "medium" as const,
    testcases: [
      { input: 'Type "Buy milk" and press Enter', output: "Todo added to list" },
      { input: "Click checkbox on first todo", output: "Todo marked as complete with strikethrough" },
      { input: "Click delete on a todo", output: "Todo removed from list" },
    ],
  },
  {
    id: "93",
    title: "Star Rating",
    description: `<p>Build an interactive <strong>Star Rating</strong> component:</p>
<ul><li>Display 5 stars (empty by default)</li><li>Hovering over a star highlights it and all previous stars</li><li>Clicking a star sets the rating</li><li>Clicking the same star again resets the rating to 0</li><li>The component should accept an <code>onChange</code> callback</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Hover over star 3", output: "Stars 1-3 highlighted" },
      { input: "Click star 4", output: "Rating set to 4, stars 1-4 filled" },
      { input: "Click star 4 again", output: "Rating reset to 0" },
    ],
  },
  {
    id: "94",
    title: "Tabs",
    description: `<p>Build a <strong>Tabs</strong> component that shows different content panels based on which tab is selected:</p>
<ul><li>Display a row of tab buttons</li><li>Clicking a tab shows its associated content panel</li><li>The active tab should be visually highlighted</li><li>Only one tab can be active at a time</li><li>Support keyboard navigation (Arrow Left/Right to switch tabs)</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Click on Tab 2", output: "Tab 2 content visible, Tab 2 button highlighted" },
      { input: "Press ArrowRight on focused tab", output: "Next tab becomes active" },
    ],
  },
  {
    id: "95",
    title: "Accordion",
    description: `<p>Build an <strong>Accordion</strong> component:</p>
<ul><li>Display a list of collapsible sections with title and content</li><li>Clicking a section title toggles its content visibility</li><li>Only one section can be open at a time (single-expand mode)</li><li>Smooth expand/collapse animation</li><li>Show a chevron indicator that rotates when expanded</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Click Section 1 header", output: "Section 1 content expands" },
      { input: "Click Section 2 while Section 1 is open", output: "Section 1 collapses, Section 2 expands" },
    ],
  },
  {
    id: "96",
    title: "Modal Dialog",
    description: `<p>Build a reusable <strong>Modal Dialog</strong> component:</p>
<ul><li>Opens centered on screen with a backdrop overlay</li><li>Close on backdrop click, Escape key, or close button</li><li>Prevent body scrolling when modal is open</li><li>Trap focus inside the modal (tab cycling)</li><li>Animated open/close transitions</li><li>Support custom title, content, and action buttons</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Open modal", output: "Modal visible, backdrop shown, body scroll locked" },
      { input: "Press Escape", output: "Modal closes with animation" },
      { input: "Tab through modal elements", output: "Focus stays trapped inside modal" },
    ],
  },
  {
    id: "97",
    title: "Image Carousel",
    description: `<p>Build an <strong>Image Carousel</strong> / slider:</p>
<ul><li>Display one image at a time with left/right navigation arrows</li><li>Dot indicators showing current position</li><li>Auto-play with configurable interval (pause on hover)</li><li>Smooth slide transitions</li><li>Infinite loop (wraps around at the ends)</li><li>Swipe support for touch devices</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Click right arrow", output: "Slides to next image with animation" },
      { input: "Click dot indicator 3", output: "Jumps to image 3" },
      { input: "Wait 3 seconds", output: "Auto-advances to next image" },
    ],
  },
  {
    id: "98",
    title: "Stopwatch",
    description: `<p>Build a <strong>Stopwatch</strong> application:</p>
<ul><li>Display time in <code>MM:SS.ms</code> format</li><li>Start, Stop, and Reset buttons</li><li>Lap functionality — record split times</li><li>Display list of recorded laps</li><li>Highlight fastest and slowest laps</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Click Start", output: "Timer starts counting" },
      { input: "Click Lap while running", output: "Lap time recorded and displayed" },
      { input: "Click Stop then Reset", output: "Timer stops, resets to 00:00.00, laps cleared" },
    ],
  },
  {
    id: "99",
    title: "Tic-Tac-Toe",
    description: `<p>Build a complete <strong>Tic-Tac-Toe</strong> game:</p>
<ul><li>3x3 grid where players alternate placing X and O</li><li>Detect and announce the winner</li><li>Detect and announce a draw</li><li>Highlight the winning line</li><li>Show whose turn it is</li><li>Reset/new game button</li><li>Score tracking across rounds</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "X plays top-left, O plays center", output: "Board shows X and O, display O's turn" },
      { input: "X gets 3 in a row", output: "Winner announced, winning cells highlighted" },
      { input: "All cells filled with no winner", output: "Draw announced" },
    ],
  },
  {
    id: "100",
    title: "Data Table",
    description: `<p>Build a <strong>Data Table</strong> component with the following features:</p>
<ul><li>Render tabular data with column headers</li><li>Sortable columns (click header to toggle asc/desc)</li><li>Search / filter across all columns</li><li>Pagination with configurable page size</li><li>Row selection with checkboxes (select all / individual)</li><li>Responsive: horizontal scroll on small screens</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "Click 'Name' column header", output: "Rows sorted by name ascending" },
      { input: "Type 'john' in search", output: "Only rows containing 'john' shown" },
      { input: "Click next page", output: "Next set of rows displayed" },
    ],
  },
  {
    id: "101",
    title: "File Explorer",
    description: `<p>Build a <strong>File Explorer</strong> UI component:</p>
<ul><li>Display a tree of folders and files</li><li>Expand/collapse folders by clicking</li><li>Indent nested items to show hierarchy</li><li>Show folder/file icons</li><li>Highlight selected item</li><li>Support keyboard navigation (arrow keys, Enter to expand)</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "Click on folder 'src'", output: "Folder expands showing children" },
      { input: "Click on expanded folder", output: "Folder collapses" },
      { input: "Press ArrowDown, ArrowDown, Enter", output: "Navigate and expand third item" },
    ],
  },
  {
    id: "102",
    title: "Traffic Light",
    description: `<p>Build an animated <strong>Traffic Light</strong> that cycles through red, yellow, and green:</p>
<ul><li>Red light for 4 seconds</li><li>Green light for 3 seconds</li><li>Yellow light for 1 second</li><li>Cycle continuously</li><li>Active light should glow, inactive lights should be dimmed</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Initial state", output: "Red light active" },
      { input: "After 4 seconds", output: "Green light active" },
      { input: "After 7 seconds", output: "Yellow light active" },
    ],
  },
  {
    id: "103",
    title: "Progress Bar",
    description: `<p>Build an animated <strong>Progress Bar</strong> component:</p>
<ul><li>Accept a <code>value</code> prop (0-100) for the fill percentage</li><li>Smooth transition animation when value changes</li><li>Display percentage text centered inside the bar</li><li>Color changes based on progress: red (0-33), yellow (34-66), green (67-100)</li><li>Accessible with <code>role="progressbar"</code> and proper aria attributes</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "value = 50", output: "Bar filled 50%, yellow color, shows '50%'" },
      { input: "value changes from 30 to 80", output: "Smooth animation to 80%, color changes to green" },
    ],
  },
  {
    id: "104",
    title: "Mortgage Calculator",
    description: `<p>Build a <strong>Mortgage Calculator</strong>:</p>
<ul><li>Inputs: loan amount, annual interest rate (%), loan term (years)</li><li>Calculate and display: monthly payment, total payment, total interest</li><li>Real-time calculation as inputs change</li><li>Input validation (positive numbers only)</li><li>Format currency values properly</li></ul>
<p>Formula: <code>M = P[r(1+r)^n] / [(1+r)^n - 1]</code> where P = principal, r = monthly rate, n = total payments</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Loan: $300,000, Rate: 6.5%, Term: 30 years", output: "Monthly: $1,896.20" },
      { input: "Empty loan amount", output: "Validation error shown" },
    ],
  },
  {
    id: "105",
    title: "Contact Form",
    description: `<p>Build a <strong>Contact Form</strong> with validation:</p>
<ul><li>Fields: Name, Email, Phone (optional), Message</li><li>Real-time validation with error messages</li><li>Email format validation</li><li>Name and message required (min 2 and 10 chars)</li><li>Submit button disabled until form is valid</li><li>Show success message on submit</li><li>Clear form after successful submission</li></ul>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Submit with empty fields", output: "Validation errors shown" },
      { input: "Enter invalid email format", output: "'Invalid email' error shown" },
      { input: "Fill all fields correctly and submit", output: "Success message, form cleared" },
    ],
  },

  // ==================== REACT HOOKS ====================
  {
    id: "106",
    title: "useDebounce Hook",
    description: `<p>Implement a custom React hook <code>useDebounce</code> that debounces a value.</p>
<pre><code>function useDebounce(value, delay) {
  // Your implementation
  // Returns the debounced value
}

// Usage:
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);
// debouncedSearch updates 300ms after search stops changing</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Type 'hello' quickly", output: "debouncedValue updates once to 'hello' after delay" },
      { input: "Change delay from 300 to 500", output: "Debounce timing adjusts" },
    ],
  },
  {
    id: "107",
    title: "useLocalStorage Hook",
    description: `<p>Implement a custom React hook <code>useLocalStorage</code> that syncs state with localStorage.</p>
<pre><code>function useLocalStorage(key, initialValue) {
  // Returns [storedValue, setValue]
  // Reads from localStorage on mount
  // Writes to localStorage on updates
  // Handles JSON serialization/deserialization
}

// Usage:
const [theme, setTheme] = useLocalStorage('theme', 'dark');</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "First render with key 'theme'", output: "Returns initialValue if key not in localStorage" },
      { input: "Call setValue('light')", output: "State updates and localStorage.setItem called" },
      { input: "Remount component", output: "Reads persisted value from localStorage" },
    ],
  },
  {
    id: "108",
    title: "useFetch Hook",
    description: `<p>Implement a custom React hook <code>useFetch</code> for data fetching:</p>
<pre><code>function useFetch(url, options) {
  // Returns { data, loading, error, refetch }
  // Fetches data on mount and when url changes
  // Handles loading and error states
  // Cancels request on unmount (AbortController)
  // refetch() to manually re-trigger
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "useFetch('/api/users')", output: "{ data: [...], loading: false, error: null }" },
      { input: "URL changes", output: "New request made, loading: true" },
      { input: "Component unmounts during fetch", output: "Request aborted, no state update" },
    ],
  },
  {
    id: "109",
    title: "useClickOutside Hook",
    description: `<p>Implement a custom React hook <code>useClickOutside</code> that detects clicks outside a referenced element.</p>
<pre><code>function useClickOutside(ref, handler) {
  // Calls handler when a click occurs outside ref.current
  // Useful for closing dropdowns, modals, etc.
}

// Usage:
const ref = useRef(null);
useClickOutside(ref, () => setIsOpen(false));</code></pre>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Click outside the referenced element", output: "handler called" },
      { input: "Click inside the referenced element", output: "handler NOT called" },
    ],
  },
  {
    id: "110",
    title: "useIntersectionObserver Hook",
    description: `<p>Implement a custom React hook <code>useIntersectionObserver</code> for detecting when an element enters the viewport.</p>
<pre><code>function useIntersectionObserver(ref, options) {
  // Returns { isIntersecting, entry }
  // Uses IntersectionObserver API
  // Cleans up observer on unmount
  // Useful for lazy loading, infinite scroll, animations
}</code></pre>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Element scrolls into view", output: "isIntersecting becomes true" },
      { input: "Element scrolls out of view", output: "isIntersecting becomes false" },
    ],
  },

  // ==================== CSS CHALLENGES ====================
  {
    id: "111",
    title: "Holy Grail Layout",
    description: `<p>Build the classic <strong>Holy Grail Layout</strong> using CSS:</p>
<ul><li>Fixed header at the top</li><li>Fixed footer at the bottom</li><li>Three-column layout: left sidebar, main content, right sidebar</li><li>Sidebars have fixed width, main content is fluid</li><li>Footer sticks to the bottom even with little content</li><li>Responsive: stack columns vertically on mobile</li></ul>
<p>Implement using CSS Flexbox or Grid. No JavaScript needed.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Desktop viewport (1200px)", output: "Three-column layout with header and footer" },
      { input: "Mobile viewport (375px)", output: "Single column, stacked layout" },
      { input: "Very little content", output: "Footer still at bottom of viewport" },
    ],
  },
  {
    id: "112",
    title: "Responsive Navbar",
    description: `<p>Build a <strong>Responsive Navigation Bar</strong>:</p>
<ul><li>Logo on the left, nav links on the right</li><li>Horizontal nav links on desktop</li><li>Hamburger menu on mobile that toggles a dropdown</li><li>Smooth open/close animation for mobile menu</li><li>Active link highlighting</li><li>Sticky positioning on scroll</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Desktop viewport", output: "Horizontal nav links visible, no hamburger" },
      { input: "Mobile viewport", output: "Hamburger icon visible, links hidden" },
      { input: "Click hamburger on mobile", output: "Dropdown menu slides in" },
    ],
  },
  {
    id: "113",
    title: "CSS Grid Dashboard",
    description: `<p>Build a <strong>Dashboard Layout</strong> using CSS Grid:</p>
<ul><li>Sidebar on the left (collapsible)</li><li>Top bar with search and user avatar</li><li>Main content area with a grid of cards</li><li>Cards auto-fill available space (<code>auto-fit</code> / <code>auto-fill</code>)</li><li>Minimum card width of 250px</li><li>Gap between cards</li><li>Responsive: sidebar collapses to icons on medium, hides on mobile</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Desktop 1440px", output: "Sidebar + 4 cards per row" },
      { input: "Tablet 768px", output: "Icon-only sidebar + 2 cards per row" },
      { input: "Mobile 375px", output: "No sidebar + 1 card per row" },
    ],
  },
  {
    id: "114",
    title: "CSS Loading Spinner",
    description: `<p>Build 3 different <strong>CSS-only loading spinners</strong> without any JavaScript:</p>
<ol><li><strong>Rotating ring</strong> — a ring that spins with a gradient or gap</li><li><strong>Bouncing dots</strong> — 3 dots that bounce with staggered delays</li><li><strong>Pulse</strong> — a circle that pulses/scales in and out</li></ol>
<p>Use only CSS animations (<code>@keyframes</code>). Keep the HTML minimal.</p>`,
    difficulty: "easy" as const,
    testcases: [
      { input: "Render spinner 1", output: "Smooth rotating ring animation" },
      { input: "Render spinner 2", output: "Three dots bouncing with stagger" },
      { input: "Render spinner 3", output: "Pulsing circle animation" },
    ],
  },
  {
    id: "115",
    title: "Pixel Art Grid",
    description: `<p>Build a <strong>Pixel Art</strong> drawing tool:</p>
<ul><li>Configurable grid size (e.g., 16x16, 32x32)</li><li>Color picker to select drawing color</li><li>Click or drag to paint cells</li><li>Eraser mode</li><li>Clear grid button</li><li>Export as image (bonus)</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "Select red, click cell (3,4)", output: "Cell turns red" },
      { input: "Drag across multiple cells", output: "All dragged cells painted" },
      { input: "Click clear", output: "All cells reset to white" },
    ],
  },

  // ==================== ASYNC / SYSTEM DESIGN ====================
  {
    id: "116",
    title: "Infinite Scroll",
    description: `<p>Implement an <strong>Infinite Scroll</strong> list:</p>
<ul><li>Load initial batch of items (e.g., 20)</li><li>When user scrolls near the bottom, fetch the next batch</li><li>Show a loading indicator while fetching</li><li>Handle end-of-data (no more items to load)</li><li>Smooth scrolling experience (no layout shifts)</li><li>Use Intersection Observer for scroll detection</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Initial load", output: "First 20 items rendered" },
      { input: "Scroll to bottom", output: "Loading spinner, then next 20 items appended" },
      { input: "All items loaded", output: "'No more items' message" },
    ],
  },
  {
    id: "117",
    title: "Autocomplete / Typeahead",
    description: `<p>Build an <strong>Autocomplete</strong> search input:</p>
<ul><li>Debounced API call as user types (300ms)</li><li>Dropdown showing matching suggestions</li><li>Keyboard navigation (ArrowUp/Down to navigate, Enter to select)</li><li>Highlight matching text in suggestions</li><li>Close dropdown on blur or Escape</li><li>Loading state while fetching</li><li>Handle race conditions (stale responses)</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: "Type 'rea'", output: "Dropdown shows suggestions containing 'rea', 'rea' highlighted" },
      { input: "Press ArrowDown twice, then Enter", output: "Second suggestion selected" },
      { input: "Type fast then stop", output: "Only one API call made (debounced)" },
    ],
  },
  {
    id: "118",
    title: "Job Board",
    description: `<p>Build a <strong>Job Board</strong> page that fetches and displays job listings:</p>
<ul><li>Fetch jobs from an API endpoint</li><li>Display job cards with title, company, location, and posted date</li><li>"Load more" button to fetch additional jobs</li><li>Loading states and error handling</li><li>Click a job card to expand and show full description</li><li>Responsive grid layout</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Page load", output: "First 6 jobs displayed in grid" },
      { input: "Click 'Load More'", output: "Next 6 jobs appended" },
      { input: "Click a job card", output: "Full description expanded/shown" },
    ],
  },
  {
    id: "119",
    title: "Memory Game",
    description: `<p>Build a <strong>Memory / Matching Card Game</strong>:</p>
<ul><li>Grid of face-down cards (4x4 or configurable)</li><li>Flip two cards per turn — if they match, they stay face-up</li><li>If they don't match, flip them back after a short delay</li><li>Track number of moves/attempts</li><li>Win condition: all pairs matched</li><li>Timer tracking how long the game takes</li><li>New game / shuffle button</li></ul>`,
    difficulty: "medium" as const,
    testcases: [
      { input: "Click first card", output: "Card flips to reveal icon" },
      { input: "Click second card (no match)", output: "Both cards flip back after 1s" },
      { input: "Match all pairs", output: "Win message with moves count and time" },
    ],
  },
  {
    id: "120",
    title: "Wordle Clone",
    description: `<p>Build a <strong>Wordle</strong> clone:</p>
<ul><li>5-letter word guessing game with 6 attempts</li><li>On-screen keyboard and physical keyboard input</li><li>Color feedback: green (correct position), yellow (wrong position), gray (not in word)</li><li>Keyboard keys update to show used letters and their status</li><li>Shake animation for invalid words</li><li>Flip animation when revealing results</li><li>Win/lose modal with share functionality</li></ul>`,
    difficulty: "hard" as const,
    testcases: [
      { input: 'Type "CRANE" and press Enter', output: "Letters colored based on target word" },
      { input: "Type 4-letter word and press Enter", output: "Shake animation, guess not submitted" },
      { input: "Guess correct word", output: "Win modal with stats" },
    ],
  },
];
