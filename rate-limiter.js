// Rate Limiter Class
class RateLimiter {
    constructor(maxRequests = 5, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.users = new Map();
    }

    allowRequest(userId) {
        const now = Date.now();
        
        if (!this.users.has(userId)) {
            this.users.set(userId, []);
        }
        
        const userRequests = this.users.get(userId);
        const validRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs);
        
        this.users.set(userId, validRequests);
        
        if (validRequests.length >= this.maxRequests) {
            const resetTime = this.windowMs - (now - validRequests[0]);
            return {
                allowed: false,
                remaining: 0,
                resetIn: Math.ceil(resetTime / 1000)
            };
        }
        
        validRequests.push(now);
        
        return {
            allowed: true,
            remaining: this.maxRequests - validRequests.length,
            resetIn: Math.ceil(this.windowMs / 1000)
        };
    }

    reset(userId) {
        this.users.delete(userId);
    }
}

// Example usage
const limiter = new RateLimiter(5, 60000);

function makeRequest(userId, requestNumber) {
    const result = limiter.allowRequest(userId);
    
    if (result.allowed) {
        console.log(`request ${requestNumber} for user ${userId}: allowed (${result.remaining} remaining)`);
    } else {
        console.log(`request ${requestNumber} for user ${userId}: blocked (reset in ${result.resetIn}s)`);
    }
    
    return result.allowed;
}

// Test
console.log("test: 7 requests (limit is 5) \n");

for (let i = 1; i <= 7; i++) {
    makeRequest("user1", i);
}

console.log("test: multiple users \n");

makeRequest("user2", 1);
makeRequest("user3", 1);
makeRequest("user2", 2);
