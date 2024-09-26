#include <stdio.h>
#include <xmmintrin.h>

// Function to sort four values using SIMD
__m128 sort4(__m128 v) {
    // Step 1: Compare and get min and max
    __m128 min1 = _mm_min_ps(v, _mm_shuffle_ps(v, v, _MM_SHUFFLE(2, 3, 0, 1)));
    __m128 max1 = _mm_max_ps(v, _mm_shuffle_ps(v, v, _MM_SHUFFLE(2, 3, 0, 1)));

    // Step 2: Compare pairs again
    __m128 min2 = _mm_min_ps(min1, _mm_shuffle_ps(min1, min1, _MM_SHUFFLE(1, 0, 3, 2)));
    __m128 max2 = _mm_max_ps(max1, _mm_shuffle_ps(max1, max1, _MM_SHUFFLE(1, 0, 3, 2)));

    // Step 3: Finalize sort
    __m128 min3 = _mm_min_ps(min2, _mm_shuffle_ps(min2, min2, _MM_SHUFFLE(3, 2, 1, 0)));
    __m128 max3 = _mm_max_ps(max2, _mm_shuffle_ps(max2, max2, _MM_SHUFFLE(3, 2, 1, 0)));

    return _mm_shuffle_ps(min3, max3, _MM_SHUFFLE(2, 0, 2, 0));
}

int main() {
    float thing[4];

    // Initialize vector
    __m128 a = _mm_set_ps(5.0f, 4.0f, 1.0f, 3.0f);

    // Sort the vector
    __m128 sorted = sort4(a);

    // Store the result in the array
    _mm_storeu_ps(thing, sorted);

    // Print the sorted results
    for (int i = 0; i < 4; i++) {
        printf("%f\t", thing[i]);
    }
    printf("\n");

    return 0;
}
