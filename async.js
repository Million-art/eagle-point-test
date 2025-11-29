// Async function to fetch data with retry logic
async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`http error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            lastError = error;
            
            if (attempt < maxRetries) {
                await sleep(1000);
            }
        }
    }
    
    throw new Error(`failed after ${maxRetries} attempts. last error: ${lastError.message}`);
}

// Helper function to wait/sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Test the function
async function test() {
    try {
        console.log("fetching data...");
        const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1", 3);
        console.log("success! data:", data);
    } catch (error) {
        console.error("error:", error.message);
    }
}

test();
