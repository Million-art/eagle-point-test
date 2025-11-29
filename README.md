# Task 1. Smart Text Analyzer
I understand the task and Its string manipulation and i have good understanding of it.

1. first i need to make sure to remove the punctuation from the text and then split it into words. for this i use https://www.geeksforgeeks.org/javascript/javascript-program-to-count-words-of-a-string/ as a reference.

2. then i need to count the total number of words in the text. and i use .length to count the number of words.

3. then i need to count the average word length.
   i prefer to use .reduce method to count the total length of all words because it is more readable and it is more performant than using a for loop.

4. then i need to find the longest word(s) in the text.
   i use Math.max with spread operator and map to find the maximum length because Math.max requires individual arguments not an array.
   then i use filter to get all words that match the maximum length which handles ties automatically.
   i chose this approach over a single loop because it's more readable and follows functional programming style, even though a single loop would be slightly more efficient.

5. then i need to remove duplicates from the longest words list.
   i use new Set to automatically remove duplicates, then spread it back to an array.
   alternative: Array.from with new Set does the same thing but spread operator is more concise.

6. then i need to count the word frequency in the text.
   i use forEach to iterate through all words and an object to store the frequency count.
   for each word, i increment its count and the OR operator handles the first occurrence when the word doesn't exist yet in the object.
   alternative: i could use reduce but forEach with an object is more straightforward for this use case.

7. then i need to return the results in an object.

# Task 2. Async Fetch with Retry
1. i created an async function fetchWithRetry that takes a URL and maxRetries parameter with default value of 3. reference https://dev.to/ycmjason/javascript-fetch-retry-upon-failure-3p6g

2. i use a for loop to iterate through retry attempts from 1 to maxRetries.
   i chose a for loop over recursion because it is more straightforward and easier to control the number of attempts.

3. inside the loop i use try catch block to handle errors.
   if the fetch succeeds i return the data immediately without continuing to retry.
   if it fails i catch the error and check if there are more attempts remaining.

4. i use the fetch API to make HTTP requests.
   i check if response.ok is true to ensure the request was successful.
   if not i throw an error with the HTTP status code.

5. for the retry delay i created a sleep helper function that returns a Promise with setTimeout.
   i use await sleep 1000 to wait exactly 1 second between retries.
   i only wait if there are more attempts remaining to avoid unnecessary delay after the final attempt.

6. i store the last error in a variable so i can include it in the final error message if all retries fail.
   this helps with debugging by showing what went wrong.

7. after the loop completes without success i throw an error indicating all retries failed.

- i use async await instead of promises with then catch because it is more readable and easier to understand the flow of execution.
- i use a for loop for retries because it gives clear control over the number of attempts and is more efficient than recursion.
- i separate the sleep function as a reusable helper.

- i validate the HTTP response status to catch both network errors and HTTP errors like 404 or 500.
- i wait 1 second between retries to avoid overwhelming the server and to give temporary network issues time to resolve.

# Task 3. Rate Limiter

1. i implemented a RateLimiter class to encapsulate the logic and state.
   it takes maxRequests and windowMs as constructor arguments to make it reusable for different limits.

2. i use a Map to store user data because it provides efficient key-value storage and is optimized for frequent additions and removals.
   the key is the userId and the value is an array of timestamps representing their requests.

3. in the allowRequest method, i first get the current timestamp using Date.now().
   i retrieve the user's request history or initialize it if it's a new user.

4. i filter the user's request array to keep only timestamps that are within the current time window.
   this effectively implements a "sliding window" and automatically removes old requests without needing a background cleanup job.

5. i check if the number of valid requests is less than the limit.
   if it is, i add the current timestamp to the array and return allowed: true.
   if the limit is reached, i calculate the time remaining until the oldest request expires and return allowed: false.

- i chose a class-based approach to keep the state (users map) and configuration (limits) together.
- i use an array of timestamps instead of just a counter to allow for a precise sliding window implementation.
- i clean up old requests lazily (only when a user makes a request) to avoid unnecessary background processing.
- i return detailed info (remaining requests, reset time) to make the API more helpful for the client.
