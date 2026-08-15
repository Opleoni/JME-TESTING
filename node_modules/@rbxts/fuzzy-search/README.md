# FuzzySearch

A comprehensive package providing fuzzy search algorithms and text processing utilities.

## [NPM](https://www.npmjs.com/package/@rbxts/fuzzy-search) 

## Namespaces

- **`FuzzySearch.Scores`**: Core implementations of comparison algorithms (raw values)
- **`FuzzySearch.Similarities`**: Normalized implementations (0-1 similarity scores)
- **`FuzzySearch.Transform`**: Text preprocessing functions
- **`FuzzySearch.Tokenization`**: String splitting utilities
- **`FuzzySearch.Sorting`**: Ranking functions based on similarity metrics

## Algorithms

### CosineTextSimilarity

Calculates cosine similarity between tokenized strings. Ideal for document comparison.

**Input:**  
`"Hello World"` vs `"Hello Earth"`  
**Tokenization:**  
`["Hello", "World"]` vs `["Hello", "Earth"]`  
**Similarity:** ~0.5 (shared term "Hello", different terms "World"/"Earth")

Declarations:

```ts
FuzzySearch.Scores.CosineTextSimilarity(tokenized_term: string[], tokenized_query: string[]): number;


/**higher - better */
FuzzySearch.Sorting.CosineTextSimilarity(output_terms: string[], tokenized_terms: string[][], tokenized_query: string[]): [number, string][]

//tokenization
const tokenized_term = FuzzySearch.Tokenization.Word(term);
//Hello Wor'ld-and_this is128 big!1.0;
//["hello", "wor", "ld", "and", "this", "is128", "big", "1", "0"]
```

Example:

```ts
// Comparing product descriptions
const desc1 = FuzzySearch.Tokenization.Word(
	"Wireless Bluetooth Headphones Noise-Canceling",
);
const desc2 = FuzzySearch.Tokenization.Word(
	"Bluetooth 5.0 Wireless Earbuds with ANC",
);
const similarity = FuzzySearch.Scores.CosineTextSimilarity(desc1, desc2); // ~0.34
```

---

### Damerau-Levenshtein

Measures edit operations including transpositions. Great for OCR error correction.

**Input:**  
`"Thursday"` vs `"Thrusday"`  
**Distance:** 1 (single transposition r↔u)  
**Operations:** Transpose 'r' and 'u'

Declarations:

```ts
// Basic implementation
FuzzySearch.Scores.DamerauLevenshteinDistance(term: string, query: string): number;
// Optimized for large strings
FuzzySearch.Scores.LargeStringsDamerauLevenshteinDistance(term: string, query: string): number;

// Similarity versions (0-1)
FuzzySearch.Similarities.DamerauLevenshteinDistance(term: string, query: string): number;
FuzzySearch.Similarities.LargeStringsDamerauLevenshteinDistance(term: string, query: string): number;


/**lower - better */
FuzzySearch.Sorting.DamerauLevenshteinDistance(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**lower - better */
FuzzySearch.Sorting.LargeStringsDamerauLevenshteinDistance(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**higher - better */
FuzzySearch.Sorting.DamerauLevenshteinDistanceSimilarity(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**higher - better */
FuzzySearch.Sorting.LargeStringsDamerauLevenshteinDistanceSimilarity(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
```

Example:

```ts
FuzzySearch.Scores.DamerauLevenshteinDistance("apple", "appel"); // 1 (transposition)
FuzzySearch.Similarities.DamerauLevenshteinDistance("clasp", "claps"); // 0.8 (1 edit)
```

---

### Fuzzy Score

Default implementation for general-purpose fuzzy matching.

**Input:**  
`"fuzzywuzzy"` vs `"fuzzy"`  
**Score:** High (exact initial match + continuation)  
**Use Case:** Partial match scoring in search boxes

Declarations:

```ts
FuzzySearch.Scores.FuzzyScore(term: string, query: string): number;


/**higher - better */
FuzzySearch.Sorting.FuzzyScore(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
```

Example:

```ts
// Search box implementation
const results = FuzzySearch.Sorting.FuzzyScore(
	["Astrophysics", "Particle Physics", "Quantum Mechanics"],
	"Phys",
);
```

---

### Hamming Distance

Compares same-length strings. Ideal for error-correcting codes.

**Input:**  
`"karolin"` vs `"kathrin"` (equal length)  
**Distance:** 3  
**Differences:** Positions 3(r≠t), 4(o≠h), 6(i≠r)

Declarations:

```ts
FuzzySearch.Scores.HammingDistance(term: string, query: string): number;


FuzzySearch.Similarities.HammingDistance(term: string, query: string): number;
FuzzySearch.Similarities.HammingLevenshteinHybrid(term: string, query: string): number;


/**lower - better */
FuzzySearch.Sorting.HammingDistance(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**higher - better */
FuzzySearch.Sorting.HammingDistanceSimilarity(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**higher - better */
FuzzySearch.Sorting.HammingLevenshteinHybridSimilarity(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
```

Example:

```ts
// DNA sequence comparison
FuzzySearch.Scores.HammingDistance("GATACA", "GATTACA"); // 4 mismatches
FuzzySearch.Scores.HammingDistance("AGCT", "AGTT"); // 1 mismatch
```

---

### JaroWinkler

Optimized for name matching and short strings.

**Input:**  
`"Martha"` vs `"Marhta"`  
**Similarity:** 0.961 (vs 0.944 in plain Jaro)  
**Benefit:** Prefix bonus for "Mar" match

Declarations:

```ts
FuzzySearch.Scores.JaroWinkler(term: string, query: string, case_sensitive: boolean = true): number;


/**higher - better */
FuzzySearch.Sorting.JaroWinkler(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
```

Examples:

```ts
FuzzySearch.Scores.JaroWinkler("shackleford", "shackelford"); // 0.98
FuzzySearch.Scores.JaroWinkler("garbage", "gabrage"); // 0.96 (transposition handling)
```

---

### Levenshtein Distance

Classic edit distance algorithm. Good for general typo detection.

**Input:**  
`"kitten"` vs `"sitting"`  
**Operations:** 3 edits  
k→s (substitution), e→i (substitution), +g (insertion)

Declarations:

```ts
FuzzySearch.Scores.LevenshteinDistance(term: string, query: string): number;


FuzzySearch.Similarities.LevenshteinDistance(term: string, query: string): number;


/**lower - better */
FuzzySearch.Sorting.LevenshteinDistance(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
/**higher - better */
FuzzySearch.Sorting.LevenshteinDistanceSimilarity(terms: string[], query: string, output_terms?: string[] = terms): [number, string][];
```

Examples:

```ts
FuzzySearch.Similarities.LevenshteinDistance("kitten", "sitting"); // 0.571 (3/7 edits)
FuzzySearch.Sorting.LevenshteinDistance(["color", "colour", "colr"], "colour");
// [ [0, "colour"], [1, "color"], [2, "colr"] ]
```

---

### NGramCosine

Calculates cosine similarity using n-gram frequency vectors. Ideal for comparing documents by content structure.

**Input:**  
`"The quick"` vs `"Quick brown"` (n=3)  
**Trigrams:**  
`["The", "he ", "e q", " qu", ...]` vs `["Qui", "uic", "ick", ...]`  
**Similarity:** Low - different n-gram sets

Declarations:

```ts
FuzzySearch.Scores.NGramCosine(n_gram_counts_tokenized_term: Map<string, number>, n_gram_counts_tokenized_query: Map<string, number>): number;

/**higher - better */
FuzzySearch.Sorting.NGramCosineSorting(output_terms: string[], n_gram_count_tokenized_terms: Map<string, number>[], n_gram_count_tokenized_query: Map<string, number>): [number, string][];


//tokenization
const n_gram_counts_tokenized_term = FuzzySearch.Tokenization.NGramCountsTokenization(term, n);
//Hello World!  n = 3
//["Hel", "ell", "llo", "lo ", "o W", " Wo", "Wor", "orl", "rld", "ld!"];
```

Examples:

```ts
const n = 2;
const term1 = FuzzySearch.Tokenization.NGramCounts("hello", n);
const term2 = FuzzySearch.Tokenization.NGramCounts("holla", n);
FuzzySearch.Scores.NGramCosine(term1, term2); // 0.25 (shared "ll")
```

---

### NGramJaccard

Calculates similarity using n-gram set intersections. Effective for quick presence/absence comparisons.

**Input:**  
`"night"` vs `"nacht"` (n=2)  
**Bigrams:**  
`{"ni", "ig", "gh", "ht"} vs {"na", "ac", "ch", "ht"}`  
**Similarity:** 0.14 (1 shared "ht" / 7 total)

Declarations:

```ts
FuzzySearch.Scores.NGramJaccard(n_gram_set_tokenized_term: Set<string>, n_gram_set_tokenized_query: Set<string>): number;


/**higher - better */
FuzzySearch.Sorting.NGramJaccard(output_terms: string[], n_gram_set_tokenized_terms: Set<string>[], n_gram_set_tokenized_query: Set<string>): [number, string][] ;

//tokenization
const n_gram_counts_tokenized_term = FuzzySearch.Tokenization.NGramSetTokenization(term, n);
//Hello World!  n = 3
//["Hel", "ell", "llo", "lo ", "o W", " Wo", "Wor", "orl", "rld", "ld!"];

```

Examples:

```ts
const n = 3;
const set1 = FuzzySearch.Tokenization.NGramSet("Microsoft", n);
const set2 = FuzzySearch.Tokenization.NGramSet("Microsystems", n);
FuzzySearch.Scores.NGramJaccard(set1, set2); // 0.31 (shared "Mic", "cro", etc)
```

---

## Tokenization

### NGram

Declarations:

```ts
//Hello World!  n = 3
//["Hel", "ell", "llo", "lo ", "o W", " Wo", "Wor", "orl", "rld", "ld!"];
FuzzySearch.Tokenization.NGram(text: string, n: number): string[];

//used for NGramJaccard
FuzzySearch.Tokenization.NGramSet(str: string, n: number): Set<string>
//used for NGramCosine
FuzzySearch.Tokenization.NGramCounts(str: string, n: number): Map<string, number>;
```

### Word

Tokenizes text into lowercase words, ignoring punctuation.
Has various options

Declaration:

```ts
interface IWordTokenizationOptions {
	PreserveAccents?: boolean;
	PreserveHyphens?: boolean;
}
FuzzySearch.Tokenization.WordTo(text: string, options?: IWordTokenizationOptions): string[]

//Hello Wor'ld-and_this is128 big!1.0;
//["hello", "wor", "ld", "and", "this", "is128", "big", "1", "0"]
```

## Transform

### Soundex

Phonetic encoding for name matching:

Declarations:

```ts
FuzzySearch.Transform.SoundexTransform(input: string): string;
//Robert = Rupert -> R163
//Ashcraft = Ashcroft -> A261
//Howard = Hayward = Hardy -> H630
```
