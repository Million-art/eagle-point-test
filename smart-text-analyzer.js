// Smart Text Analyzer function
function smartTextAnalyzer(text) {
    // Remove punctuation using REGEX and split into words
    const words = text.replace(/[.,!?;:]/g, "").toLowerCase().split(" ").filter(word => word.length > 0);
 
    // Total word count
    const wordCount = words.length;
    
    // Total length of all words
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    // Average word length (2 decimals)
    const averageWordLength = (totalLength / wordCount).toFixed(2);
    
    // Find longest word(s)
    const maxLength = Math.max(...words.map(word => word.length));
    const longestWords = words.filter(word => word.length === maxLength);
    // Remove duplicate words
    const uniqueLongestWords = [...new Set(longestWords)];
    
    // Word frequency (case-insensitive)
    const wordFrequency = {};
    words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    return {
        "word count": wordCount,
        "average word length": parseFloat(averageWordLength),
        "longest words": uniqueLongestWords,
        "word frequency": wordFrequency
    };
}

// Test the function
const text = "The quick brown fox jumps over the lazy dog the fox";
console.log(smartTextAnalyzer(text));
