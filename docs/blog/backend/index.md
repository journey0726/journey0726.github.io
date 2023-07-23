```rust
// rust
// leetcode 两数之和

use std::collections::HashMap;
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map:HashMap<i32, i32> = HashMap::new();

        for (index, value) in nums.into_iter().enumerate() {
          if let Some(&x) = map.get(&(target - value)) {
            return vec![x, index as i32];
          }
          map.insert(value, index as i32);

        }
        vec![]
    }
}

```
